/*==============================================================
BLUE FOX DEFENSE
ENTERPRISE SECURITY COMPLIANCE LAB

RMF DOCUMENT VIEWER

This file controls the shared PDF document viewer.

It handles:

• Loading the selected PDF
• Checking whether the PDF exists
• Displaying a professional unavailable message
• Highlighting the active document
• Updating the document title and ID
• Updating the Next Document control
==============================================================*/


/*==============================================================
01. VIEWER SETTINGS
==============================================================*/

const documentViewerSettings = {
    documentLinkSelector: "[data-pdf-document]",
    pdfFrameSelector: "[data-pdf-frame]",
    frameShellSelector: ".pdf-viewer__frame-shell",
    activeTitleSelector: "[data-active-document-title]",
    activeIdSelector: "[data-active-document-id]",
    nextButtonSelector: "[data-next-document]",
    nextNameSelector: "[data-next-document-name]",
    activeClass: "is-active"
};


/*==============================================================
02. INITIALIZE DOCUMENT VIEWER
==============================================================*/

function initializeDocumentViewer() {
    const documentLinks = Array.from(
        document.querySelectorAll(
            documentViewerSettings.documentLinkSelector
        )
    );

    const pdfFrame = document.querySelector(
        documentViewerSettings.pdfFrameSelector
    );

    const frameShell = document.querySelector(
        documentViewerSettings.frameShellSelector
    );

    const activeDocumentTitle = document.querySelector(
        documentViewerSettings.activeTitleSelector
    );

    const activeDocumentId = document.querySelector(
        documentViewerSettings.activeIdSelector
    );

    const nextDocumentButton = document.querySelector(
        documentViewerSettings.nextButtonSelector
    );

    const nextDocumentName = document.querySelector(
        documentViewerSettings.nextNameSelector
    );


    /*
        Stop if this page does not contain the document viewer.
    */

    if (
        !documentLinks.length ||
        !pdfFrame ||
        !frameShell
    ) {
        return;
    }


    const viewerElements = {
        pdfFrame,
        frameShell,
        activeDocumentTitle,
        activeDocumentId,
        nextDocumentButton,
        nextDocumentName
    };


    /*
        Load a document when a sidebar link is selected.
    */

    documentLinks.forEach((link) => {
        link.addEventListener("click", async (event) => {
            event.preventDefault();

            await loadDocument(
                link,
                documentLinks,
                viewerElements
            );
        });
    });


    /*
        Load the next document.
    */

    if (nextDocumentButton) {
        nextDocumentButton.addEventListener(
            "click",
            async () => {
                const nextIndex = Number(
                    nextDocumentButton.dataset.nextIndex
                );

                if (
                    Number.isNaN(nextIndex) ||
                    !documentLinks[nextIndex]
                ) {
                    return;
                }

                const nextLink = documentLinks[nextIndex];

                await loadDocument(
                    nextLink,
                    documentLinks,
                    viewerElements
                );

                nextLink.focus();
            }
        );
    }


    /*
        Use the document marked active in the HTML.
        If none is marked active, use the first document.
    */

    const initialDocument =
        documentLinks.find((link) =>
            link.classList.contains(
                documentViewerSettings.activeClass
            )
        ) ||
        documentLinks[0];


    loadDocument(
        initialDocument,
        documentLinks,
        viewerElements
    );
}


/*==============================================================
03. LOAD SELECTED DOCUMENT
==============================================================*/

async function loadDocument(
    selectedLink,
    documentLinks,
    viewerElements
) {
    if (!selectedLink) {
        return;
    }

    const documentName =
        selectedLink.dataset.documentName ||
        "RMF Document";

    const documentId =
        selectedLink.dataset.documentId ||
        "";

    const pdfPath =
        selectedLink.getAttribute("href");

    const selectedIndex =
        documentLinks.indexOf(selectedLink);

    const nextIndex =
        selectedIndex < documentLinks.length - 1
            ? selectedIndex + 1
            : 0;

    const nextLink =
        documentLinks[nextIndex];


    updateActiveDocumentState(
        documentLinks,
        selectedLink
    );

    updateDocumentInformation(
        viewerElements,
        documentName,
        documentId
    );

    updateNextDocumentControl(
        viewerElements,
        nextLink,
        nextIndex
    );

    updateBrowserTitle(documentName);

    showLoadingState(
        viewerElements,
        documentName
    );


    const pdfExists =
        await checkPdfExists(pdfPath);


    if (pdfExists) {
        showPdfDocument(
            viewerElements,
            pdfPath,
            documentName
        );
    } else {
        showUnavailableDocument(
            viewerElements,
            documentName,
            documentId,
            pdfPath
        );
    }
}


/*==============================================================
04. CHECK WHETHER THE PDF EXISTS
==============================================================*/

async function checkPdfExists(pdfPath) {
    if (!pdfPath) {
        return false;
    }

    try {
        const response = await fetch(
            pdfPath,
            {
                method: "HEAD",
                cache: "no-store"
            }
        );

        return response.ok;
    } catch (error) {
        console.warn(
            `The PDF could not be checked: ${pdfPath}`,
            error
        );

        return false;
    }
}


/*==============================================================
05. ACTIVE DOCUMENT STATE
==============================================================*/

function updateActiveDocumentState(
    documentLinks,
    selectedLink
) {
    documentLinks.forEach((link) => {
        const isActive =
            link === selectedLink;

        link.classList.toggle(
            documentViewerSettings.activeClass,
            isActive
        );

        if (isActive) {
            link.setAttribute(
                "aria-current",
                "page"
            );
        } else {
            link.removeAttribute(
                "aria-current"
            );
        }
    });
}


