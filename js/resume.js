/* ==========================================================================
   DARLING JACKSON PORTFOLIO
   RESUME PAGE INTERACTIONS
   ==========================================================================

   FILE
   js/resume.js

   PURPOSE
   --------------------------------------------------------------------------
   Handles functionality unique to the resume page.

   Shared functionality remains in:

   js/script.js

   Shared script handles:
   - Theme Toggle
   - Mobile Navigation
   - Smooth Scrolling
   - Page Progress
   - Reveal Animations
   - Back To Top
   - Current Year

   Resume script handles:
   - Resume PDF Loading State
   - Resume Viewer Status
   - Fullscreen Resume Viewer

   ========================================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeResumeLoadingState();

        initializeResumeFullscreenControl();

    }
);



/* ==========================================================================
   01. PDF LOADING STATE
   ========================================================================== */

function initializeResumeLoadingState() {


    /* ----------------------------------------------------------------------
       Elements
       ---------------------------------------------------------------------- */

    const resumeFrame =
        document.getElementById(
            "resumeFrame"
        );


    const loadingState =
        document.getElementById(
            "resumeLoadingState"
        );


    const viewerStatus =
        document.getElementById(
            "resumeViewerStatus"
        );


    const viewerStatusText =
        document.getElementById(
            "resumeViewerStatusText"
        );



    /* ----------------------------------------------------------------------
       Required Elements
       ---------------------------------------------------------------------- */

    if (
        !resumeFrame ||
        !loadingState
    ) {
        return;
    }



    /* ----------------------------------------------------------------------
       State
       ---------------------------------------------------------------------- */

    let loadingComplete =
        false;



    /* ----------------------------------------------------------------------
       Complete Loading
       ---------------------------------------------------------------------- */

    function completeResumeLoading() {


        /*
         * Prevent the function from running more than once.
         */

        if (loadingComplete) {
            return;
        }


        loadingComplete =
            true;



        /*
         * Hide the loading overlay.
         */

        loadingState.classList.add(
            "is-hidden"
        );


        loadingState.setAttribute(
            "aria-hidden",
            "true"
        );



        /*
         * Update toolbar status.
         */

        if (viewerStatus) {

            viewerStatus.classList.add(
                "is-ready"
            );

        }


        if (viewerStatusText) {

            viewerStatusText.textContent =
                "PDF ready";

        }

    }



    /* ----------------------------------------------------------------------
       Iframe Load Event
       ---------------------------------------------------------------------- */

    resumeFrame.addEventListener(
        "load",
        completeResumeLoading
    );



    /* ----------------------------------------------------------------------
       Fallback
       ----------------------------------------------------------------------

       Browser PDF viewers do not always fire the iframe load event in the
       same way. This prevents the loading layer from remaining on screen.
       ---------------------------------------------------------------------- */

    window.setTimeout(
        completeResumeLoading,
        3000
    );

}



/* ==========================================================================
   02. FULLSCREEN RESUME VIEWER
   ========================================================================== */

function initializeResumeFullscreenControl() {


    /* ----------------------------------------------------------------------
       Elements
       ---------------------------------------------------------------------- */

    const fullscreenButton =
        document.getElementById(
            "resumeFullscreenButton"
        );


    const resumeViewer =
        document.getElementById(
            "resumeDocumentViewer"
        );



    /* ----------------------------------------------------------------------
       Required Elements
       ---------------------------------------------------------------------- */

    if (
        !fullscreenButton ||
        !resumeViewer
    ) {
        return;
    }



    /* ----------------------------------------------------------------------
       Browser Support
       ---------------------------------------------------------------------- */

    const fullscreenSupported =
        typeof resumeViewer
            .requestFullscreen ===
            "function" &&
        typeof document
            .exitFullscreen ===
            "function";


    if (!fullscreenSupported) {

        fullscreenButton.hidden =
            true;

        return;

    }



    /* ----------------------------------------------------------------------
       Fullscreen Button
       ---------------------------------------------------------------------- */

    fullscreenButton.addEventListener(
        "click",
        async () => {

            try {


                /*
                 * Enter fullscreen.
                 */

                if (
                    !document
                        .fullscreenElement
                ) {

                    await resumeViewer
                        .requestFullscreen();

                }


                /*
                 * Exit fullscreen.
                 */

                else {

                    await document
                        .exitFullscreen();

                }

            }

            catch (error) {

                console.warn(
                    "Fullscreen mode could not be activated.",
                    error
                );

            }

        }
    );



    /* ----------------------------------------------------------------------
       Fullscreen State
       ----------------------------------------------------------------------

       Updates the button when fullscreen changes.

       This also handles the visitor pressing Escape instead of clicking the
       button.
       ---------------------------------------------------------------------- */

    document.addEventListener(
        "fullscreenchange",
        () => {


            const isFullscreen =
                document
                    .fullscreenElement ===
                resumeViewer;


            const buttonText =
                fullscreenButton
                    .querySelector(
                        "span:first-child"
                    );


            const buttonIcon =
                fullscreenButton
                    .querySelector(
                        "span:last-child"
                    );



            /*
             * Update text.
             */

            if (buttonText) {

                buttonText.textContent =
                    isFullscreen
                        ? "Exit Full Screen"
                        : "Full Screen";

            }



            /*
             * Update icon.
             */

            if (buttonIcon) {

                buttonIcon.textContent =
                    isFullscreen
                        ? "×"
                        : "⛶";

            }



            /*
             * Accessibility state.
             */

            fullscreenButton.setAttribute(
                "aria-pressed",
                String(
                    isFullscreen
                )
            );

        }
    );

}