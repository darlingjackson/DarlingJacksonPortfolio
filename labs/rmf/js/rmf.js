"use strict";

/* ==========================================================================
   BLUE FOX DEFENSE
   RMF LANDING PAGE — VERSION 3

   Shared portfolio JavaScript handles:
   - Theme
   - Header
   - Mobile navigation
   - Active navigation
   - Scroll progress
   - Reveal animations
   - Back to top
   - Footer year

   This file keeps the lifecycle rail keyboard-friendly.
   ========================================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const phaseLinks =
            [
                ...document.querySelectorAll(
                    ".rmf-phase-node"
                )
            ];

        phaseLinks.forEach(
            (
                link,
                index
            ) => {

                link.addEventListener(
                    "keydown",
                    event => {

                        if (
                            ![
                                "ArrowRight",
                                "ArrowLeft",
                                "Home",
                                "End"
                            ].includes(
                                event.key
                            )
                        ) {
                            return;
                        }

                        event.preventDefault();

                        let nextIndex =
                            index;

                        if (
                            event.key ===
                            "ArrowRight"
                        ) {
                            nextIndex =
                                (
                                    index + 1
                                ) %
                                phaseLinks.length;
                        }

                        if (
                            event.key ===
                            "ArrowLeft"
                        ) {
                            nextIndex =
                                (
                                    index - 1 +
                                    phaseLinks.length
                                ) %
                                phaseLinks.length;
                        }

                        if (
                            event.key ===
                            "Home"
                        ) {
                            nextIndex =
                                0;
                        }

                        if (
                            event.key ===
                            "End"
                        ) {
                            nextIndex =
                                phaseLinks.length - 1;
                        }

                        phaseLinks[
                            nextIndex
                        ]?.focus();

                    }
                );

            }
        );

    }
);