/*==============================================================
06. DOCUMENT INFORMATION
==============================================================*/

function updateDocumentInformation(
    viewerElements,
    documentName,
    documentId
) {
    if (viewerElements.activeDocumentTitle) {
        viewerElements.activeDocumentTitle.textContent =
            documentName;
    }

    if (viewerElements.activeDocumentId) {
        viewerElements.activeDocumentId.textContent =
            documentId;
    }
}


function updateBrowserTitle(documentName) {
    document.title =
        `${documentName} | Blue Fox Defense Security Lab`;
}


/*==============================================================
07. LOADING STATE
==============================================================*/

function showLoadingState(
    viewerElements,
    documentName
) {
    viewerElements.pdfFrame.hidden = true;

    removeViewerMessage(
        viewerElements.frameShell
    );

    const loadingMessage =
        createViewerMessage({
            state: "loading",
            eyebrow: "Loading Document",
            title: documentName,
            description:
                "The selected RMF artifact is being prepared for review."
        });

    viewerElements.frameShell.appendChild(
        loadingMessage
    );
}


/*==============================================================
08. DISPLAY PDF
==============================================================*/

function showPdfDocument(
    viewerElements,
    pdfPath,
    documentName
) {
    removeViewerMessage(
        viewerElements.frameShell
    );

    viewerElements.pdfFrame.src =
        pdfPath;

    viewerElements.pdfFrame.title =
        `${documentName} PDF`;

    viewerElements.pdfFrame.hidden =
        false;
}


/*==============================================================
09. DISPLAY UNAVAILABLE MESSAGE
==============================================================*/

function showUnavailableDocument(
    viewerElements,
    documentName,
    documentId,
    pdfPath
) {
    viewerElements.pdfFrame.hidden =
        true;

    viewerElements.pdfFrame.removeAttribute(
        "src"
    );

    removeViewerMessage(
        viewerElements.frameShell
    );

    const unavailableMessage =
        createViewerMessage({
            state: "unavailable",
            eyebrow: "Artifact Preview Unavailable",
            title: documentName,
            description:
                "This artifact has been added to the document library, but its PDF file is not available yet.",
            documentId,
            filePath: pdfPath
        });

    viewerElements.frameShell.appendChild(
        unavailableMessage
    );
}


/*==============================================================
10. VIEWER MESSAGE COMPONENT
==============================================================*/

function createViewerMessage({
    state,
    eyebrow,
    title,
    description,
    documentId = "",
    filePath = ""
}) {
    const message =
        document.createElement("div");

    message.className =
        `pdf-viewer__message pdf-viewer__message--${state}`;

    message.setAttribute(
        "role",
        state === "loading"
            ? "status"
            : "alert"
    );


    const icon =
        document.createElement("span");

    icon.className =
        "pdf-viewer__message-icon";

    icon.setAttribute(
        "aria-hidden",
        "true"
    );

    icon.innerHTML =
        state === "loading"
            ? `
                <svg viewBox="0 0 24 24">
                    <path d="M12 3a9 9 0 1 1-9 9"></path>
                </svg>
            `
            : `
                <svg viewBox="0 0 24 24">
                    <path d="M12 3 2.8 19h18.4L12 3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 16.5h.01"></path>
                </svg>
            `;


    const content =
        document.createElement("div");

    content.className =
        "pdf-viewer__message-content";


    const eyebrowElement =
        document.createElement("p");

    eyebrowElement.className =
        "pdf-viewer__message-eyebrow";

    eyebrowElement.textContent =
        eyebrow;


    const titleElement =
        document.createElement("h3");

    titleElement.className =
        "pdf-viewer__message-title";

    titleElement.textContent =
        title;


    const descriptionElement =
        document.createElement("p");

    descriptionElement.className =
        "pdf-viewer__message-description";

    descriptionElement.textContent =
        description;


    content.append(
        eyebrowElement,
        titleElement,
        descriptionElement
    );


    if (documentId) {
        const idElement =
            document.createElement("span");

        idElement.className =
            "pdf-viewer__message-id";

        idElement.textContent =
            documentId;

        content.appendChild(
            idElement
        );
    }


    if (filePath) {
        const pathElement =
            document.createElement("code");

        pathElement.className =
            "pdf-viewer__message-path";

        pathElement.textContent =
            filePath;

        content.appendChild(
            pathElement
        );
    }


    message.append(
        icon,
        content
    );

    return message;
}


function removeViewerMessage(frameShell) {
    const existingMessage =
        frameShell.querySelector(
            ".pdf-viewer__message"
        );

    if (existingMessage) {
        existingMessage.remove();
    }
}


/*==============================================================
11. NEXT DOCUMENT CONTROL
==============================================================*/

function updateNextDocumentControl(
    viewerElements,
    nextLink,
    nextIndex
) {
    if (
        !viewerElements.nextDocumentButton ||
        !nextLink
    ) {
        return;
    }

    const nextDocumentName =
        nextLink.dataset.documentName ||
        "Next Document";


    viewerElements.nextDocumentButton.dataset.nextIndex =
        String(nextIndex);

    viewerElements.nextDocumentButton.setAttribute(
        "aria-label",
        `View next document: ${nextDocumentName}`
    );


    if (viewerElements.nextDocumentName) {
        viewerElements.nextDocumentName.textContent =
            nextDocumentName;
    }
}


/*==============================================================
12. PAGE INITIALIZATION
==============================================================*/

document.addEventListener(
    "DOMContentLoaded",
    initializeDocumentViewer
);