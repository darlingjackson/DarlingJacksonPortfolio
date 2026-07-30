/* ==========================================================================
   DARLING JACKSON PORTFOLIO
   Resume Page JavaScript
   ==========================================================================

   FILE
   --------------------------------------------------------------------------
   js/resume.js

   PURPOSE
   --------------------------------------------------------------------------
   This file controls the interactions that are unique to the resume page.

   Shared portfolio functionality such as the navigation menu, theme toggle,
   page progress bar, reveal animations, back-to-top button, and current year
   are handled by:

   js/script.js

   FEATURES
   --------------------------------------------------------------------------
   01. Resume Page Initialization
   02. PDF Loading State
   03. Fullscreen Resume Viewer

========================================================================== */


/* ==========================================================================
   01. RESUME PAGE INITIALIZATION
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeResumeLoadingState();
    initializeResumeFullscreenControl();

});


/* ==========================================================================
   02. PDF LOADING STATE
   ==========================================================================

   The loading screen remains visible while the embedded resume is loading.

   Once the iframe finishes loading, the loading screen fades away.
   A fallback timer prevents the loading screen from remaining visible if
   the browser delays or skips the iframe load event.
*/

function initializeResumeLoadingState() {

    const resumeFrame =
        document.getElementById("resumeFrame");

    const loadingState =
        document.getElementById("resumeLoadingState");


    /*
     * Stop here if the resume viewer is not present on the page.
     */

    if (!resumeFrame || !loadingState) {
        return;
    }


    /*
     * Hides the loading layer after the PDF finishes loading.
     */

    function hideLoadingState() {

        loadingState.classList.add("is-hidden");

        loadingState.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /*
     * Listen for the iframe load event.
     */

    resumeFrame.addEventListener(
        "load",
        hideLoadingState
    );


    /*
     * Browser PDF viewers do not always trigger the normal iframe load event
     * consistently. This timer prevents the loading layer from getting stuck.
     */

    window.setTimeout(
        hideLoadingState,
        3000
    );

}


/* ==========================================================================
   03. FULLSCREEN RESUME VIEWER
   ==========================================================================

   This control expands the embedded resume viewer to fill the screen.

   The button text and accessibility state update automatically when entering
   or leaving fullscreen mode.
*/

function initializeResumeFullscreenControl() {

    const fullscreenButton =
        document.getElementById(
            "resumeFullscreenButton"
        );

    const resumeViewer =
        document.getElementById(
            "resumeDocumentViewer"
        );


    /*
     * Stop here if the required elements are not present.
     */

    if (!fullscreenButton || !resumeViewer) {
        return;
    }


    /*
     * Enter or exit fullscreen mode when the button is selected.
     */

    fullscreenButton.addEventListener(
        "click",
        async () => {

            try {

                if (!document.fullscreenElement) {

                    await resumeViewer.requestFullscreen();

                } else {

                    await document.exitFullscreen();

                }

            } catch (error) {

                console.warn(
                    "Fullscreen mode could not be activated.",
                    error
                );

            }

        }
    );


    /*
     * Update the button whenever fullscreen mode changes.
     *
     * This also handles cases where the visitor exits fullscreen by pressing
     * the Escape key instead of selecting the button.
     */

    document.addEventListener(
        "fullscreenchange",
        () => {

            const isFullscreen =
                document.fullscreenElement ===
                resumeViewer;

            fullscreenButton.textContent =
                isFullscreen
                    ? "Exit Full Screen"
                    : "Full Screen";

            fullscreenButton.setAttribute(
                "aria-pressed",
                String(isFullscreen)
            );

        }
    );

}