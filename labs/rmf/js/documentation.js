"use strict";


/* ==========================================================================
   BLUE FOX DEFENSE
   RMF DOCUMENTATION SYSTEM

   Shared portfolio behavior remains in:
   ../../../../js/script.js

   This file handles:
   - Current RMF documentation library
   - PDF document selection
   - Previous / next document navigation
   - Viewer metadata
   ========================================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ==================================================================
           01. CURRENT DOCUMENTATION PHASE
           ================================================================== */

        const currentPhase =
            document.body.dataset.currentPhase;


        const documentationPhaseLinks =
            document.querySelectorAll(
                "[data-document-phase]"
            );


        documentationPhaseLinks.forEach(
            link => {

                const active =
                    link.dataset.documentPhase ===
                    currentPhase;


                link.classList.toggle(
                    "is-current",
                    active
                );


                if (active) {

                    link.setAttribute(
                        "aria-current",
                        "page"
                    );

                } else {

                    link.removeAttribute(
                        "aria-current"
                    );

                }

            }
        );



        /* ==================================================================
           02. DOCUMENT REFERENCES
           ================================================================== */

        const documents =
            [
                ...document.querySelectorAll(
                    "[data-pdf-document]"
                )
            ];


        if (!documents.length) {
            return;
        }



        const pdfFrame =
            document.getElementById(
                "pdfFrame"
            );


        const title =
            document.getElementById(
                "activeDocumentTitle"
            );


        const documentId =
            document.getElementById(
                "activeDocumentId"
            );


        const documentType =
            document.getElementById(
                "activeDocumentType"
            );


        const openDocument =
            document.getElementById(
                "openDocument"
            );


        const previousButton =
            document.getElementById(
                "previousDocument"
            );


        const nextButton =
            document.getElementById(
                "nextDocument"
            );


        const previousName =
            document.getElementById(
                "previousDocumentName"
            );


        const nextName =
            document.getElementById(
                "nextDocumentName"
            );


        const position =
            document.getElementById(
                "documentPosition"
            );



        /* ==================================================================
           03. ACTIVE DOCUMENT
           ================================================================== */

            const urlParameters =
                new URLSearchParams(
                    window.location.search
                );

            const requestedDocumentId =
                urlParameters.get(
                    "doc"
                );


            let activeIndex =
                documents.findIndex(
                    item =>
                        item.dataset.documentId ===
                        requestedDocumentId
                );


            /*
            If the URL does not request a valid document,
            fall back to the document already marked active.
            */

            if (activeIndex < 0) {

                activeIndex =
                    documents.findIndex(
                        item =>
                            item.classList.contains(
                                "is-active"
                            )
                    );

            }


            /*
            Final fallback:
            open the first document.
            */

            if (activeIndex < 0) {

                activeIndex = 0;

            }



        /* ==================================================================
           04. OPEN DOCUMENT
           ================================================================== */

        function openDocumentAt(
            index
        ) {

            const selectedDocument =
                documents[
                    index
                ];


            if (!selectedDocument) {
                return;
            }


            activeIndex =
                index;



            /* --------------------------------------------------------------
               Document Data
               -------------------------------------------------------------- */

            const source =
                selectedDocument.dataset.documentSrc;


            const name =
                selectedDocument.dataset.documentName;


            const id =
                selectedDocument.dataset.documentId;


            const type =
                selectedDocument.dataset.documentType;

                
                /*------------------------------------------------------------
                    keep the selected document in the URL
                  ------------------------------------------------------------ */

                const currentUrl =
                    new URL(
                        window.location.href
                    );

                currentUrl.searchParams.set(
                    "doc",
                    id
                );

                window.history.replaceState(
                    {},
                    "",
                    currentUrl
                );



            /* --------------------------------------------------------------
               Sidebar Active State
               -------------------------------------------------------------- */

            documents.forEach(
                (
                    item,
                    itemIndex
                ) => {

                    const active =
                        itemIndex ===
                        activeIndex;


                    item.classList.toggle(
                        "is-active",
                        active
                    );


                    if (active) {

                        item.setAttribute(
                            "aria-current",
                            "page"
                        );

                    } else {

                        item.removeAttribute(
                            "aria-current"
                        );

                    }

                }
            );



            /* --------------------------------------------------------------
               PDF Frame
               -------------------------------------------------------------- */

            if (
                pdfFrame &&
                source
            ) {

                pdfFrame.src =
                    source;


                pdfFrame.title =
                    `${name} PDF`;

            }



            /* --------------------------------------------------------------
               Viewer Title
               -------------------------------------------------------------- */

            if (title) {

                title.textContent =
                    name;

            }



            /* --------------------------------------------------------------
               Document ID
               -------------------------------------------------------------- */

            if (documentId) {

                documentId.textContent =
                    id;

            }



            /* --------------------------------------------------------------
               Document Type
               -------------------------------------------------------------- */

            if (documentType) {

                documentType.textContent =
                    type.toUpperCase();

            }



            /* --------------------------------------------------------------
               Open PDF Link
               -------------------------------------------------------------- */

            if (
                openDocument &&
                source
            ) {

                openDocument.href =
                    source;

            }



            /* --------------------------------------------------------------
               Position
               -------------------------------------------------------------- */

            if (position) {

                position.textContent =
                    `${String(
                        activeIndex + 1
                    ).padStart(
                        2,
                        "0"
                    )} / ${String(
                        documents.length
                    ).padStart(
                        2,
                        "0"
                    )}`;

            }



            /* --------------------------------------------------------------
               Previous Document
               -------------------------------------------------------------- */

            const previous =
                documents[
                    activeIndex - 1
                ];


            if (previousButton) {

                previousButton.disabled =
                    !previous;

            }


            if (previousName) {

                previousName.textContent =
                    previous
                        ? previous.dataset.documentName
                        : "—";

            }



            /* --------------------------------------------------------------
               Next Document
               -------------------------------------------------------------- */

            const next =
                documents[
                    activeIndex + 1
                ];


            if (nextButton) {

                nextButton.disabled =
                    !next;

            }


            if (nextName) {

                nextName.textContent =
                    next
                        ? next.dataset.documentName
                        : "—";

            }



            /* --------------------------------------------------------------
               Current Document Data
               -------------------------------------------------------------- */

            document.body.dataset.currentDocument =
                id;

        }



        /* ==================================================================
           05. SIDEBAR SELECTION
           ================================================================== */

        documents.forEach(
            (
                documentButton,
                index
            ) => {

                documentButton.addEventListener(
                    "click",
                    () => {

                        openDocumentAt(
                            index
                        );

                    }
                );

            }
        );



        /* ==================================================================
           06. PREVIOUS DOCUMENT
           ================================================================== */

        previousButton?.addEventListener(
            "click",
            () => {

                if (
                    activeIndex <=
                    0
                ) {
                    return;
                }


                openDocumentAt(
                    activeIndex - 1
                );

            }
        );



        /* ==================================================================
           07. NEXT DOCUMENT
           ================================================================== */

        nextButton?.addEventListener(
            "click",
            () => {

                if (
                    activeIndex >=
                    documents.length - 1
                ) {
                    return;
                }


                openDocumentAt(
                    activeIndex + 1
                );

            }
        );



        /* ==================================================================
           08. KEYBOARD SHORTCUTS

           Alt + Left  = Previous Document
           Alt + Right = Next Document
           ================================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (!event.altKey) {
                    return;
                }


                if (
                    event.key ===
                    "ArrowLeft" &&
                    activeIndex > 0
                ) {

                    event.preventDefault();


                    openDocumentAt(
                        activeIndex - 1
                    );

                }


                if (
                    event.key ===
                    "ArrowRight" &&
                    activeIndex <
                    documents.length - 1
                ) {

                    event.preventDefault();


                    openDocumentAt(
                        activeIndex + 1
                    );

                }

            }
        );



        /* ==================================================================
           09. INITIAL DOCUMENT
           ================================================================== */

        openDocumentAt(
            activeIndex
        );


    }
);