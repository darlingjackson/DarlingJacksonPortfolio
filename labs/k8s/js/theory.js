"use strict";


/* ==========================================================================
   KUBERNETES PLATFORM THEORY
   THEORY-PAGE-ONLY JAVASCRIPT

   Shared site behavior remains in:
   ../../js/script.js

   This file handles only:
   - Theory animations
   - Theory simulators
   - Theory inspectors
   - Theory autoplay behavior
   ========================================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ==================================================================
           01. HELPERS
           ================================================================== */

        const $ = (
            selector,
            context = document
        ) => context.querySelector(
            selector
        );


        const $$ = (
            selector,
            context = document
        ) => [
            ...context.querySelectorAll(
                selector
            )
        ];


        const reducedMotionQuery =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );


        const reduceMotion =
            reducedMotionQuery.matches;


        const wait = ms =>
            new Promise(
                resolve => {
                    window.setTimeout(
                        resolve,
                        reduceMotion
                            ? 0
                            : ms
                    );
                }
            );


        /* ==================================================================
           CANCEL-AWARE DELAY

           Allows an autoplay loop to stop immediately when:
           - The user interacts
           - The demo leaves the viewport
           ================================================================== */

        async function demoDelay(
            milliseconds,
            shouldContinue
        ) {

            if (reduceMotion) {
                return true;
            }


            let elapsed =
                0;


            while (
                elapsed <
                milliseconds
            ) {

                if (
                    !shouldContinue()
                ) {
                    return false;
                }


                await wait(
                    80
                );


                elapsed +=
                    80;
            }


            return true;
        }


        /* ==================================================================
           SHARED VIEWPORT AUTOPLAY CONTROLLER

           Behavior:
           - Starts a demo when it becomes visible.
           - Stops background animation when it leaves the viewport.
           - Clicking inside a demo pauses autoplay.
           - Manual controls remain usable.
           - Does not autoplay when reduced motion is enabled.
           ================================================================== */

        function createViewportAutoDemo({
            element,
            start,
            stop,
            threshold = 0.30
        }) {

            if (!element) {
                return null;
            }


            let visible =
                false;


            let userPaused =
                false;


            /* --------------------------------------------------------------
               Visual Demo State
               -------------------------------------------------------------- */

            function updateState() {

                const autoRunning =
                    visible &&
                    !userPaused &&
                    !reducedMotionQuery.matches;


                element.classList.toggle(
                    "is-demo-auto",
                    autoRunning
                );


                element.classList.toggle(
                    "is-demo-paused",
                    userPaused
                );


                element.dataset.demoState =
                    reducedMotionQuery.matches
                        ? "MANUAL"
                        : userPaused
                        ? "PAUSED"
                        : "AUTO";
            }


            /* --------------------------------------------------------------
               Pause Autoplay
               -------------------------------------------------------------- */

            function pause() {

                if (userPaused) {
                    return;
                }


                userPaused =
                    true;


                stop?.();


                updateState();
            }


            /* --------------------------------------------------------------
               Resume Autoplay
               -------------------------------------------------------------- */

            function resume() {

                if (!userPaused) {
                    return;
                }


                userPaused =
                    false;


                updateState();


                if (
                    visible &&
                    !reducedMotionQuery.matches
                ) {
                    start?.();
                }
            }


            /* --------------------------------------------------------------
               Any visitor interaction switches the demo into inspection mode.
               -------------------------------------------------------------- */

            element.addEventListener(
                "click",
                event => {

                    /*
                       Do not automatically resume when clicking a component.
                       Once the visitor begins inspecting, autoplay stays
                       paused until explicitly resumed or the page is reloaded.
                    */

                    if (
                        event.target.closest(
                            "button, a, input, select, textarea"
                        )
                    ) {
                        pause();
                    }

                },
                true
            );


            /* --------------------------------------------------------------
               Reduced Motion
               -------------------------------------------------------------- */

            if (
                reducedMotionQuery.matches
            ) {

                updateState();


                return {
                    pause,
                    resume,
                    get paused() {
                        return userPaused;
                    }
                };
            }


            /* --------------------------------------------------------------
               Viewport Observer
               -------------------------------------------------------------- */

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.target !==
                                    element
                                ) {
                                    return;
                                }


                                visible =
                                    entry.isIntersecting;


                                updateState();


                                if (
                                    visible &&
                                    !userPaused
                                ) {

                                    start?.();

                                } else {

                                    stop?.();

                                }

                            }
                        );

                    },
                    {
                        threshold
                    }
                );


            observer.observe(
                element
            );


            return {
                pause,
                resume,

                get paused() {
                    return userPaused;
                },

                get visible() {
                    return visible;
                }
            };
        }


        /* ==================================================================
           02. HERO SYSTEM FLOW
           Source → Docker → Image → Kubernetes → Amazon EKS

           AUTOPLAY:
           Starts automatically when the architecture enters the viewport.
           ================================================================== */

        const heroDemo =
            $(".system-topology");


        const heroNodes =
            $$(
                "[data-hero-node]"
            );


        const heroPaths =
            $$(
                "[data-hero-path]"
            );


        const heroPacket =
            $("#heroPacket");


        const heroState =
            $("#heroSystemState");


        const heroReadout =
            $("#heroSystemReadout");


        const runHeroFlow =
            $("#runHeroFlow");


        /* ==================================================================
           HERO CONTENT
           ================================================================== */

        const heroData = {

            source: {

                state:
                    "SOURCE",

                title:
                    "Application source exists first.",

                text:
                    "The application begins as normal source code before Docker packages anything."

            },


            docker: {

                state:
                    "CONTAINERIZE",

                title:
                    "Docker processes the application.",

                text:
                    "Docker reads the Dockerfile and packages the application into a portable container image."

            },


            image: {

                state:
                    "ARTIFACT",

                title:
                    "A reusable image is produced.",

                text:
                    "The image becomes the portable artifact that can be stored, distributed, and used to create containers."

            },


            kubernetes: {

                state:
                    "ORCHESTRATE",

                title:
                    "Kubernetes operates the workload.",

                text:
                    "Kubernetes uses container images to create and manage running workloads through Pods and controllers."

            },


            eks: {

                state:
                    "CLOUD",

                title:
                    "Amazon EKS moves Kubernetes into AWS.",

                text:
                    "Amazon EKS provides a managed Kubernetes control plane integrated with AWS infrastructure services."

            }

        };


        /* ==================================================================
           HERO STATE
           ================================================================== */

        let heroSequenceRunning =
            false;


        let heroSequenceToken =
            0;


        let heroAutoRunning =
            false;


        let heroAutoToken =
            0;


        let heroController =
            null;


        /* ==================================================================
           ACTIVATE HERO NODE
           ================================================================== */

        function activateHeroNode(
            node,
            index
        ) {

            if (!node) {
                return;
            }


            const key =
                node.dataset.heroNode;


            const data =
                heroData[key];


            if (!data) {
                return;
            }


            /* --------------------------------------------------------------
               Current Technology
               -------------------------------------------------------------- */

            heroNodes.forEach(
                (
                    item,
                    itemIndex
                ) => {

                    item.classList.toggle(
                        "is-active",
                        itemIndex === index
                    );

                }
            );


            /* --------------------------------------------------------------
               Completed Communication Paths
               -------------------------------------------------------------- */

            heroPaths.forEach(
                (
                    path,
                    pathIndex
                ) => {

                    path.classList.toggle(
                        "is-active",
                        pathIndex < index
                    );

                }
            );


            /* --------------------------------------------------------------
               Move the visual packet through the architecture.
               -------------------------------------------------------------- */

            if (heroPacket) {

                heroPacket.style.setProperty(
                    "--hero-step",
                    index
                );


                heroPacket.classList.add(
                    "is-moving"
                );
            }


            /* --------------------------------------------------------------
               System Status
               -------------------------------------------------------------- */

            if (heroState) {

                heroState.textContent =
                    data.state;

            }


            /* --------------------------------------------------------------
               Inspector Readout
               -------------------------------------------------------------- */

            if (heroReadout) {

                heroReadout.innerHTML = `
                    <span>
                        SYS://${data.state}
                    </span>

                    <p>
                        <strong>
                            ${data.title}
                        </strong>

                        ${data.text}
                    </p>
                `;

            }
        }


        /* ==================================================================
           RESET HERO FLOW
           ================================================================== */

        function resetHeroFlow() {

            heroSequenceToken++;


            heroSequenceRunning =
                false;


            heroNodes.forEach(
                node => {

                    node.classList.remove(
                        "is-active"
                    );

                }
            );


            heroPaths.forEach(
                path => {

                    path.classList.remove(
                        "is-active"
                    );

                }
            );


            if (heroPacket) {

                heroPacket.classList.remove(
                    "is-moving"
                );


                heroPacket.style.removeProperty(
                    "--hero-step"
                );
            }


            if (heroState) {

                heroState.textContent =
                    "READY";

            }


            if (heroReadout) {

                heroReadout.innerHTML = `
                    <span>
                        SYS://READY
                    </span>

                    <p>
                        Select a technology layer or watch the complete
                        system flow automatically.
                    </p>
                `;

            }


            if (runHeroFlow) {

                runHeroFlow.disabled =
                    false;

            }
        }


        /* ==================================================================
           RUN ONE COMPLETE HERO SEQUENCE

           Used by:
           - Autoplay
           - Optional Run System Flow button
           ================================================================== */

        async function runHeroSequence(
            mode = "AUTO"
        ) {

            if (
                heroSequenceRunning ||
                heroNodes.length === 0
            ) {
                return false;
            }


            heroSequenceRunning =
                true;


            const token =
                ++heroSequenceToken;


            if (
                mode === "MANUAL" &&
                runHeroFlow
            ) {

                runHeroFlow.disabled =
                    true;

            }


            /* --------------------------------------------------------------
               Clear previous path state before beginning.
               -------------------------------------------------------------- */

            heroPaths.forEach(
                path => {

                    path.classList.remove(
                        "is-active"
                    );

                }
            );


            /* --------------------------------------------------------------
               Walk through each technology.
               -------------------------------------------------------------- */

            for (
                let index = 0;
                index < heroNodes.length;
                index++
            ) {

                if (
                    token !==
                    heroSequenceToken
                ) {

                    heroSequenceRunning =
                        false;

                    return false;
                }


                activateHeroNode(
                    heroNodes[index],
                    index
                );


                const continueRun =
                    await demoDelay(
                        1050,
                        () =>
                            token ===
                            heroSequenceToken
                    );


                if (!continueRun) {

                    heroSequenceRunning =
                        false;

                    return false;
                }

            }


            /* --------------------------------------------------------------
               Completed State
               -------------------------------------------------------------- */

            if (heroState) {

                heroState.textContent =
                    "ONLINE";

            }


            if (heroReadout) {

                heroReadout.innerHTML = `
                    <span>
                        SYS://ONLINE
                    </span>

                    <p>
                        <strong>
                            Delivery path complete.
                        </strong>

                        Source code moved through containerization,
                        packaging, orchestration, and AWS.
                    </p>
                `;

            }


            heroSequenceRunning =
                false;


            if (runHeroFlow) {

                runHeroFlow.disabled =
                    false;

            }


            return true;
        }


        /* ==================================================================
           HERO AUTOPLAY LOOP
           ================================================================== */

        async function startHeroAutoLoop() {

            if (
                heroAutoRunning ||
                reducedMotionQuery.matches ||
                heroNodes.length === 0
            ) {
                return;
            }


            heroAutoRunning =
                true;


            const autoToken =
                ++heroAutoToken;


            while (
                heroAutoRunning &&
                autoToken ===
                heroAutoToken
            ) {

                /* ----------------------------------------------------------
                   Start clean.
                   ---------------------------------------------------------- */

                resetHeroFlow();


                /*
                   resetHeroFlow increments the sequence token intentionally.
                   The autoplay token is separate and remains valid.
                */


                const ready =
                    await demoDelay(
                        450,
                        () =>
                            heroAutoRunning &&
                            autoToken ===
                            heroAutoToken
                    );


                if (!ready) {
                    break;
                }


                /* ----------------------------------------------------------
                   Run the architecture.
                   ---------------------------------------------------------- */

                await runHeroSequence(
                    "AUTO"
                );


                if (
                    !heroAutoRunning ||
                    autoToken !==
                    heroAutoToken
                ) {
                    break;
                }


                /* ----------------------------------------------------------
                   Leave completed state visible.
                   ---------------------------------------------------------- */

                const hold =
                    await demoDelay(
                        1800,
                        () =>
                            heroAutoRunning &&
                            autoToken ===
                            heroAutoToken
                    );


                if (!hold) {
                    break;
                }

            }
        }


        /* ==================================================================
           STOP HERO AUTOPLAY

           Keeps the currently selected stage visible.
           ================================================================== */

        function stopHeroAutoLoop() {

            heroAutoRunning =
                false;


            heroAutoToken++;


            /*
               Cancel any sequence currently waiting between stages.
            */

            heroSequenceToken++;


            heroSequenceRunning =
                false;


            if (runHeroFlow) {

                runHeroFlow.disabled =
                    false;

            }
        }


        /* ==================================================================
           HERO MANUAL INSPECTION

           Clicking Source / Docker / Image / Kubernetes / EKS pauses
           autoplay and leaves that component selected.
           ================================================================== */

        heroNodes.forEach(
            (
                node,
                index
            ) => {

                node.addEventListener(
                    "click",
                    () => {

                        heroController?.pause();


                        activateHeroNode(
                            node,
                            index
                        );

                    }
                );

            }
        );


        /* ==================================================================
           OPTIONAL MANUAL RUN BUTTON

           The button remains available, but it is no longer required.
           ================================================================== */

        runHeroFlow?.addEventListener(
            "click",
            async () => {

                heroController?.pause();


                resetHeroFlow();


                await runHeroSequence(
                    "MANUAL"
                );

            }
        );


        /* ==================================================================
           CONNECT HERO TO VIEWPORT AUTOPLAY
           ================================================================== */

        heroController =
            createViewportAutoDemo({

                element:
                    heroDemo,

                start:
                    startHeroAutoLoop,

                stop:
                    stopHeroAutoLoop,

                threshold:
                    0.28

            });


        /* ==================================================================
           END HERO SYSTEM FLOW
           ================================================================== */
                   /* ==================================================================
           03. DOCKER BUILD PIPELINE

           Source
             ↓
           Dockerfile
             ↓
           docker build
             ↓
           Image
             ↓
           docker run
             ↓
           Container

           AUTOPLAY:
           - Starts when visible.
           - Repeats automatically.
           - Clicking a stage pauses autoplay for inspection.
           - Run / Pause / Next / Reset remain available manually.
           ================================================================== */


        const pipelineDemo =
            $(".docker-engine");


        const pipelineStages =
            $$(
                "[data-pipeline-stage]",
                pipelineDemo || document
            );


        const pipelineSignals =
            $$(
                ".build-signal",
                pipelineDemo || document
            );


        const dockerMachine =
            $(
                ".docker-machine",
                pipelineDemo || document
            );


        const runPipeline =
            $("#runPipeline");


        const pausePipeline =
            $("#pausePipeline");


        const nextPipeline =
            $("#nextPipeline");


        const resetPipeline =
            $("#resetPipeline");


        const pipelineStatus =
            $("#pipelineStatus");


        const pipelineProgress =
            $("#pipelineProgress");


        const pipelineStep =
            $("#pipelineStep");


        const pipelineReadout =
            $("#pipelineReadout");


        /* ==================================================================
           PIPELINE CONTENT
           ================================================================== */

        const pipelineData = {

            source: {

                label:
                    "SOURCE",

                title:
                    "Application source is ready.",

                text:
                    "The files still exist as normal application source code.",

                command:
                    "app.mjs · helpers.mjs · package.json"

            },


            dockerfile: {

                label:
                    "DOCKERFILE",

                title:
                    "Docker reads the build instructions.",

                text:
                    "The Dockerfile defines the base image, files, dependencies, and startup command.",

                command:
                    "FROM node:14 → WORKDIR /app → COPY . /app"

            },


            build: {

                label:
                    "BUILD",

                title:
                    "Docker assembles the image.",

                text:
                    "docker build processes the Dockerfile instructions and creates image layers.",

                command:
                    "docker build ."

            },


            image: {

                label:
                    "IMAGE",

                title:
                    "The reusable image now exists.",

                text:
                    "The application and runtime requirements are packaged into a portable image artifact.",

                command:
                    "app:v1"

            },


            run: {

                label:
                    "RUNTIME",

                title:
                    "Docker creates a container.",

                text:
                    "docker run uses the image as a template and creates a running container instance.",

                command:
                    "docker run app:v1"

            },


            container: {

                label:
                    "RUNNING",

                title:
                    "The application is running.",

                text:
                    "The container is the running instance. The original image remains available for reuse.",

                command:
                    "container: running from app:v1"

            }

        };


        /* ==================================================================
           PIPELINE STATE
           ================================================================== */

        let pipelineIndex =
            -1;


        let pipelineRunning =
            false;


        let pipelinePaused =
            false;


        let pipelineToken =
            0;


        let pipelineAutoRunning =
            false;


        let pipelineAutoToken =
            0;


        let pipelineController =
            null;


        /* ==================================================================
           PIPELINE HELPERS
           ================================================================== */

        function pipelineKey(
            stage
        ) {

            return stage
                ?.dataset
                ?.pipelineStage;

        }


        function updatePipelineReadout(
            key,
            state = "MANUAL"
        ) {

            const data =
                pipelineData[key];


            if (!data) {
                return;
            }


            if (pipelineReadout) {

                pipelineReadout.innerHTML = `
                    <div>
                        <span>
                            PIPELINE://${data.label}
                        </span>

                        <strong>
                            ${data.title}
                        </strong>
                    </div>

                    <p>
                        ${data.text}
                    </p>

                    <code>
                        ${data.command}
                    </code>
                `;

            }


            if (pipelineStatus) {

                pipelineStatus.textContent =
                    state;

            }
        }


        /* ==================================================================
           SIGNALS BETWEEN PIPELINE STAGES
           ================================================================== */

        function clearPipelineSignals() {

            pipelineSignals.forEach(
                signal => {

                    signal.classList.remove(
                        "is-active"
                    );

                }
            );
        }


        function activatePipelineSignal(
            index
        ) {

            const signal =
                pipelineSignals[index];


            if (!signal) {
                return;
            }


            signal.classList.remove(
                "is-active"
            );


            void signal.offsetWidth;


            signal.classList.add(
                "is-active"
            );
        }


        /* ==================================================================
           ACTIVATE PIPELINE STAGE
           ================================================================== */

        function activatePipelineStage(
            index,
            state = "MANUAL"
        ) {

            const stage =
                pipelineStages[index];


            if (!stage) {
                return;
            }


            pipelineIndex =
                index;


            pipelineStages.forEach(
                (
                    item,
                    itemIndex
                ) => {

                    item.classList.toggle(
                        "is-active",
                        itemIndex === index
                    );


                    item.classList.toggle(
                        "is-complete",
                        itemIndex < index
                    );

                }
            );


            const key =
                pipelineKey(
                    stage
                );


            updatePipelineReadout(
                key,
                state
            );


            /* --------------------------------------------------------------
               Progress Counter
               -------------------------------------------------------------- */

            if (pipelineStep) {

                pipelineStep.textContent =
                    `${index + 1} / ${pipelineStages.length}`;

            }


            /* --------------------------------------------------------------
               Progress Bar
               -------------------------------------------------------------- */

            if (pipelineProgress) {

                pipelineProgress.style.width =
                    `${
                        (
                            (
                                index + 1
                            ) /
                            pipelineStages.length
                        ) *
                        100
                    }%`;

            }


            /* --------------------------------------------------------------
               Docker Build Animation
               -------------------------------------------------------------- */

            if (
                key === "build" &&
                dockerMachine
            ) {

                dockerMachine.classList.remove(
                    "is-building"
                );


                void dockerMachine.offsetWidth;


                dockerMachine.classList.add(
                    "is-building"
                );
            }


            /* --------------------------------------------------------------
               Runtime State
               -------------------------------------------------------------- */

            const runtime =
                $(
                    ".runtime-container",
                    pipelineDemo || document
                );


            const runtimeDetail =
                runtime?.querySelector(
                    "small"
                );


            if (
                runtimeDetail &&
                key !== "container"
            ) {

                runtimeDetail.textContent =
                    "WAITING";

            }


            if (
                runtimeDetail &&
                key === "container"
            ) {

                runtimeDetail.textContent =
                    "RUNNING";

            }
        }


        /* ==================================================================
           PIPELINE BUTTON STATE
           ================================================================== */

        function updatePipelineButtons() {

            if (pausePipeline) {

                pausePipeline.disabled =
                    !pipelineRunning;


                pausePipeline.textContent =
                    pipelinePaused
                        ? "Resume"
                        : "Pause";

            }


            if (runPipeline) {

                if (pipelineRunning) {

                    runPipeline.textContent =
                        "Running";

                } else if (
                    pipelineIndex >=
                    pipelineStages.length - 1
                ) {

                    runPipeline.textContent =
                        "Run Again";

                } else {

                    runPipeline.textContent =
                        "Run Sequence";

                }

            }
        }


        /* ==================================================================
           RESET PIPELINE
           ================================================================== */

        function resetPipelineState() {

            pipelineToken++;


            pipelineRunning =
                false;


            pipelinePaused =
                false;


            pipelineIndex =
                -1;


            pipelineStages.forEach(
                stage => {

                    stage.classList.remove(
                        "is-active",
                        "is-complete"
                    );

                }
            );


            clearPipelineSignals();


            dockerMachine?.classList.remove(
                "is-building"
            );


            const runtime =
                $(
                    ".runtime-container",
                    pipelineDemo || document
                );


            const runtimeDetail =
                runtime?.querySelector(
                    "small"
                );


            if (runtimeDetail) {

                runtimeDetail.textContent =
                    "WAITING";

            }


            if (pipelineProgress) {

                pipelineProgress.style.width =
                    "0%";

            }


            if (pipelineStep) {

                pipelineStep.textContent =
                    `0 / ${pipelineStages.length}`;

            }


            if (pipelineStatus) {

                pipelineStatus.textContent =
                    "READY";

            }


            if (pipelineReadout) {

                pipelineReadout.innerHTML = `
                    <div>
                        <span>
                            PIPELINE://READY
                        </span>

                        <strong>
                            Build sequence ready.
                        </strong>
                    </div>

                    <p>
                        Watch source code move through Docker and become
                        a running container.
                    </p>

                    <code>
                        waiting...
                    </code>
                `;

            }


            updatePipelineButtons();
        }


        /* ==================================================================
           PAUSE-AWARE PIPELINE DELAY
           ================================================================== */

        async function pipelineDelay(
            milliseconds,
            token
        ) {

            if (reduceMotion) {
                return true;
            }


            let elapsed =
                0;


            while (
                elapsed <
                milliseconds
            ) {

                if (
                    token !==
                    pipelineToken
                ) {

                    return false;

                }


                if (pipelinePaused) {

                    await wait(
                        80
                    );


                    continue;
                }


                await wait(
                    80
                );


                elapsed +=
                    80;
            }


            return true;
        }


        /* ==================================================================
           RUN PIPELINE ONCE
           ================================================================== */

        async function playPipeline(
            mode = "MANUAL"
        ) {

            if (
                pipelineRunning ||
                pipelineStages.length === 0
            ) {

                return false;

            }


            /*
               If the last sequence already finished,
               begin again from Source.
            */

            if (
                pipelineIndex >=
                pipelineStages.length - 1
            ) {

                resetPipelineState();

            }


            pipelineRunning =
                true;


            pipelinePaused =
                false;


            const token =
                ++pipelineToken;


            updatePipelineButtons();


            for (
                let index =
                    pipelineIndex + 1;

                index <
                pipelineStages.length;

                index++
            ) {

                if (
                    token !==
                    pipelineToken
                ) {

                    pipelineRunning =
                        false;


                    return false;
                }


                /* ----------------------------------------------------------
                   Source → Docker
                   ---------------------------------------------------------- */

                if (
                    index === 1
                ) {

                    activatePipelineSignal(
                        0
                    );

                }


                /* ----------------------------------------------------------
                   Docker → Image
                   ---------------------------------------------------------- */

                if (
                    index === 3
                ) {

                    activatePipelineSignal(
                        1
                    );

                }


                activatePipelineStage(
                    index,
                    mode === "AUTO"
                        ? "AUTO • RUNNING"
                        : "RUNNING"
                );


                /*
                   Important stages remain visible slightly longer.
                */

                const dwell =
                    (
                        index === 2 ||
                        index === 3 ||
                        index === 5
                    )
                        ? 1450
                        : 1050;


                const completed =
                    await pipelineDelay(
                        dwell,
                        token
                    );


                if (!completed) {

                    pipelineRunning =
                        false;


                    return false;
                }
            }


            pipelineRunning =
                false;


            pipelinePaused =
                false;


            if (pipelineStatus) {

                pipelineStatus.textContent =
                    mode === "AUTO"
                        ? "AUTO • COMPLETE"
                        : "COMPLETE ✓";

            }


            updatePipelineButtons();


            return true;
        }


        /* ==================================================================
           DOCKER AUTOPLAY LOOP
           ================================================================== */

        async function startPipelineAutoLoop() {

            if (
                !pipelineDemo ||
                pipelineAutoRunning ||
                reducedMotionQuery.matches
            ) {

                return;

            }


            pipelineAutoRunning =
                true;


            const autoToken =
                ++pipelineAutoToken;


            while (
                pipelineAutoRunning &&
                autoToken ===
                pipelineAutoToken
            ) {

                /* ----------------------------------------------------------
                   Reset before each loop.
                   ---------------------------------------------------------- */

                resetPipelineState();


                const ready =
                    await demoDelay(
                        450,
                        () =>
                            pipelineAutoRunning &&
                            autoToken ===
                            pipelineAutoToken
                    );


                if (!ready) {
                    break;
                }


                /* ----------------------------------------------------------
                   Run Source → Container.
                   ---------------------------------------------------------- */

                await playPipeline(
                    "AUTO"
                );


                if (
                    !pipelineAutoRunning ||
                    autoToken !==
                    pipelineAutoToken
                ) {

                    break;

                }


                /* ----------------------------------------------------------
                   Keep final container visible.
                   ---------------------------------------------------------- */

                const completedHold =
                    await demoDelay(
                        1800,
                        () =>
                            pipelineAutoRunning &&
                            autoToken ===
                            pipelineAutoToken
                    );


                if (!completedHold) {
                    break;
                }

            }
        }


        /* ==================================================================
           STOP DOCKER AUTOPLAY
           ================================================================== */

        function stopPipelineAutoLoop() {

            pipelineAutoRunning =
                false;


            pipelineAutoToken++;


            /*
               Cancel the currently executing automatic sequence.
            */

            if (pipelineRunning) {

                pipelineToken++;


                pipelineRunning =
                    false;


                pipelinePaused =
                    false;

            }


            clearPipelineSignals();


            dockerMachine?.classList.remove(
                "is-building"
            );


            if (pipelineStatus) {

                pipelineStatus.textContent =
                    "PAUSED";

            }


            updatePipelineButtons();
        }


        /* ==================================================================
           PIPELINE STAGE INSPECTION

           Clicking an individual stage:
           - Stops autoplay.
           - Stops any sequence currently moving.
           - Leaves the selected stage visible.
           ================================================================== */

        pipelineStages.forEach(
            (
                stage,
                index
            ) => {

                stage.addEventListener(
                    "click",
                    () => {

                        pipelineController?.pause();


                        if (pipelineRunning) {

                            pipelineToken++;


                            pipelineRunning =
                                false;


                            pipelinePaused =
                                false;

                        }


                        clearPipelineSignals();


                        activatePipelineStage(
                            index,
                            "MANUAL"
                        );


                        updatePipelineButtons();
                    }
                );

            }
        );


        /* ==================================================================
           OPTIONAL MANUAL RUN
           ================================================================== */

        runPipeline?.addEventListener(
            "click",
            async () => {

                pipelineController?.pause();


                resetPipelineState();


                await playPipeline(
                    "MANUAL"
                );

            }
        );


        /* ==================================================================
           MANUAL PAUSE / RESUME
           ================================================================== */

        pausePipeline?.addEventListener(
            "click",
            () => {

                pipelineController?.pause();


                if (!pipelineRunning) {
                    return;
                }


                pipelinePaused =
                    !pipelinePaused;


                if (pipelineStatus) {

                    pipelineStatus.textContent =
                        pipelinePaused
                            ? "PAUSED"
                            : "RUNNING";

                }


                updatePipelineButtons();
            }
        );


        /* ==================================================================
           MANUAL NEXT
           ================================================================== */

        nextPipeline?.addEventListener(
            "click",
            () => {

                pipelineController?.pause();


                if (
                    pipelineStages.length === 0
                ) {

                    return;

                }


                if (pipelineRunning) {

                    pipelineToken++;


                    pipelineRunning =
                        false;


                    pipelinePaused =
                        false;

                }


                clearPipelineSignals();


                const nextIndex =
                    pipelineIndex >=
                    pipelineStages.length - 1

                        ? 0

                        : pipelineIndex + 1;


                activatePipelineStage(
                    nextIndex,
                    "MANUAL"
                );


                updatePipelineButtons();
            }
        );


        /* ==================================================================
           MANUAL RESET
           ================================================================== */

        resetPipeline?.addEventListener(
            "click",
            () => {

                pipelineController?.pause();


                resetPipelineState();
            }
        );


        /* ==================================================================
           INITIALIZE DOCKER PIPELINE
           ================================================================== */

        resetPipelineState();


        pipelineController =
            createViewportAutoDemo({

                element:
                    pipelineDemo,

                start:
                    startPipelineAutoLoop,

                stop:
                    stopPipelineAutoLoop,

                threshold:
                    0.28

            });


        /* ==================================================================
           04. IMAGE → CONTAINER FACTORY

                  app:v1
                     │
               ┌─────┼─────┐
               ↓     ↓     ↓
              C01   C02   C03

           One image remains reusable while independent containers
           are created from it.

           AUTOPLAY:
           - Creates Container 01
           - Creates Container 02
           - Creates Container 03
           - Holds completed state
           - Resets
           - Repeats
           ================================================================== */


        const imageFactory =
            $(".image-factory");


        const spawnContainer =
            $("#spawnContainer");


        const resetContainers =
            $("#resetContainers");


        const imageCore =
            $("#imageCore");


        const runtimePacket =
            $("#runtimePacket");


        const runtimeSlots =
            $$(
                "[data-slot]",
                imageFactory || document
            );


        const runtimePaths =
            $$(
                "[data-runtime-path]",
                imageFactory || document
            );


        const containerCount =
            $("#containerCount");


        const imageReadout =
            $("#imageRuntimeReadout");


        /* ==================================================================
           IMAGE FACTORY STATE
           ================================================================== */

        let runningContainers =
            0;


        let containerBusy =
            false;


        let imageAutoRunning =
            false;


        let imageAutoToken =
            0;


        let imageController =
            null;


        /* ==================================================================
           UPDATE CONTAINER COUNT
           ================================================================== */

        function updateContainerCount() {

            if (!containerCount) {
                return;
            }


            containerCount.textContent =
                `${runningContainers} RUNNING`;
        }


        /* ==================================================================
           RESET IMAGE FACTORY
           ================================================================== */

        function resetContainerFactory() {

            runningContainers =
                0;


            containerBusy =
                false;


            imageCore?.classList.remove(
                "is-launching"
            );


            runtimePacket?.classList.remove(
                "is-moving"
            );


            runtimeSlots.forEach(
                slot => {

                    slot.classList.remove(
                        "is-running"
                    );


                    const status =
                        slot.querySelector(
                            ".runtime-instance__status"
                        );


                    const name =
                        slot.querySelector(
                            "strong"
                        );


                    const detail =
                        slot.querySelector(
                            "small"
                        );


                    if (status) {

                        status.textContent =
                            "STANDBY";

                    }


                    if (name) {

                        name.textContent =
                            "EMPTY";

                    }


                    if (detail) {

                        detail.textContent =
                            "waiting for image";

                    }

                }
            );


            runtimePaths.forEach(
                path => {

                    path.classList.remove(
                        "is-live"
                    );

                }
            );


            updateContainerCount();


            if (spawnContainer) {

                spawnContainer.disabled =
                    false;

            }


            if (imageReadout) {

                imageReadout.innerHTML = `
                    <div>
                        <span>
                            RELATIONSHIP://READY
                        </span>

                        <strong>
                            One image can create many containers.
                        </strong>
                    </div>

                    <p>
                        The image remains reusable after each
                        container is created.
                    </p>

                    <code>
                        docker run app:v1
                    </code>
                `;

            }
        }


        /* ==================================================================
           SHOW COMPLETED IMAGE FACTORY
           ================================================================== */

        function showImageFactoryComplete() {

            if (!imageReadout) {
                return;
            }


            imageReadout.innerHTML = `
                <div>
                    <span>
                        RELATIONSHIP://IMAGE REUSED
                    </span>

                    <strong>
                        app:v1 still exists.
                    </strong>
                </div>

                <p>
                    Three independent containers are running from
                    the same reusable image.
                </p>

                <code>
                    1 image → 3 containers
                </code>
            `;
        }


        /* ==================================================================
           CREATE ONE CONTAINER

           autoToken:
           - Number during autoplay.
           - null during manual use.
           ================================================================== */

        async function launchContainer(
            autoToken = null
        ) {

            if (
                containerBusy ||
                runningContainers >=
                runtimeSlots.length
            ) {

                if (
                    runningContainers >=
                    runtimeSlots.length
                ) {

                    showImageFactoryComplete();

                }


                return false;
            }


            containerBusy =
                true;


            if (spawnContainer) {

                spawnContainer.disabled =
                    true;

            }


            /* --------------------------------------------------------------
               Image lights up.
               -------------------------------------------------------------- */

            imageCore?.classList.add(
                "is-launching"
            );


            /* --------------------------------------------------------------
               Restart moving packet.
               -------------------------------------------------------------- */

            runtimePacket?.classList.remove(
                "is-moving"
            );


            if (runtimePacket) {

                void runtimePacket.offsetWidth;


                runtimePacket.classList.add(
                    "is-moving"
                );

            }


            const containerNumber =
                runningContainers + 1;


            if (imageReadout) {

                imageReadout.innerHTML = `
                    <div>
                        <span>
                            RELATIONSHIP://DOCKER RUN
                        </span>

                        <strong>
                            Creating Container ${String(
                                containerNumber
                            ).padStart(
                                2,
                                "0"
                            )}
                        </strong>
                    </div>

                    <p>
                        Docker uses app:v1 as the reusable template.
                    </p>

                    <code>
                        docker run app:v1
                    </code>
                `;

            }


            /* --------------------------------------------------------------
               Let the visual packet travel.
               -------------------------------------------------------------- */

            await wait(
                900
            );


            /* --------------------------------------------------------------
               Autoplay may have been cancelled during the movement.
               -------------------------------------------------------------- */

            if (
                autoToken !== null &&
                (
                    !imageAutoRunning ||
                    autoToken !==
                    imageAutoToken
                )
            ) {

                imageCore?.classList.remove(
                    "is-launching"
                );


                runtimePacket?.classList.remove(
                    "is-moving"
                );


                if (spawnContainer) {

                    spawnContainer.disabled =
                        false;

                }


                containerBusy =
                    false;


                return false;
            }


            const slot =
                runtimeSlots[
                    runningContainers
                ];


            const path =
                runtimePaths[
                    runningContainers
                ];


            /* --------------------------------------------------------------
               Activate this runtime path.
               -------------------------------------------------------------- */

            path?.classList.add(
                "is-live"
            );


            /* --------------------------------------------------------------
               Start the new container.
               -------------------------------------------------------------- */

            slot?.classList.add(
                "is-running"
            );


            const status =
                slot?.querySelector(
                    ".runtime-instance__status"
                );


            const name =
                slot?.querySelector(
                    "strong"
                );


            const detail =
                slot?.querySelector(
                    "small"
                );


            if (status) {

                status.textContent =
                    "RUNNING";

            }


            if (name) {

                name.textContent =
                    `CONTAINER ${
                        String(
                            containerNumber
                        ).padStart(
                            2,
                            "0"
                        )
                    }`;

            }


            if (detail) {

                detail.textContent =
                    "node app.mjs";

            }


            runningContainers++;


            updateContainerCount();


            /* --------------------------------------------------------------
               Readout
               -------------------------------------------------------------- */

            if (
                runningContainers >=
                runtimeSlots.length
            ) {

                showImageFactoryComplete();

            } else if (imageReadout) {

                imageReadout.innerHTML = `
                    <div>
                        <span>
                            RELATIONSHIP://INSTANCE CREATED
                        </span>

                        <strong>
                            Container ${String(
                                runningContainers
                            ).padStart(
                                2,
                                "0"
                            )} is running.
                        </strong>
                    </div>

                    <p>
                        app:v1 remains available and can create
                        another independent container.
                    </p>

                    <code>
                        app:v1 → container-${runningContainers}
                    </code>
                `;

            }


            imageCore?.classList.remove(
                "is-launching"
            );


            runtimePacket?.classList.remove(
                "is-moving"
            );


            if (spawnContainer) {

                spawnContainer.disabled =
                    false;

            }


            containerBusy =
                false;


            return true;
        }


        /* ==================================================================
           IMAGE FACTORY AUTOPLAY
           ================================================================== */

        async function startImageAutoLoop() {

            if (
                !imageFactory ||
                imageAutoRunning ||
                reducedMotionQuery.matches
            ) {

                return;

            }


            imageAutoRunning =
                true;


            const autoToken =
                ++imageAutoToken;


            /*
               If the user scrolls back into the demo after it stopped
               naturally, begin from a clean state.
            */

            if (
                runningContainers >=
                runtimeSlots.length
            ) {

                resetContainerFactory();

            }


            while (
                imageAutoRunning &&
                autoToken ===
                imageAutoToken
            ) {

                /* ----------------------------------------------------------
                   All three containers running.
                   Hold the final state before restarting.
                   ---------------------------------------------------------- */

                if (
                    runningContainers >=
                    runtimeSlots.length
                ) {

                    showImageFactoryComplete();


                    const completedHold =
                        await demoDelay(
                            2000,
                            () =>
                                imageAutoRunning &&
                                autoToken ===
                                imageAutoToken
                        );


                    if (!completedHold) {

                        break;

                    }


                    resetContainerFactory();


                    const resetHold =
                        await demoDelay(
                            650,
                            () =>
                                imageAutoRunning &&
                                autoToken ===
                                imageAutoToken
                        );


                    if (!resetHold) {

                        break;

                    }
                }


                /* ----------------------------------------------------------
                   Create next container from the same image.
                   ---------------------------------------------------------- */

                const created =
                    await launchContainer(
                        autoToken
                    );


                if (
                    !created ||
                    !imageAutoRunning ||
                    autoToken !==
                    imageAutoToken
                ) {

                    break;

                }


                /* ----------------------------------------------------------
                   Let each newly created container remain visible.
                   ---------------------------------------------------------- */

                const betweenContainers =
                    await demoDelay(
                        900,
                        () =>
                            imageAutoRunning &&
                            autoToken ===
                            imageAutoToken
                    );


                if (!betweenContainers) {

                    break;

                }
            }
        }


        /* ==================================================================
           STOP IMAGE FACTORY AUTOPLAY
           ================================================================== */

        function stopImageAutoLoop() {

            imageAutoRunning =
                false;


            imageAutoToken++;


            imageCore?.classList.remove(
                "is-launching"
            );


            runtimePacket?.classList.remove(
                "is-moving"
            );


            containerBusy =
                false;


            if (spawnContainer) {

                spawnContainer.disabled =
                    false;

            }
        }


        /* ==================================================================
           MANUAL "RUN IMAGE"

           The user can still create containers one at a time.
           ================================================================== */

        spawnContainer?.addEventListener(
            "click",
            async () => {

                imageController?.pause();


                await launchContainer(
                    null
                );

            }
        );


        /* ==================================================================
           MANUAL RESET
           ================================================================== */

        resetContainers?.addEventListener(
            "click",
            () => {

                imageController?.pause();


                stopImageAutoLoop();


                resetContainerFactory();
            }
        );


        /* ==================================================================
           CLICKING THE IMAGE / CONTAINERS = INSPECTION MODE

           This does not modify the selected state.
           It simply stops autoplay so the visitor can look at the diagram.
           ================================================================== */

        imageCore?.addEventListener(
            "click",
            () => {

                imageController?.pause();

            }
        );


        runtimeSlots.forEach(
            slot => {

                slot.addEventListener(
                    "click",
                    () => {

                        imageController?.pause();

                    }
                );

            }
        );


        /* ==================================================================
           INITIALIZE IMAGE FACTORY
           ================================================================== */

        resetContainerFactory();


        imageController =
            createViewportAutoDemo({

                element:
                    imageFactory,

                start:
                    startImageAutoLoop,

                stop:
                    stopImageAutoLoop,

                threshold:
                    0.28

            });


        /* ==================================================================
           END IMAGE → CONTAINER FACTORY
           ================================================================== */
                   /* ==================================================================
           05. CONTAINERS VS. VIRTUAL MACHINES

           AUTOPLAY:
           Containers → Virtual Machines → Containers → ...

           Clicking either comparison button pauses autoplay.
           ================================================================== */


        const computeDemo =
            $(".compute-architecture");


        const computeButtons =
            $$(
                "[data-compute]",
                computeDemo || document
            );


        const computeSchematic =
            $("#computeSchematic");


        const computeReadout =
            $("#computeReadout");


        /* ==================================================================
           COMPUTE COMPARISON DATA
           ================================================================== */

        const computeData = {

            container: {

                middle:
                    "Container Runtime",

                description:
                    "Containers package the application and its dependencies while sharing the host operating-system kernel."

            },


            vm: {

                middle:
                    "Hypervisor",

                description:
                    "Virtual machines provide each workload with its own guest operating system above a hypervisor."

            }

        };


        /* ==================================================================
           COMPUTE STATE
           ================================================================== */

        let computeMode =
            "container";


        let computeAutoRunning =
            false;


        let computeAutoToken =
            0;


        let computeController =
            null;


        /* ==================================================================
           RENDER COMPUTE MODEL
           ================================================================== */

        function renderComputeModel(
            model
        ) {

            const data =
                computeData[model];


            if (
                !data ||
                !computeSchematic
            ) {

                return;
            }


            computeMode =
                model;


            const virtualMachine =
                model === "vm";


            /* --------------------------------------------------------------
               Toggle selected control.
               -------------------------------------------------------------- */

            computeButtons.forEach(
                button => {

                    button.classList.toggle(
                        "is-active",
                        button.dataset.compute ===
                        model
                    );

                }
            );


            /* --------------------------------------------------------------
               Render architecture.
               -------------------------------------------------------------- */

            computeSchematic.innerHTML = `

                <div class="compute-workloads">

                    ${
                        [
                            1,
                            2,
                            3
                        ]
                        .map(
                            number => `

                                <div
                                    class="
                                        compute-workload
                                        ${virtualMachine ? "is-vm" : ""}
                                    "
                                >

                                    <strong>
                                        ${
                                            virtualMachine
                                                ? `VM ${String(number).padStart(2, "0")}`
                                                : `CONTAINER ${String(number).padStart(2, "0")}`
                                        }
                                    </strong>

                                    <span>
                                        Application + Dependencies
                                    </span>

                                    ${
                                        virtualMachine
                                            ? `
                                                <div class="compute-workload__guest">
                                                    Guest Operating System
                                                </div>
                                            `
                                            : ""
                                    }

                                </div>

                            `
                        )
                        .join("")
                    }

                </div>


                <div class="compute-layer compute-layer--accent">
                    ${data.middle}
                </div>


                ${
                    virtualMachine

                        ? ""

                        : `
                            <div class="compute-layer">
                                Shared Host Kernel
                            </div>
                        `
                }


                <div class="compute-layer">

                    ${
                        virtualMachine
                            ? "Physical Infrastructure"
                            : "Host Operating System"
                    }

                </div>


                <div class="compute-layer">
                    Hardware
                </div>

            `;


            /* --------------------------------------------------------------
               Explanation.
               -------------------------------------------------------------- */

            if (computeReadout) {

                computeReadout.textContent =
                    data.description;

            }
        }


        /* ==================================================================
           COMPUTE AUTOPLAY
           ================================================================== */

        async function startComputeAutoLoop() {

            if (
                !computeDemo ||
                computeAutoRunning ||
                reducedMotionQuery.matches
            ) {

                return;
            }


            computeAutoRunning =
                true;


            const autoToken =
                ++computeAutoToken;


            const sequence = [
                "container",
                "vm"
            ];


            let index =
                sequence.indexOf(
                    computeMode
                );


            if (index < 0) {
                index = 0;
            }


            while (
                computeAutoRunning &&
                autoToken ===
                computeAutoToken
            ) {

                renderComputeModel(
                    sequence[index]
                );


                const hold =
                    await demoDelay(
                        2600,
                        () =>
                            computeAutoRunning &&
                            autoToken ===
                            computeAutoToken
                    );


                if (!hold) {
                    break;
                }


                index =
                    (
                        index + 1
                    ) %
                    sequence.length;
            }
        }


        /* ==================================================================
           STOP COMPUTE AUTOPLAY
           ================================================================== */

        function stopComputeAutoLoop() {

            computeAutoRunning =
                false;


            computeAutoToken++;
        }


        /* ==================================================================
           MANUAL COMPUTE INSPECTION
           ================================================================== */

        computeButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        computeController?.pause();


                        renderComputeModel(
                            button.dataset.compute
                        );

                    }
                );

            }
        );


        /* ==================================================================
           INITIALIZE COMPUTE COMPARISON
           ================================================================== */

        renderComputeModel(
            "container"
        );


        computeController =
            createViewportAutoDemo({

                element:
                    computeDemo,

                start:
                    startComputeAutoLoop,

                stop:
                    stopComputeAutoLoop,

                threshold:
                    0.32

            });


        /* ==================================================================
           06. KUBERNETES ARCHITECTURE

           Automatic architecture tour:

           API Server
               ↓
           etcd
               ↓
           Scheduler
               ↓
           Controller Manager
               ↓
           kubelet
               ↓
           CRI
               ↓
           Container Runtime
               ↓
           Pods
               ↓
           kube-proxy

           Clicking any component pauses the automatic tour.
           ================================================================== */


        const k8sDemo =
            $(".cluster-topology");


        const k8sButtons =
            $$(
                "[data-k8s]",
                k8sDemo || document
            );


        const k8sTitle =
            $("#k8sInspectorTitle");


        const k8sText =
            $("#k8sInspectorText");


        const k8sFacts =
            $("#k8sInspectorFacts");


        const k8sWires =
            $$(
                ".k8s-wire",
                k8sDemo || document
            );


        /* ==================================================================
           KUBERNETES COMPONENT DATA
           ================================================================== */

        const k8sData = {

            /* --------------------------------------------------------------
               API SERVER
               -------------------------------------------------------------- */

            api: {

                title:
                    "API Server",

                text:
                    "The API Server is the central interface to the Kubernetes control plane. kubectl, controllers, the scheduler, kubelets, and integrations communicate with Kubernetes resources through the API.",

                facts: {

                    Location:
                        "Control Plane",

                    Role:
                        "Cluster API",

                    Component:
                        "kube-apiserver",

                    Position:
                        "Central Hub"

                },

                routes: [
                    "api-etcd",
                    "api-scheduler",
                    "api-controller",
                    "api-worker-one",
                    "api-worker-two",
                    "api-network"
                ]

            },


            /* --------------------------------------------------------------
               ETCD
               -------------------------------------------------------------- */

            etcd: {

                title:
                    "etcd",

                text:
                    "etcd is the key-value store that holds Kubernetes cluster data and configuration.",

                facts: {

                    Location:
                        "Control Plane",

                    Type:
                        "Key-value Store",

                    Stores:
                        "Cluster Data",

                    Access:
                        "Through API Layer"

                },

                routes: [
                    "api-etcd"
                ]

            },


            /* --------------------------------------------------------------
               SCHEDULER
               -------------------------------------------------------------- */

            scheduler: {

                title:
                    "kube-scheduler",

                text:
                    "The scheduler watches for unscheduled Pods, evaluates available Nodes, and records which Node should run each Pod.",

                facts: {

                    Location:
                        "Control Plane",

                    Role:
                        "Pod Placement",

                    Input:
                        "Unscheduled Pods",

                    Result:
                        "Pod → Node Binding"

                },

                routes: [
                    "api-scheduler",
                    "api-worker-one",
                    "api-worker-two"
                ]

            },


            /* --------------------------------------------------------------
               CONTROLLER MANAGER
               -------------------------------------------------------------- */

            controller: {

                title:
                    "Controller Manager",

                text:
                    "Controllers continuously compare actual cluster state with desired state and work to reconcile any difference.",

                facts: {

                    Location:
                        "Control Plane",

                    Role:
                        "Reconciliation",

                    Observes:
                        "Cluster State",

                    Goal:
                        "Desired State"

                },

                routes: [
                    "api-controller",
                    "api-worker-one",
                    "api-worker-two"
                ]

            },


            /* --------------------------------------------------------------
               KUBELET
               -------------------------------------------------------------- */

            kubelet: {

                title:
                    "kubelet",

                text:
                    "The kubelet is the primary Node agent. It watches for Pods assigned to its Node and works with the container runtime to keep those containers running.",

                facts: {

                    Location:
                        "Worker Node",

                    Role:
                        "Node Agent",

                    Watches:
                        "Assigned Pods",

                    RuntimeLink:
                        "CRI"

                },

                routes: [
                    "api-worker-one",
                    "api-worker-two"
                ]

            },


            /* --------------------------------------------------------------
               CONTAINER RUNTIME INTERFACE
               -------------------------------------------------------------- */

            cri: {

                title:
                    "Container Runtime Interface",

                text:
                    "CRI is the interface between kubelet and a compatible container runtime.",

                facts: {

                    Type:
                        "Interface",

                    Between:
                        "kubelet ↔ runtime",

                    Protocol:
                        "CRI",

                    Purpose:
                        "Runtime Integration"

                },

                routes: [
                    "api-worker-one",
                    "api-worker-two"
                ]

            },


            /* --------------------------------------------------------------
               CONTAINER RUNTIME
               -------------------------------------------------------------- */

            runtime: {

                title:
                    "Container Runtime",

                text:
                    "The container runtime performs the low-level work required to create and run the containers inside Kubernetes Pods.",

                facts: {

                    Location:
                        "Worker Node",

                    Role:
                        "Container Execution",

                    ControlledVia:
                        "CRI",

                    Examples:
                        "containerd / CRI-O"

                },

                routes: [
                    "api-worker-one",
                    "api-worker-two"
                ]

            },


            /* --------------------------------------------------------------
               POD
               -------------------------------------------------------------- */

            pod: {

                title:
                    "Pod",

                text:
                    "A Pod is Kubernetes' smallest deployable workload unit and contains one or more closely related containers.",

                facts: {

                    Layer:
                        "Workload",

                    RunsOn:
                        "Worker Node",

                    Contains:
                        "Container(s)",

                    Lifecycle:
                        "Replaceable"

                },

                routes: [
                    "api-worker-one",
                    "api-worker-two"
                ]

            },


            /* --------------------------------------------------------------
               KUBE-PROXY
               -------------------------------------------------------------- */

            proxy: {

                title:
                    "kube-proxy",

                text:
                    "kube-proxy maintains Node networking rules used to implement Kubernetes Services when the cluster networking implementation uses it.",

                facts: {

                    Location:
                        "Node",

                    Role:
                        "Service Networking",

                    Status:
                        "Optional",

                    Watches:
                        "Service State"

                },

                routes: [
                    "api-network"
                ]

            }

        };


        /* ==================================================================
           KUBERNETES TOUR ORDER
           ================================================================== */

        const k8sTour = [
            "api",
            "etcd",
            "scheduler",
            "controller",
            "kubelet",
            "cri",
            "runtime",
            "pod",
            "proxy"
        ];


        /* ==================================================================
           KUBERNETES STATE
           ================================================================== */

        let k8sAutoRunning =
            false;


        let k8sAutoToken =
            0;


        let k8sTourIndex =
            0;


        let k8sController =
            null;


        /* ==================================================================
           CLEAR ARCHITECTURE
           ================================================================== */

        function clearK8sArchitecture() {

            k8sButtons.forEach(
                button => {

                    button.classList.remove(
                        "is-active"
                    );

                }
            );


            k8sWires.forEach(
                wire => {

                    wire.classList.remove(
                        "is-active"
                    );

                }
            );
        }


        /* ==================================================================
           UPDATE INSPECTOR
           ================================================================== */

        function updateK8sInspector(
            data
        ) {

            if (!data) {
                return;
            }


            if (k8sTitle) {

                k8sTitle.textContent =
                    data.title;

            }


            if (k8sText) {

                k8sText.textContent =
                    data.text;

            }


            if (k8sFacts) {

                k8sFacts.innerHTML =
                    Object
                        .entries(
                            data.facts
                        )
                        .map(
                            (
                                [
                                    label,
                                    value
                                ]
                            ) => `

                                <div>
                                    <span>
                                        ${label}
                                    </span>

                                    <strong>
                                        ${value}
                                    </strong>
                                </div>

                            `
                        )
                        .join("");

            }
        }


        /* ==================================================================
           INSPECT KUBERNETES COMPONENT

           Repeated components such as kubelet, CRI, runtimes and Pods
           light up on BOTH Worker Nodes. This intentionally shows that
           each worker contains its own Node components.
           ================================================================== */

        function inspectKubernetes(
            key
        ) {

            const data =
                k8sData[key];


            if (!data) {
                return;
            }


            clearK8sArchitecture();


            /* --------------------------------------------------------------
               Highlight component.
               -------------------------------------------------------------- */

            k8sButtons.forEach(
                button => {

                    if (
                        button.dataset.k8s ===
                        key
                    ) {

                        button.classList.add(
                            "is-active"
                        );

                    }

                }
            );


            /* --------------------------------------------------------------
               Highlight associated communication paths.
               -------------------------------------------------------------- */

            k8sWires.forEach(
                wire => {

                    if (
                        data.routes.includes(
                            wire.dataset.route
                        )
                    ) {

                        wire.classList.add(
                            "is-active"
                        );

                    }

                }
            );


            updateK8sInspector(
                data
            );


            const tourPosition =
                k8sTour.indexOf(
                    key
                );


            if (
                tourPosition >= 0
            ) {

                k8sTourIndex =
                    tourPosition;

            }
        }


        /* ==================================================================
           KUBERNETES AUTOPLAY
           ================================================================== */

        async function startK8sAutoLoop() {

            if (
                !k8sDemo ||
                k8sAutoRunning ||
                reducedMotionQuery.matches
            ) {

                return;

            }


            k8sAutoRunning =
                true;


            const autoToken =
                ++k8sAutoToken;


            while (
                k8sAutoRunning &&
                autoToken ===
                k8sAutoToken
            ) {

                const key =
                    k8sTour[
                        k8sTourIndex
                    ];


                inspectKubernetes(
                    key
                );


                const hold =
                    await demoDelay(
                        1900,
                        () =>
                            k8sAutoRunning &&
                            autoToken ===
                            k8sAutoToken
                    );


                if (!hold) {

                    break;

                }


                k8sTourIndex =
                    (
                        k8sTourIndex + 1
                    ) %
                    k8sTour.length;
            }
        }


        /* ==================================================================
           STOP KUBERNETES AUTOPLAY

           Current component stays highlighted for inspection.
           ================================================================== */

        function stopK8sAutoLoop() {

            k8sAutoRunning =
                false;


            k8sAutoToken++;
        }


        /* ==================================================================
           MANUAL KUBERNETES INSPECTION
           ================================================================== */

        k8sButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        k8sController?.pause();


                        inspectKubernetes(
                            button.dataset.k8s
                        );

                    }
                );

            }
        );


        /* ==================================================================
           INITIALIZE KUBERNETES ARCHITECTURE
           ================================================================== */

        inspectKubernetes(
            "api"
        );


        k8sController =
            createViewportAutoDemo({

                element:
                    k8sDemo,

                start:
                    startK8sAutoLoop,

                stop:
                    stopK8sAutoLoop,

                threshold:
                    0.22

            });


        /* ==================================================================
           END KUBERNETES ARCHITECTURE
           ================================================================== */
                   /* ==================================================================
           07. DESIRED STATE / SELF-HEALING

           Desired Replicas: 3
                   ↓
              Pod Failure
                   ↓
             Actual = 2
                   ↓
          Controller Detects Drift
                   ↓
             Reconciliation
                   ↓
            Replacement Pod
                   ↓
             Actual = 3

           AUTOPLAY:
           - Runs automatically when visible.
           - Repeats the failure / recovery demonstration.
           - Clicking Terminate Pod switches to manual control.
           - Reset remains available.
           ================================================================== */


        const desiredDemo =
            $(".desired-state");


        const desiredCount =
            $("#desiredCount");


        const actualCount =
            $("#actualCount");


        const controllerState =
            $("#controllerState");


        const podField =
            $("#podField");


        const controllerLog =
            $("#controllerLog");


        const reconcileBus =
            $("#reconcileBus");


        const terminatePod =
            $("#terminatePod");


        const resetPods =
            $("#resetPods");


        /* ==================================================================
           DESIRED STATE VALUES
           ================================================================== */

        let desiredPods =
            3;


        let actualPods =
            3;


        let nextPodNumber =
            4;


        let reconciling =
            false;


        /* Automatic demonstration */

        let desiredAutoRunning =
            false;


        let desiredAutoToken =
            0;


        /* Individual reconciliation sequence */

        let desiredSimulationToken =
            0;


        let desiredController =
            null;


        /* ==================================================================
           CREATE POD
           ================================================================== */

        function createPodElement(
            number,
            extraClass = ""
        ) {

            const pod =
                document.createElement(
                    "div"
                );


            pod.className =
                `sim-pod ${extraClass}`.trim();


            pod.textContent =
                `pod-${String(number).padStart(
                    2,
                    "0"
                )}`;


            return pod;
        }


        /* ==================================================================
           UPDATE COUNTS
           ================================================================== */

        function updateDesiredMetrics() {

            if (desiredCount) {

                desiredCount.textContent =
                    desiredPods;

            }


            if (actualCount) {

                actualCount.textContent =
                    actualPods;

            }
        }


        /* ==================================================================
           CONTROLLER STATUS
           ================================================================== */

        function setControllerHealthy() {

            if (!controllerState) {
                return;
            }


            controllerState.textContent =
                "SYNCHRONIZED";


            controllerState.className =
                "status-ok";
        }


        function setControllerMismatch() {

            if (!controllerState) {
                return;
            }


            controllerState.textContent =
                "STATE MISMATCH";


            controllerState.className =
                "status-warn";
        }


        /* ==================================================================
           CONTROLLER LOG
           ================================================================== */

        function setControllerLog(
            message
        ) {

            if (!controllerLog) {
                return;
            }


            controllerLog.innerHTML = `
                <span>
                    controller-manager $
                </span>

                ${message}
            `;
        }


        /* ==================================================================
           RENDER HEALTHY PODS
           ================================================================== */

        function renderInitialPods() {

            if (!podField) {
                return;
            }


            podField.innerHTML =
                "";


            for (
                let number = 1;
                number <= actualPods;
                number++
            ) {

                podField.appendChild(
                    createPodElement(
                        number
                    )
                );

            }


            updateDesiredMetrics();
        }


        /* ==================================================================
           RESET DESIRED STATE
           ================================================================== */

        function resetPodSimulation() {

            /*
               Cancel any reconciliation sequence currently waiting.
            */

            desiredSimulationToken++;


            desiredPods =
                3;


            actualPods =
                3;


            nextPodNumber =
                4;


            reconciling =
                false;


            reconcileBus?.classList.remove(
                "is-reconciling"
            );


            setControllerHealthy();


            setControllerLog(
                "desired state matches actual state"
            );


            if (terminatePod) {

                terminatePod.disabled =
                    false;

            }


            renderInitialPods();
        }


        /* ==================================================================
           VERIFY CURRENT RECONCILIATION TOKEN

           This allows autoplay to stop cleanly if:
           - The visitor interacts
           - The demo leaves the viewport
           - Reset is pressed
           ================================================================== */

        function desiredSequenceIsCurrent(
            simulationToken,
            autoToken
        ) {

            if (
                simulationToken !==
                desiredSimulationToken
            ) {

                return false;

            }


            /*
               Manual simulation has no autoplay token.
            */

            if (
                autoToken === null
            ) {

                return true;

            }


            return (
                desiredAutoRunning &&
                autoToken ===
                desiredAutoToken
            );
        }


        /* ==================================================================
           SELF-HEALING SIMULATION
           ================================================================== */

        async function terminatePodSimulation(
            mode = "MANUAL",
            autoToken = null
        ) {

            if (
                reconciling ||
                actualPods <= 0 ||
                !podField
            ) {

                return false;

            }


            reconciling =
                true;


            const simulationToken =
                ++desiredSimulationToken;


            if (terminatePod) {

                terminatePod.disabled =
                    true;

            }


            /* ------------------------------------------------------------------
               STEP 1 — A Pod Fails
               ------------------------------------------------------------------ */

            const pods =
                $$(
                    ".sim-pod",
                    podField
                );


            const failedPod =
                pods[
                    pods.length - 1
                ];


            failedPod?.classList.add(
                "is-dead"
            );


            setControllerLog(
                "pod termination detected..."
            );


            const failureVisible =
                await demoDelay(
                    700,
                    () =>
                        desiredSequenceIsCurrent(
                            simulationToken,
                            autoToken
                        )
                );


            if (!failureVisible) {

                reconciling =
                    false;


                if (
                    actualPods ===
                    desiredPods &&
                    terminatePod
                ) {

                    terminatePod.disabled =
                        false;

                }


                return false;
            }


            /* ------------------------------------------------------------------
               STEP 2 — Failed Pod Leaves Actual State
               ------------------------------------------------------------------ */

            failedPod?.remove();


            actualPods--;


            updateDesiredMetrics();


            setControllerMismatch();


            reconcileBus?.classList.add(
                "is-reconciling"
            );


            setControllerLog(
                `desired=${desiredPods} actual=${actualPods}; reconciliation required`
            );


            /* ------------------------------------------------------------------
               Keep the mismatch visible.
               ------------------------------------------------------------------ */

            const mismatchVisible =
                await demoDelay(
                    1250,
                    () =>
                        desiredSequenceIsCurrent(
                            simulationToken,
                            autoToken
                        )
                );


            if (!mismatchVisible) {

                reconciling =
                    false;


                reconcileBus?.classList.remove(
                    "is-reconciling"
                );


                return false;
            }


            /* ------------------------------------------------------------------
               STEP 3 — Scheduler / Controller Recovery
               ------------------------------------------------------------------ */

            setControllerLog(
                "scheduler selecting worker; creating replacement pod..."
            );


            const replacementDelay =
                await demoDelay(
                    950,
                    () =>
                        desiredSequenceIsCurrent(
                            simulationToken,
                            autoToken
                        )
                );


            if (!replacementDelay) {

                reconciling =
                    false;


                reconcileBus?.classList.remove(
                    "is-reconciling"
                );


                return false;
            }


            /* ------------------------------------------------------------------
               STEP 4 — Replacement Pod Appears
               ------------------------------------------------------------------ */

            const replacement =
                createPodElement(
                    nextPodNumber++,
                    "is-new"
                );


            podField.appendChild(
                replacement
            );


            actualPods++;


            updateDesiredMetrics();


            reconcileBus?.classList.remove(
                "is-reconciling"
            );


            setControllerHealthy();


            setControllerLog(
                `replacement created; desired=${desiredPods} actual=${actualPods}`
            );


            /* ------------------------------------------------------------------
               After the entrance animation, replacement becomes a normal
               running Pod.
               ------------------------------------------------------------------ */

            window.setTimeout(
                () => {

                    replacement.classList.remove(
                        "is-new"
                    );

                },
                reduceMotion
                    ? 0
                    : 1100
            );


            if (terminatePod) {

                terminatePod.disabled =
                    false;

            }


            reconciling =
                false;


            return true;
        }


        /* ==================================================================
           DESIRED STATE AUTOPLAY
           ================================================================== */

        async function startDesiredAutoLoop() {

            if (
                !desiredDemo ||
                desiredAutoRunning ||
                reducedMotionQuery.matches
            ) {

                return;

            }


            desiredAutoRunning =
                true;


            const autoToken =
                ++desiredAutoToken;


            while (
                desiredAutoRunning &&
                autoToken ===
                desiredAutoToken
            ) {

                /* ----------------------------------------------------------
                   Begin every lesson from the same known state.
                   ---------------------------------------------------------- */

                resetPodSimulation();


                const healthyHold =
                    await demoDelay(
                        1100,
                        () =>
                            desiredAutoRunning &&
                            autoToken ===
                            desiredAutoToken
                    );


                if (!healthyHold) {

                    break;

                }


                /* ----------------------------------------------------------
                   Demonstrate failure and self-healing.
                   ---------------------------------------------------------- */

                const healed =
                    await terminatePodSimulation(
                        "AUTO",
                        autoToken
                    );


                if (
                    !healed ||
                    !desiredAutoRunning ||
                    autoToken !==
                    desiredAutoToken
                ) {

                    break;

                }


                /* ----------------------------------------------------------
                   Leave recovered state visible.
                   ---------------------------------------------------------- */

                const healedHold =
                    await demoDelay(
                        1900,
                        () =>
                            desiredAutoRunning &&
                            autoToken ===
                            desiredAutoToken
                    );


                if (!healedHold) {

                    break;

                }

            }
        }


        /* ==================================================================
           STOP DESIRED STATE AUTOPLAY

           Stops animation but leaves the current architecture visible.
           ================================================================== */

        function stopDesiredAutoLoop() {

            desiredAutoRunning =
                false;


            desiredAutoToken++;


            /*
               Cancel any active reconciliation wait.
            */

            desiredSimulationToken++;


            reconciling =
                false;


            reconcileBus?.classList.remove(
                "is-reconciling"
            );


            /*
               Only allow another immediate termination if the system is
               currently healthy. If the visitor paused during a mismatch,
               Reset remains available.
            */

            if (terminatePod) {

                terminatePod.disabled =
                    actualPods !==
                    desiredPods;

            }
        }


        /* ==================================================================
           MANUAL TERMINATE POD

           If autoplay was stopped halfway through a failure, manual use
           starts again from a clean three-Pod state.
           ================================================================== */

        terminatePod?.addEventListener(
            "click",
            async () => {

                desiredController?.pause();


                if (
                    actualPods !==
                    desiredPods ||
                    podField?.querySelector(
                        ".sim-pod.is-dead"
                    )
                ) {

                    resetPodSimulation();

                }


                await terminatePodSimulation(
                    "MANUAL",
                    null
                );

            }
        );


        /* ==================================================================
           MANUAL RESET
           ================================================================== */

        resetPods?.addEventListener(
            "click",
            () => {

                desiredController?.pause();


                stopDesiredAutoLoop();


                resetPodSimulation();

            }
        );


        /* ==================================================================
           CLICKING THE POD FIELD = INSPECTION MODE

           Useful if the visitor wants to freeze the animation while
           looking at a failed or replacement Pod.
           ================================================================== */

        podField?.addEventListener(
            "click",
            () => {

                desiredController?.pause();

            }
        );


        /* ==================================================================
           INITIALIZE DESIRED STATE
           ================================================================== */

        resetPodSimulation();


        desiredController =
            createViewportAutoDemo({

                element:
                    desiredDemo,

                start:
                    startDesiredAutoLoop,

                stop:
                    stopDesiredAutoLoop,

                threshold:
                    0.30

            });


        /* ==================================================================
           08. KUBECTL THEORY CONSOLE

           Automatic command tour:

           kubectl get nodes
                   ↓
           kubectl get pods
                   ↓
           kubectl get deployments
                   ↓
           kubectl get services

           Clicking any command pauses autoplay and runs that command
           manually.
           ================================================================== */


        const cliDemo =
            $(".kubectl-console");


        const cliButtons =
            $$(
                "[data-cli]",
                cliDemo || document
            );


        const cliTerminal =
            $("#cliTerminal");


        /* ==================================================================
           KUBECTL COMMAND DATA
           ================================================================== */

        const cliData = {

            nodes: {

                command:
                    "kubectl get nodes",

                output:
`NAME             STATUS   ROLES           AGE
docker-desktop   Ready    control-plane   2h`,

                explanation:
                    "Lists the nodes registered with the current Kubernetes cluster."

            },


            pods: {

                command:
                    "kubectl get pods",

                output:
`NAME        READY   STATUS    RESTARTS   AGE
web-7d9f    1/1     Running   0          22m
api-6b44    1/1     Running   0          22m`,

                explanation:
                    "Lists Pods in the current namespace and shows their current runtime state."

            },


            deployments: {

                command:
                    "kubectl get deployments",

                output:
`NAME   READY   UP-TO-DATE   AVAILABLE   AGE
web    3/3     3            3           22m`,

                explanation:
                    "Lists Deployments and summarizes the replica state they manage."

            },


            services: {

                command:
                    "kubectl get services",

                output:
`NAME         TYPE        CLUSTER-IP
kubernetes   ClusterIP   10.96.0.1
web          ClusterIP   10.96.18.20`,

                explanation:
                    "Lists Kubernetes Services and the network abstractions they provide."

            }

        };


        /* ==================================================================
           KUBECTL TOUR
           ================================================================== */

        const cliTour = [
            "nodes",
            "pods",
            "deployments",
            "services"
        ];


        /* ==================================================================
           KUBECTL STATE
           ================================================================== */

        let cliBusy =
            false;


        let cliRunToken =
            0;


        let cliAutoRunning =
            false;


        let cliAutoToken =
            0;


        let cliTourIndex =
            0;


        let cliController =
            null;


        /* ==================================================================
           TYPING EFFECT
           Cancellation-aware.
           ================================================================== */

        async function typeCliText(
            element,
            text,
            runToken
        ) {

            if (!element) {
                return false;
            }


            if (reduceMotion) {

                element.textContent +=
                    text;


                return true;
            }


            for (
                const character
                of text
            ) {

                if (
                    runToken !==
                    cliRunToken
                ) {

                    return false;

                }


                element.textContent +=
                    character;


                await wait(
                    16
                );

            }


            return true;
        }


        /* ==================================================================
           CHECK CURRENT CLI RUN
           ================================================================== */

        function cliRunIsCurrent(
            runToken,
            autoToken
        ) {

            if (
                runToken !==
                cliRunToken
            ) {

                return false;

            }


            if (
                autoToken === null
            ) {

                return true;

            }


            return (
                cliAutoRunning &&
                autoToken ===
                cliAutoToken
            );
        }


        /* ==================================================================
           RUN KUBECTL COMMAND
           ================================================================== */

        async function runCli(
            key,
            button,
            mode = "MANUAL",
            autoToken = null
        ) {

            const data =
                cliData[key];


            if (
                !data ||
                !cliTerminal
            ) {

                return false;

            }


            /*
               Cancel any previous typing sequence.
            */

            cliRunToken++;


            const runToken =
                cliRunToken;


            cliBusy =
                true;


            /* --------------------------------------------------------------
               Active command.
               -------------------------------------------------------------- */

            cliButtons.forEach(
                item => {

                    item.classList.toggle(
                        "is-active",
                        item === button
                    );

                }
            );


            /* --------------------------------------------------------------
               Clear Terminal.
               -------------------------------------------------------------- */

            cliTerminal.innerHTML =
                "";


            /* --------------------------------------------------------------
               Prompt.
               -------------------------------------------------------------- */

            const command =
                document.createElement(
                    "div"
                );


            command.className =
                "terminal-command";


            command.textContent =
                "darling@DarlingPC:~$ ";


            cliTerminal.appendChild(
                command
            );


            /* --------------------------------------------------------------
               Type Command.
               -------------------------------------------------------------- */

            const typed =
                await typeCliText(
                    command,
                    data.command,
                    runToken
                );


            if (!typed) {

                cliBusy =
                    false;


                return false;
            }


            /* --------------------------------------------------------------
               Short terminal processing delay.
               -------------------------------------------------------------- */

            const processing =
                await demoDelay(
                    240,
                    () =>
                        cliRunIsCurrent(
                            runToken,
                            autoToken
                        )
                );


            if (!processing) {

                cliBusy =
                    false;


                return false;
            }


            /* --------------------------------------------------------------
               Output.
               -------------------------------------------------------------- */

            const output =
                document.createElement(
                    "div"
                );


            output.textContent =
                `\n\n${data.output}`;


            cliTerminal.appendChild(
                output
            );


            /* --------------------------------------------------------------
               Explanation.
               -------------------------------------------------------------- */

            const explanationDelay =
                await demoDelay(
                    250,
                    () =>
                        cliRunIsCurrent(
                            runToken,
                            autoToken
                        )
                );


            if (!explanationDelay) {

                cliBusy =
                    false;


                return false;
            }


            const explanation =
                document.createElement(
                    "div"
                );


            explanation.className =
                "terminal-success";


            explanation.textContent =
                `\n\n✓ ${data.explanation}`;


            cliTerminal.appendChild(
                explanation
            );


            cliBusy =
                false;


            return true;
        }


        /* ==================================================================
           KUBECTL AUTOPLAY
           ================================================================== */

        async function startCliAutoLoop() {

            if (
                !cliDemo ||
                cliAutoRunning ||
                reducedMotionQuery.matches
            ) {

                return;

            }


            cliAutoRunning =
                true;


            const autoToken =
                ++cliAutoToken;


            while (
                cliAutoRunning &&
                autoToken ===
                cliAutoToken
            ) {

                const key =
                    cliTour[
                        cliTourIndex
                    ];


                const button =
                    cliButtons.find(
                        item =>
                            item.dataset.cli ===
                            key
                    );


                const completed =
                    await runCli(
                        key,
                        button,
                        "AUTO",
                        autoToken
                    );


                if (
                    !completed ||
                    !cliAutoRunning ||
                    autoToken !==
                    cliAutoToken
                ) {

                    break;

                }


                const hold =
                    await demoDelay(
                        1800,
                        () =>
                            cliAutoRunning &&
                            autoToken ===
                            cliAutoToken
                    );


                if (!hold) {

                    break;

                }


                cliTourIndex =
                    (
                        cliTourIndex + 1
                    ) %
                    cliTour.length;
            }
        }


        /* ==================================================================
           STOP KUBECTL AUTOPLAY
           ================================================================== */

        function stopCliAutoLoop() {

            cliAutoRunning =
                false;


            cliAutoToken++;


            cliRunToken++;


            cliBusy =
                false;
        }


        /* ==================================================================
           MANUAL KUBECTL COMMAND
           ================================================================== */

        cliButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        cliController?.pause();


                        const key =
                            button.dataset.cli;


                        const position =
                            cliTour.indexOf(
                                key
                            );


                        if (
                            position >= 0
                        ) {

                            cliTourIndex =
                                position;

                        }


                        await runCli(
                            key,
                            button,
                            "MANUAL",
                            null
                        );

                    }
                );

            }
        );


        /* ==================================================================
           INITIAL KUBECTL SCREEN
           ================================================================== */

        if (cliTerminal) {

            cliTerminal.innerHTML = `
                <span class="terminal-muted">
                    Commands will run automatically when this console
                    enters the viewport. Select any command to inspect
                    it manually.
                </span>
            `;

        }


        /* ==================================================================
           CONNECT KUBECTL TO VIEWPORT AUTOPLAY
           ================================================================== */

        cliController =
            createViewportAutoDemo({

                element:
                    cliDemo,

                start:
                    startCliAutoLoop,

                stop:
                    stopCliAutoLoop,

                threshold:
                    0.30

            });


        /* ==================================================================
           END DESIRED STATE + KUBECTL
           ================================================================== */

                   /* ==================================================================
           09. SYSTEM HANDOFF

           Source
              ↓
           Docker
              ↓
           Image
              ↓
           Registry
              ↓
           Deployment
              ↓
           Pods

           AUTOPLAY:
           - Starts automatically when visible.
           - Loops continuously.
           - Clicking a stage pauses autoplay.
           - Run Delivery Flow remains available manually.
           - Moving signal becomes the Docker whale after Docker.
           ================================================================== */


        const handoffDemo =
            $(".handoff-network");


        const handoffButtons =
            $$(
                "[data-handoff]",
                handoffDemo || document
            );


        const handoffLines =
            $$(
                ".handoff-line",
                handoffDemo || document
            );


        const runHandoff =
            $("#runHandoff");


        const handoffMode =
            $("#handoffMode");


        const handoffPacket =
            $("#handoffPacket");


        const handoffReadout =
            $("#handoffReadout");


        /* ==================================================================
           HANDOFF CONTENT
           ================================================================== */

        const handoffData = {

            source: {

                label:
                    "SOURCE",

                title:
                    "Application Source",

                text:
                    "Application source code is the starting point of the delivery path."

            },


            docker: {

                label:
                    "DOCKER",

                title:
                    "Docker Build",

                text:
                    "Docker builds the application into a reusable container image."

            },


            image: {

                label:
                    "IMAGE",

                title:
                    "Container Image",

                text:
                    "The image is the portable artifact produced by the Docker build process."

            },


            registry: {

                label:
                    "REGISTRY",

                title:
                    "Container Registry",

                text:
                    "The registry stores and distributes versioned container images."

            },


            deployment: {

                label:
                    "DEPLOYMENT",

                title:
                    "Kubernetes Deployment",

                text:
                    "The Deployment references the image and declares the desired workload state."

            },


            pods: {

                label:
                    "PODS",

                title:
                    "Running Pods",

                text:
                    "Kubernetes creates Pods that run containers from the selected image."

            }

        };


        /* ==================================================================
           HANDOFF STATE
           ================================================================== */

        let handoffSequenceRunning =
            false;


        let handoffSequenceToken =
            0;


        let handoffAutoRunning =
            false;


        let handoffAutoToken =
            0;


        let handoffController =
            null;


        /* ==================================================================
           BUILD PACKET VISUAL

           Your current HTML contains:

           <div
               class="handoff-packet"
               id="handoffPacket"
           ></div>

           Instead of requiring another HTML edit, add the packet
           elements here if they do not already exist.
           ================================================================== */

        function prepareHandoffPacket() {

            if (!handoffPacket) {
                return;
            }


            if (
                !handoffPacket.querySelector(
                    ".handoff-packet__dot"
                )
            ) {

                const dot =
                    document.createElement(
                        "span"
                    );


                dot.className =
                    "handoff-packet__dot";


                handoffPacket.appendChild(
                    dot
                );

            }


            if (
                !handoffPacket.querySelector(
                    ".handoff-packet__docker"
                )
            ) {

                const docker =
                    document.createElement(
                        "iconify-icon"
                    );


                docker.className =
                    "handoff-packet__docker";


                docker.setAttribute(
                    "icon",
                    "logos:docker-icon"
                );


                handoffPacket.appendChild(
                    docker
                );

            }
        }


        /* ==================================================================
           UPDATE OPTIONAL LIVE STATUS
           ================================================================== */

        function updateHandoffStatus(
            state
        ) {

            if (handoffMode) {

                const strong =
                    handoffMode.querySelector(
                        "strong"
                    );


                const label =
                    handoffMode.querySelector(
                        "span:not(.handoff-live-status__pulse)"
                    );


                if (
                    state === "PAUSED"
                ) {

                    handoffMode.classList.add(
                        "is-paused"
                    );


                    if (label) {

                        label.textContent =
                            "INSPECT MODE";

                    }


                    if (strong) {

                        strong.textContent =
                            "PAUSED";

                    }

                } else {

                    handoffMode.classList.remove(
                        "is-paused"
                    );


                    if (label) {

                        label.textContent =
                            "AUTO FLOW";

                    }


                    if (strong) {

                        strong.textContent =
                            "RUNNING";

                    }

                }

            }


            /*
               Existing HTML uses the Run Delivery Flow button.
               Keep it useful as an optional manual control.
            */

            if (runHandoff) {

                if (
                    state === "RUNNING"
                ) {

                    runHandoff.textContent =
                        "Running Flow";


                } else if (
                    state === "COMPLETE"
                ) {

                    runHandoff.textContent =
                        "Run Again";


                } else {

                    runHandoff.textContent =
                        "Run Delivery Flow";

                }

            }
        }


        /* ==================================================================
           RESTART DELIVERY PACKET
           ================================================================== */

        function restartHandoffPacket() {

            if (!handoffPacket) {
                return;
            }


            handoffPacket.classList.remove(
                "is-running",
                "is-docker"
            );


            void handoffPacket.offsetWidth;


            handoffPacket.classList.add(
                "is-running"
            );
        }


        /* ==================================================================
           CLEAR HANDOFF
           ================================================================== */

        function clearHandoffState() {

            handoffButtons.forEach(
                button => {

                    button.classList.remove(
                        "is-active",
                        "is-complete"
                    );

                }
            );


            handoffLines.forEach(
                line => {

                    line.classList.remove(
                        "is-active"
                    );

                }
            );


            handoffPacket?.classList.remove(
                "is-running",
                "is-docker"
            );
        }


        /* ==================================================================
           ACTIVATE HANDOFF STAGE
           ================================================================== */

        function activateHandoffStage(
            index
        ) {

            const button =
                handoffButtons[index];


            if (!button) {
                return;
            }


            const key =
                button.dataset.handoff;


            const data =
                handoffData[key];


            if (!data) {
                return;
            }


            /* --------------------------------------------------------------
               Active / completed systems
               -------------------------------------------------------------- */

            handoffButtons.forEach(
                (
                    item,
                    itemIndex
                ) => {

                    item.classList.toggle(
                        "is-active",
                        itemIndex ===
                        index
                    );


                    item.classList.toggle(
                        "is-complete",
                        itemIndex <
                        index
                    );

                }
            );


            /* --------------------------------------------------------------
               Activate completed connectors.
               -------------------------------------------------------------- */

            handoffLines.forEach(
                (
                    line,
                    lineIndex
                ) => {

                    line.classList.toggle(
                        "is-active",
                        lineIndex <
                        index
                    );

                }
            );


            /* --------------------------------------------------------------
               Dot → Docker Whale

               Stage indexes:

               0 Source
               1 Docker
               2 Image
               3 Registry
               4 Deployment
               5 Pods

               The whale appears AFTER the packet passes Docker.
               -------------------------------------------------------------- */

            if (handoffPacket) {

                handoffPacket.classList.toggle(
                    "is-docker",
                    index >= 2
                );

            }


            /* --------------------------------------------------------------
               Readout
               -------------------------------------------------------------- */

            if (handoffReadout) {

                handoffReadout.innerHTML = `
                    <div>
                        <span>
                            FLOW://${data.label}
                        </span>

                        <strong>
                            ${data.title}
                        </strong>
                    </div>

                    <p>
                        ${data.text}
                    </p>
                `;

            }
        }


        /* ==================================================================
           COMPLETE HANDOFF
           ================================================================== */

        function showHandoffComplete() {

            handoffButtons.forEach(
                button => {

                    button.classList.remove(
                        "is-active"
                    );


                    button.classList.add(
                        "is-complete"
                    );

                }
            );


            handoffLines.forEach(
                line => {

                    line.classList.add(
                        "is-active"
                    );

                }
            );


            if (handoffReadout) {

                handoffReadout.innerHTML = `
                    <div>
                        <span>
                            FLOW://COMPLETE
                        </span>

                        <strong>
                            Workload delivery complete.
                        </strong>
                    </div>

                    <p>
                        Source code became a container image,
                        the image moved through the registry,
                        and Kubernetes launched the workload.
                    </p>
                `;

            }


            updateHandoffStatus(
                "COMPLETE"
            );
        }


        /* ==================================================================
           RESET HANDOFF
           ================================================================== */

        function resetHandoffState() {

            handoffSequenceToken++;


            handoffSequenceRunning =
                false;


            clearHandoffState();


            if (handoffReadout) {

                handoffReadout.innerHTML = `
                    <div>
                        <span>
                            FLOW://READY
                        </span>

                        <strong>
                            Source → Pod
                        </strong>
                    </div>

                    <p>
                        Watch the delivery path run automatically,
                        or select any stage to inspect it.
                    </p>
                `;

            }


            updateHandoffStatus(
                "READY"
            );
        }


        /* ==================================================================
           RUN HANDOFF ONCE
           ================================================================== */

        async function runHandoffSequence(
            mode = "AUTO"
        ) {

            if (
                handoffSequenceRunning ||
                handoffButtons.length === 0
            ) {

                return false;

            }


            handoffSequenceRunning =
                true;


            const token =
                ++handoffSequenceToken;


            clearHandoffState();


            restartHandoffPacket();


            updateHandoffStatus(
                "RUNNING"
            );


            /* --------------------------------------------------------------
               Source → Docker → Image → Registry → Deployment → Pods
               -------------------------------------------------------------- */

            for (
                let index = 0;
                index <
                handoffButtons.length;
                index++
            ) {

                if (
                    token !==
                    handoffSequenceToken
                ) {

                    handoffSequenceRunning =
                        false;


                    return false;
                }


                activateHandoffStage(
                    index
                );


                const continued =
                    await demoDelay(
                        1050,
                        () =>
                            token ===
                            handoffSequenceToken
                    );


                if (!continued) {

                    handoffSequenceRunning =
                        false;


                    return false;
                }
            }


            /* --------------------------------------------------------------
               Complete
               -------------------------------------------------------------- */

            showHandoffComplete();


            handoffPacket?.classList.remove(
                "is-running"
            );


            handoffSequenceRunning =
                false;


            return true;
        }


        /* ==================================================================
           HANDOFF AUTOPLAY LOOP
           ================================================================== */

        async function startHandoffAutoLoop() {

            if (
                !handoffDemo ||
                handoffAutoRunning ||
                reducedMotionQuery.matches
            ) {

                return;

            }


            handoffAutoRunning =
                true;


            const autoToken =
                ++handoffAutoToken;


            while (
                handoffAutoRunning &&
                autoToken ===
                handoffAutoToken
            ) {

                resetHandoffState();


                const ready =
                    await demoDelay(
                        500,
                        () =>
                            handoffAutoRunning &&
                            autoToken ===
                            handoffAutoToken
                    );


                if (!ready) {

                    break;

                }


                await runHandoffSequence(
                    "AUTO"
                );


                if (
                    !handoffAutoRunning ||
                    autoToken !==
                    handoffAutoToken
                ) {

                    break;

                }


                /* ----------------------------------------------------------
                   Hold the completed system.
                   ---------------------------------------------------------- */

                const completeHold =
                    await demoDelay(
                        1800,
                        () =>
                            handoffAutoRunning &&
                            autoToken ===
                            handoffAutoToken
                    );


                if (!completeHold) {

                    break;

                }
            }
        }


        /* ==================================================================
           STOP HANDOFF AUTOPLAY
           ================================================================== */

        function stopHandoffAutoLoop() {

            handoffAutoRunning =
                false;


            handoffAutoToken++;


            handoffSequenceToken++;


            handoffSequenceRunning =
                false;


            handoffPacket?.classList.remove(
                "is-running"
            );


            updateHandoffStatus(
                "PAUSED"
            );
        }


        /* ==================================================================
           MANUAL STAGE INSPECTION
           ================================================================== */

        handoffButtons.forEach(
            (
                button,
                index
            ) => {

                button.addEventListener(
                    "click",
                    () => {

                        handoffController?.pause();


                        stopHandoffAutoLoop();


                        clearHandoffState();


                        activateHandoffStage(
                            index
                        );


                        updateHandoffStatus(
                            "PAUSED"
                        );

                    }
                );

            }
        );


        /* ==================================================================
           OPTIONAL RUN DELIVERY FLOW BUTTON

           Autoplay means the button is NOT required.
           It remains available because you wanted the option to use it.
           ================================================================== */

        runHandoff?.addEventListener(
            "click",
            async () => {

                handoffController?.pause();


                stopHandoffAutoLoop();


                resetHandoffState();


                await runHandoffSequence(
                    "MANUAL"
                );

            }
        );


        /* ==================================================================
           OPTIONAL AUTO FLOW STATUS BUTTON

           Only used if you added #handoffMode to the HTML.
           ================================================================== */

        handoffMode?.addEventListener(
            "click",
            () => {

                handoffController?.resume();

            }
        );


        /* ==================================================================
           INITIALIZE HANDOFF
           ================================================================== */

        prepareHandoffPacket();


        resetHandoffState();


        handoffController =
            createViewportAutoDemo({

                element:
                    handoffDemo,

                start:
                    startHandoffAutoLoop,

                stop:
                    stopHandoffAutoLoop,

                threshold:
                    0.26

            });


        /* ==================================================================
           10. AMAZON EKS ARCHITECTURE

           The existing architecture contains both:
           - AWS infrastructure
           - Kubernetes components

           AUTOPLAY:
           Automatically tours the architecture while visible.

           MANUAL:
           Clicking a component freezes the tour on exactly that component.
           ================================================================== */


        const awsDemo =
            $(".eks-topology");


        const awsReadout =
            $("#awsReadout");


        /* ==================================================================
           UPGRADE EXISTING EKS STRUCTURE

           Some of the current structural items are <div> or <span>
           elements instead of buttons.

           Add data-aws / keyboard support here so no HTML rewrite
           is required.
           ================================================================== */

        function prepareAwsArchitecture() {

            if (!awsDemo) {
                return;
            }


            /* --------------------------------------------------------------
               VPC
               -------------------------------------------------------------- */

            const vpcHeader =
                $(
                    ".aws-vpc__header",
                    awsDemo
                );


            if (vpcHeader) {

                vpcHeader.dataset.aws =
                    vpcHeader.dataset.aws ||
                    "vpc";


                if (
                    vpcHeader.tagName !==
                    "BUTTON"
                ) {

                    vpcHeader.setAttribute(
                        "role",
                        "button"
                    );


                    vpcHeader.tabIndex =
                        0;

                }
            }


            /* --------------------------------------------------------------
               Managed Control Plane
               -------------------------------------------------------------- */

            const controlPlane =
                $(
                    ".eks-managed-control",
                    awsDemo
                );


            if (controlPlane) {

                controlPlane.dataset.aws =
                    controlPlane.dataset.aws ||
                    "controlplane";


                if (
                    controlPlane.tagName !==
                    "BUTTON"
                ) {

                    controlPlane.setAttribute(
                        "role",
                        "button"
                    );


                    controlPlane.tabIndex =
                        0;

                }
            }


            /* --------------------------------------------------------------
               Private Subnets
               -------------------------------------------------------------- */

            $$(
                ".aws-subnet__header",
                awsDemo
            )
            .forEach(
                subnet => {

                    subnet.dataset.aws =
                        subnet.dataset.aws ||
                        "subnet";


                    if (
                        subnet.tagName !==
                        "BUTTON"
                    ) {

                        subnet.setAttribute(
                            "role",
                            "button"
                        );


                        subnet.tabIndex =
                            0;

                    }

                }
            );


            /* --------------------------------------------------------------
               Worker Node Labels

               Current HTML uses:
               .eks-worker-node > span
               -------------------------------------------------------------- */

            $$(
                ".eks-worker-node > span",
                awsDemo
            )
            .forEach(
                worker => {

                    worker.classList.add(
                        "eks-worker-node__label"
                    );


                    worker.dataset.aws =
                        worker.dataset.aws ||
                        "worker";


                    worker.setAttribute(
                        "role",
                        "button"
                    );


                    worker.tabIndex =
                        0;

                }
            );
        }


        prepareAwsArchitecture();


        /* ==================================================================
           AWS ELEMENTS
           Must be queried AFTER structural enhancement.
           ================================================================== */

        const awsButtons =
            $$(
                "[data-aws]",
                awsDemo || document
            );


        /* ==================================================================
           KEYBOARD SUPPORT FOR ENHANCED DIV / SPAN TARGETS
           ================================================================== */

        awsButtons.forEach(
            item => {

                if (
                    item.tagName ===
                    "BUTTON"
                ) {

                    return;

                }


                item.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key !== "Enter" &&
                            event.key !== " "
                        ) {

                            return;

                        }


                        event.preventDefault();


                        item.click();

                    }
                );

            }
        );


        /* ==================================================================
           AWS / EKS INSPECTOR CONTENT
           ================================================================== */

        const awsData = {

            users: {

                title:
                    "Application Users",

                text:
                    "Users generate incoming application requests."

            },


            route53: {

                title:
                    "Amazon Route 53",

                text:
                    "Route 53 provides DNS resolution for the application name."

            },


            alb: {

                title:
                    "Application Load Balancer",

                text:
                    "The Application Load Balancer receives external traffic and routes it toward the Kubernetes workload."

            },


            vpc: {

                title:
                    "Amazon VPC",

                text:
                    "The VPC provides the isolated AWS network boundary containing the EKS workload infrastructure."

            },


            controlplane: {

                title:
                    "EKS Managed Control Plane",

                text:
                    "Amazon EKS operates the Kubernetes control plane while exposing the Kubernetes API for cluster management."

            },


            subnet: {

                title:
                    "Private Subnet",

                text:
                    "Private subnets separate worker compute across Availability Zones without directly exposing the Nodes to the public internet."

            },


            worker: {

                title:
                    "Worker Node",

                text:
                    "Worker Nodes provide the compute where Kubernetes Pods and their containers run."

            },


            pod: {

                title:
                    "Kubernetes Pod",

                text:
                    "Pods run application containers on Kubernetes worker compute."

            },


            storage: {

                title:
                    "Amazon EBS / EFS",

                text:
                    "EBS and EFS provide persistent storage options that Kubernetes workloads can use."

            },


            cloudwatch: {

                title:
                    "Amazon CloudWatch",

                text:
                    "CloudWatch provides AWS metrics, logs, alarms, and observability."

            },


            secrets: {

                title:
                    "AWS Secrets Manager",

                text:
                    "Secrets Manager stores sensitive application and infrastructure values."

            },


            developer: {

                title:
                    "Developer",

                text:
                    "The delivery process begins when the developer creates or changes application source code."

            },


            github: {

                title:
                    "GitHub",

                text:
                    "GitHub stores source code and provides version history for the application."

            },


            cicd: {

                title:
                    "CI/CD Pipeline",

                text:
                    "The CI/CD workflow tests, builds, and delivers application changes."

            },


            ecr: {

                title:
                    "Amazon ECR",

                text:
                    "Amazon ECR stores versioned container images that Kubernetes workloads can pull and run."

            },


            service: {

                title:
                    "Kubernetes Service",

                text:
                    "A Kubernetes Service provides stable network access to a changing group of Pods."

            }

        };


        /* ==================================================================
           AWS STATE
           ================================================================== */

        let awsAutoRunning =
            false;


        let awsAutoToken =
            0;


        let awsTourIndex =
            0;


        let awsController =
            null;


        /* ==================================================================
           AWS TOUR

           Infrastructure path first:
           Users → DNS → ALB → VPC → Control Plane → Subnet →
           Worker → Pod → supporting AWS services

           Then delivery:
           Developer → GitHub → CI/CD → ECR
           ================================================================== */

        const awsTourKeys = [
            "users",
            "route53",
            "alb",
            "vpc",
            "controlplane",
            "subnet",
            "worker",
            "pod",
            "storage",
            "cloudwatch",
            "secrets",
            "developer",
            "github",
            "cicd",
            "ecr"
        ];


        /* ==================================================================
           FIND REPRESENTATIVE AWS ELEMENT
           ================================================================== */

        function findAwsElement(
            key
        ) {

            const matches =
                awsButtons.filter(
                    item =>
                        item.dataset.aws ===
                        key
                );


            if (
                matches.length === 0
            ) {

                return null;

            }


            /*
               ECR appears in both the AWS services area and delivery path.
               For the delivery tour, use the final ECR item.
            */

            if (
                key === "ecr" &&
                matches.length > 1
            ) {

                return matches[
                    matches.length - 1
                ];

            }


            return matches[0];
        }


        /* ==================================================================
           CLEAR AWS INSPECTOR STATE
           ================================================================== */

        function clearAwsState() {

            awsButtons.forEach(
                item => {

                    item.classList.remove(
                        "is-active"
                    );

                }
            );
        }


        /* ==================================================================
           INSPECT AWS COMPONENT

           target:
           - Exact clicked component during manual inspection.
           - Representative component during autoplay.

           Only the exact selected element receives .is-active.
           ================================================================== */

        function inspectAws(
            key,
            target = null
        ) {

            const data =
                awsData[key];


            if (!data) {
                return;
            }


            clearAwsState();


            const selected =
                target ||
                findAwsElement(
                    key
                );


            selected?.classList.add(
                "is-active"
            );


            if (awsReadout) {

                awsReadout.innerHTML = `
                    <div>
                        <span>
                            AWS://${key.toUpperCase()}
                        </span>

                        <strong>
                            ${data.title}
                        </strong>
                    </div>

                    <p>
                        ${data.text}
                    </p>
                `;

            }


            const tourPosition =
                awsTourKeys.indexOf(
                    key
                );


            if (
                tourPosition >= 0
            ) {

                awsTourIndex =
                    tourPosition;

            }
        }


        /* ==================================================================
           EKS AUTOPLAY
           ================================================================== */

        async function startAwsAutoLoop() {

            if (
                !awsDemo ||
                awsAutoRunning ||
                reducedMotionQuery.matches
            ) {

                return;

            }


            awsAutoRunning =
                true;


            const autoToken =
                ++awsAutoToken;


            while (
                awsAutoRunning &&
                autoToken ===
                awsAutoToken
            ) {

                const key =
                    awsTourKeys[
                        awsTourIndex
                    ];


                /*
                   Skip a tour item if the current version of the HTML
                   does not contain that architecture element.
                */

                const target =
                    findAwsElement(
                        key
                    );


                if (target) {

                    inspectAws(
                        key,
                        target
                    );


                    const hold =
                        await demoDelay(
                            1550,
                            () =>
                                awsAutoRunning &&
                                autoToken ===
                                awsAutoToken
                        );


                    if (!hold) {

                        break;

                    }

                }


                awsTourIndex =
                    (
                        awsTourIndex + 1
                    ) %
                    awsTourKeys.length;
            }
        }


        /* ==================================================================
           STOP EKS AUTOPLAY
           ================================================================== */

        function stopAwsAutoLoop() {

            awsAutoRunning =
                false;


            awsAutoToken++;
        }


        /* ==================================================================
           MANUAL EKS INSPECTION

           Clicking one subnet highlights that exact subnet.
           Clicking one worker highlights that exact worker.

           This avoids the old behavior where every duplicate
           data-aws value illuminated simultaneously.
           ================================================================== */

        awsButtons.forEach(
            item => {

                item.addEventListener(
                    "click",
                    () => {

                        awsController?.pause();


                        inspectAws(
                            item.dataset.aws,
                            item
                        );

                    }
                );

            }
        );


        /* ==================================================================
           INITIAL EKS INSPECTOR
           ================================================================== */

        if (awsReadout) {

            awsReadout.innerHTML = `
                <div>
                    <span>
                        AWS://INSPECTOR
                    </span>

                    <strong>
                        Amazon EKS Architecture
                    </strong>
                </div>

                <p>
                    The architecture will tour automatically.
                    Select any AWS or Kubernetes component to
                    inspect it manually.
                </p>
            `;

        }


        awsController =
            createViewportAutoDemo({

                element:
                    awsDemo,

                start:
                    startAwsAutoLoop,

                stop:
                    stopAwsAutoLoop,

                threshold:
                    0.24

            });


        /* ==================================================================
           DONE
           All global navigation, theme, footer, back-to-top and shared
           portfolio behavior remains in ../../js/script.js.
           ================================================================== */

    }
);