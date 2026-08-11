"use strict";


/* ============================================================
   KUBERNETES PLATFORM THEORY
   ============================================================ */


/* ============================================================
   HELPERS
   ============================================================ */

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


const wait = ms =>
    new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );



/* ============================================================
   01. THEME
   ============================================================ */

const themeToggle =
    $("#themeToggle");


function getInitialTheme() {

    const stored =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (stored) {

        return stored;

    }


    return window
        .matchMedia(
            "(prefers-color-scheme: dark)"
        )
        .matches

        ? "dark"
        : "light";

}


function applyTheme(
    theme
) {

    document
        .documentElement
        .dataset
        .theme =
        theme;


    localStorage.setItem(
        "portfolio-theme",
        theme
    );

}


applyTheme(
    getInitialTheme()
);


themeToggle
    ?.addEventListener(
        "click",
        () => {

            applyTheme(

                document
                    .documentElement
                    .dataset
                    .theme
                ===
                "dark"

                ? "light"
                : "dark"

            );

        }
    );



/* ============================================================
   02. HEADER + MOBILE NAV
   ============================================================ */

const siteHeader =
    $("#siteHeader");


const mobileMenu =
    $("#mobileMenu");


const siteNav =
    $("#siteNav");


function updateHeader() {

    siteHeader
        ?.classList
        .toggle(
            "is-scrolled",
            window.scrollY > 16
        );

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive:
            true
    }
);


updateHeader();


mobileMenu
    ?.addEventListener(
        "click",
        () => {

            const open =
                siteNav
                    .classList
                    .toggle(
                        "is-open"
                    );


            mobileMenu
                .setAttribute(
                    "aria-expanded",
                    String(open)
                );

        }
    );


$$(
    ".site-nav a"
)
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    siteNav
                        ?.classList
                        .remove(
                            "is-open"
                        );


                    mobileMenu
                        ?.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                }
            );

        }
    );



/* ============================================================
   03. REVEAL
   ============================================================ */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    entry
                        .target
                        .classList
                        .add(
                            "is-visible"
                        );


                    revealObserver
                        .unobserve(
                            entry.target
                        );

                }
            );

        },

        {
            threshold:
                0.08
        }

    );


$$(
    ".reveal"
)
    .forEach(
        element =>
            revealObserver
                .observe(
                    element
                )
    );



/* ============================================================
   04. AMBIENT NETWORK
   ============================================================ */

const canvas =
    $("#ambientCanvas");


const ctx =
    canvas
        ?.getContext(
            "2d"
        );


let particles = [];


function setupCanvas() {

    if (
        !canvas
        ||
        !ctx
    ) {

        return;

    }


    const ratio =
        Math.min(
            window.devicePixelRatio
            ||
            1,
            2
        );


    canvas.width =
        window.innerWidth
        *
        ratio;


    canvas.height =
        window.innerHeight
        *
        ratio;


    canvas.style.width =
        `${window.innerWidth}px`;


    canvas.style.height =
        `${window.innerHeight}px`;


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );


    const count =
        Math.min(

            60,

            Math.max(
                28,
                Math.floor(
                    window.innerWidth
                    /
                    24
                )
            )

        );


    particles =
        Array.from(

            {
                length:
                    count
            },

            () => ({

                x:
                    Math.random()
                    *
                    window.innerWidth,

                y:
                    Math.random()
                    *
                    window.innerHeight,

                vx:
                    (
                        Math.random()
                        -
                        0.5
                    )
                    *
                    0.12,

                vy:
                    (
                        Math.random()
                        -
                        0.5
                    )
                    *
                    0.12,

                size:
                    Math.random()
                    *
                    1.2
                    +
                    0.45

            })

        );

}


function renderCanvas() {

    if (
        !canvas
        ||
        !ctx
    ) {

        return;

    }


    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    const dark =

        document
            .documentElement
            .dataset
            .theme
        ===
        "dark";


    particles.forEach(
        p => {

            p.x +=
                p.vx;


            p.y +=
                p.vy;


            if (
                p.x < 0
                ||
                p.x >
                window.innerWidth
            ) {

                p.vx *=
                    -1;

            }


            if (
                p.y < 0
                ||
                p.y >
                window.innerHeight
            ) {

                p.vy *=
                    -1;

            }


            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                dark

                ? "rgba(125,155,205,.20)"
                : "rgba(37,50,74,.10)";


            ctx.fill();

        }
    );



    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x
                -
                particles[j].x;


            const dy =
                particles[i].y
                -
                particles[j].y;


            const distance =
                Math.sqrt(
                    dx * dx
                    +
                    dy * dy
                );


            if (
                distance >
                125
            ) {

                continue;

            }


            const alpha =

                (
                    1
                    -
                    distance
                    /
                    125
                )
                *
                (
                    dark
                    ? 0.07
                    : 0.035
                );


            ctx.beginPath();


            ctx.moveTo(
                particles[i].x,
                particles[i].y
            );


            ctx.lineTo(
                particles[j].x,
                particles[j].y
            );


            ctx.strokeStyle =
                `rgba(230,64,160,${alpha})`;


            ctx.lineWidth =
                0.6;


            ctx.stroke();

        }

    }


    requestAnimationFrame(
        renderCanvas
    );

}


if (

    !window
        .matchMedia(
            "(prefers-reduced-motion: reduce)"
        )
        .matches

) {

    setupCanvas();


    renderCanvas();


    window.addEventListener(
        "resize",
        setupCanvas
    );

}



/* ============================================================
   05. HERO SYSTEM FLOW
   ============================================================ */

const heroNodes =
    $$(
        "[data-hero-node]"
    );


const heroPaths =
    $$(
        "[data-hero-path]"
    );


const heroSystemState =
    $("#heroSystemState");


const heroSystemReadout =
    $("#heroSystemReadout");


const runHeroFlow =
    $("#runHeroFlow");


const heroData = {


    source: {

        state:
            "SOURCE",

        text:
            "Application source code exists before Docker packages anything."

    },


    docker: {

        state:
            "CONTAINERIZE",

        text:
            "Docker provides the build and runtime workflow used to package and start the application."

    },


    image: {

        state:
            "ARTIFACT",

        text:
            "The image is the reusable packaged artifact that can be stored, versioned, and run repeatedly."

    },


    kubernetes: {

        state:
            "ORCHESTRATE",

        text:
            "Kubernetes operates containerized workloads by managing desired state, scheduling, networking, scaling, and recovery."

    },


    eks: {

        state:
            "CLOUD",

        text:
            "Amazon EKS runs Kubernetes concepts in AWS with a managed Kubernetes control plane."

    }

};


function activateHeroNode(
    node,
    index = -1
) {

    const key =
        node
            .dataset
            .heroNode;


    const data =
        heroData[
            key
        ];


    heroNodes.forEach(
        item => {

            item
                .classList
                .toggle(
                    "is-active",
                    item === node
                );

        }
    );


    if (
        index >= 0
    ) {

        heroPaths.forEach(
            (
                path,
                pathIndex
            ) => {

                path
                    .classList
                    .toggle(
                        "is-active",
                        pathIndex < index
                    );

            }
        );

    }


    heroSystemState.textContent =
        data.state;


    heroSystemReadout.innerHTML = `

        <span>
            SYS://${data.state}
        </span>

        <p>
            ${data.text}
        </p>
    `;

}


heroNodes.forEach(
    (
        node,
        index
    ) => {

        node.addEventListener(
            "click",
            () =>
                activateHeroNode(
                    node,
                    index
                )
        );

    }
);


let heroFlowRunning =
    false;


runHeroFlow
    ?.addEventListener(
        "click",
        async () => {

            if (
                heroFlowRunning
            ) {

                return;

            }


            heroFlowRunning =
                true;


            runHeroFlow.disabled =
                true;


            heroPaths.forEach(
                path =>
                    path
                        .classList
                        .remove(
                            "is-active"
                        )
            );


            for (
                let i = 0;
                i < heroNodes.length;
                i++
            ) {

                activateHeroNode(
                    heroNodes[i],
                    i
                );


                if (
                    i > 0
                    &&
                    heroPaths[
                        i - 1
                    ]
                ) {

                    heroPaths[
                        i - 1
                    ]
                        .classList
                        .add(
                            "is-active"
                        );

                }


                await wait(
                    1050
                );

            }


            heroSystemState.textContent =
                "ONLINE";


            runHeroFlow.disabled =
                false;


            heroFlowRunning =
                false;

        }
    );



/* ============================================================
   06. DOCKER PIPELINE
   ============================================================ */

const pipelineStages =
    $$(
        "[data-pipeline-stage]"
    );


const pipelineLinks =
    $$(
        ".pipeline-link"
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



/* ============================================================
   PIPELINE DATA
   ============================================================ */

const pipelineData = {


    source: {

        label:
            "SOURCE",

        title:
            "Start with the application files.",

        text:
            "The Node.js application is still normal source code on the workstation. Docker has not packaged anything yet.",

        command:
            "app.mjs · helpers.mjs · package.json"

    },


    dockerfile: {

        label:
            "INSTRUCTIONS",

        title:
            "Docker reads the Dockerfile.",

        text:
            "The Dockerfile defines how the image should be assembled: base image, working directory, dependencies, application files, exposed port, and startup command.",

        command:
            "FROM node:14 → WORKDIR /app → COPY → RUN npm install"

    },


    build: {

        label:
            "BUILD",

        title:
            "Docker assembles the image.",

        text:
            "docker build executes the Dockerfile instructions and produces a reusable image artifact.",

        command:
            "docker build ."

    },


    image: {

        label:
            "IMAGE",

        title:
            "The packaged artifact now exists.",

        text:
            "The image contains the application and runtime requirements. It is reusable and is not itself a running process.",

        command:
            "app:v1"

    },


    run: {

        label:
            "CREATE INSTANCE",

        title:
            "docker run creates a container.",

        text:
            "Docker uses the image as a template to create a new container instance. The image remains available for reuse.",

        command:
            "docker run app:v1"

    },


    container: {

        label:
            "RUNNING",

        title:
            "The application is now running.",

        text:
            "The container is the concrete running instance created from the image. More containers can be created from the same image.",

        command:
            "container: running from app:v1"

    }

};



/* ============================================================
   PIPELINE STATE
   ============================================================ */

let pipelineIndex =
    -1;


let pipelineRunning =
    false;


let pipelinePaused =
    false;


let pipelineToken =
    0;



/* ============================================================
   RENDER PIPELINE STAGE
   ============================================================ */

function renderPipelineStage(
    index,
    state = "INSPECTING"
) {

    const stage =
        pipelineStages[
            index
        ];


    if (
        !stage
    ) {

        return;

    }


    pipelineIndex =
        index;


    pipelineStages.forEach(
        (
            item,
            itemIndex
        ) => {

            item
                .classList
                .toggle(
                    "is-active",
                    itemIndex === index
                );

        }
    );


    const key =
        stage
            .dataset
            .pipelineStage;


    const data =
        pipelineData[
            key
        ];


    pipelineStatus.textContent =
        state;


    pipelineStep.textContent =
        `${index + 1} / ${pipelineStages.length}`;


    pipelineProgress.style.width =
        `${
            (
                (
                    index + 1
                )
                /
                pipelineStages.length
            )
            *
            100
        }%`;


    pipelineReadout.innerHTML = `

        <span>
            PIPELINE://${data.label}
        </span>


        <div>

            <strong>
                ${data.title}
            </strong>

            <p>
                ${data.text}
            </p>

        </div>


        <code>
            ${data.command}
        </code>
    `;

}



/* ============================================================
   PIPELINE LINK
   ============================================================ */

function animatePipelineLink(
    index
) {

    const link =
        pipelineLinks[
            index
        ];


    if (
        !link
    ) {

        return;

    }


    link
        .classList
        .remove(
            "is-active"
        );


    void link.offsetWidth;


    link
        .classList
        .add(
            "is-active"
        );


    setTimeout(
        () => {

            link
                .classList
                .remove(
                    "is-active"
                );

        },
        1050
    );

}



/* ============================================================
   PAUSE-AWARE DELAY
   ============================================================ */

async function pipelineDelay(
    ms,
    token
) {

    let elapsed =
        0;


    while (
        elapsed < ms
    ) {

        if (
            token !==
            pipelineToken
        ) {

            return false;

        }


        if (
            pipelinePaused
        ) {

            await wait(
                100
            );


            continue;

        }


        await wait(
            100
        );


        elapsed +=
            100;

    }


    return true;

}



/* ============================================================
   PIPELINE BUTTON STATES
   ============================================================ */

function updatePipelineButtons() {

    pausePipeline.disabled =
        !pipelineRunning;


    pausePipeline.innerHTML =
        pipelinePaused

        ? `
            <iconify-icon
                icon="solar:play-linear"
            ></iconify-icon>

            Resume
        `

        : `
            <iconify-icon
                icon="solar:pause-linear"
            ></iconify-icon>

            Pause
        `;


    runPipeline.innerHTML =
        pipelineRunning

        ? `
            <iconify-icon
                icon="solar:record-circle-linear"
            ></iconify-icon>

            Running
        `

        :

        pipelineIndex
        >=
        pipelineStages.length - 1

        ? `
            <iconify-icon
                icon="solar:restart-linear"
            ></iconify-icon>

            Run Again
        `

        : `
            <iconify-icon
                icon="solar:play-linear"
            ></iconify-icon>

            Run
        `;

}



/* ============================================================
   RESET PIPELINE
   ============================================================ */

function resetPipelineState() {

    pipelineToken++;


    pipelineIndex =
        -1;


    pipelineRunning =
        false;


    pipelinePaused =
        false;


    pipelineStages.forEach(
        stage => {

            stage
                .classList
                .remove(
                    "is-active"
                );

        }
    );


    pipelineLinks.forEach(
        link => {

            link
                .classList
                .remove(
                    "is-active"
                );

        }
    );


    pipelineStatus.textContent =
        "READY";


    pipelineStep.textContent =
        `0 / ${pipelineStages.length}`;


    pipelineProgress.style.width =
        "0%";


    pipelineReadout.innerHTML = `

        <span>
            PIPELINE://READY
        </span>


        <div>

            <strong>
                Walk through the process at reading speed.
            </strong>

            <p>
                Use Run for automatic playback, Pause to stop
                on a concept, or Next to move one stage at a time.
            </p>

        </div>


        <code>
            waiting...
        </code>
    `;


    updatePipelineButtons();

}



/* ============================================================
   PLAY PIPELINE
   ============================================================ */

async function playPipeline() {

    if (
        pipelineRunning
    ) {

        return;

    }


    if (
        pipelineIndex
        >=
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

        let i =
            pipelineIndex + 1;

        i <
            pipelineStages.length;

        i++

    ) {


        if (
            token !==
            pipelineToken
        ) {

            return;

        }


        if (
            i > 0
        ) {

            animatePipelineLink(
                i - 1
            );


            const linked =
                await pipelineDelay(
                    950,
                    token
                );


            if (
                !linked
            ) {

                return;

            }

        }


        renderPipelineStage(
            i,
            "RUNNING"
        );


        const dwell =
            (
                i === 3
                ||
                i === 5
            )

            ? 3400
            : 2850;


        const finished =
            await pipelineDelay(
                dwell,
                token
            );


        if (
            !finished
        ) {

            return;

        }

    }


    pipelineRunning =
        false;


    pipelinePaused =
        false;


    pipelineStatus.textContent =
        "COMPLETE ✓";


    updatePipelineButtons();

}



/* ============================================================
   PIPELINE EVENTS
   ============================================================ */

runPipeline
    ?.addEventListener(
        "click",
        playPipeline
    );


pausePipeline
    ?.addEventListener(
        "click",
        () => {

            if (
                !pipelineRunning
            ) {

                return;

            }


            pipelinePaused =
                !pipelinePaused;


            pipelineStatus.textContent =
                pipelinePaused

                ? "PAUSED"
                : "RUNNING";


            updatePipelineButtons();

        }
    );


nextPipeline
    ?.addEventListener(
        "click",
        () => {

            if (
                pipelineRunning
            ) {

                pipelineToken++;


                pipelineRunning =
                    false;


                pipelinePaused =
                    false;

            }


            const next =
                Math.min(

                    pipelineIndex + 1,

                    pipelineStages.length - 1

                );


            if (
                next > 0
                &&
                next !==
                pipelineIndex
            ) {

                animatePipelineLink(
                    next - 1
                );

            }


            renderPipelineStage(
                next,
                "MANUAL"
            );


            updatePipelineButtons();

        }
    );


resetPipeline
    ?.addEventListener(
        "click",
        resetPipelineState
    );


pipelineStages.forEach(
    (
        stage,
        index
    ) => {

        stage.addEventListener(
            "click",
            () => {

                if (
                    pipelineRunning
                ) {

                    pipelineToken++;


                    pipelineRunning =
                        false;


                    pipelinePaused =
                        false;

                }


                renderPipelineStage(
                    index,
                    "MANUAL"
                );


                updatePipelineButtons();

            }
        );

    }
);


resetPipelineState();



/* ============================================================
   07. IMAGE → CONTAINER SIMULATOR
   ============================================================ */

const spawnContainer =
    $("#spawnContainer");


const resetContainers =
    $("#resetContainers");


const imageCore =
    $("#imageCore");


const runtimePacket =
    $("#runtimePacket");


const containerSlots =
    $$(
        "[data-slot]"
    );


const containerCount =
    $("#containerCount");


const imageRuntimeReadout =
    $("#imageRuntimeReadout");


const runtimePaths =
    $$(
        ".container-bay__wires path"
    );


let runningContainers =
    0;


let containerBusy =
    false;



/* ============================================================
   CREATE CONTAINER
   ============================================================ */

async function createContainer() {

    if (
        containerBusy
    ) {

        return;

    }


    if (
        runningContainers
        >=
        containerSlots.length
    ) {

        imageRuntimeReadout.innerHTML = `

            <span>
                RELATIONSHIP://IMAGE STILL AVAILABLE
            </span>

            <strong>
                Three running containers are shown,
                all created from the same reusable app:v1 image.
            </strong>
        `;


        return;

    }


    containerBusy =
        true;


    spawnContainer.disabled =
        true;


    imageCore
        .classList
        .add(
            "is-launching"
        );


    runtimePacket
        .classList
        .remove(
            "is-moving"
        );


    void runtimePacket.offsetWidth;


    runtimePacket
        .classList
        .add(
            "is-moving"
        );


    imageRuntimeReadout.innerHTML = `

        <span>
            RELATIONSHIP://DOCKER RUN
        </span>

        <strong>
            Docker is using app:v1 as the template
            for a new running container.
        </strong>
    `;


    await wait(
        1100
    );


    const slot =
        containerSlots[
            runningContainers
        ];


    slot
        .classList
        .add(
            "is-running"
        );


    slot
        .querySelector(
            "strong"
        )
        .textContent =
        `CONTAINER ${
            String(
                runningContainers + 1
            )
            .padStart(
                2,
                "0"
            )
        }`;


    slot
        .querySelector(
            "small"
        )
        .textContent =
        "node app.mjs";


    runtimePaths[
        runningContainers
    ]
        ?.classList
        .add(
            "is-live"
        );


    runningContainers++;


    containerCount.textContent =
        `${runningContainers} RUNNING`;


    imageCore
        .classList
        .remove(
            "is-launching"
        );


    runtimePacket
        .classList
        .remove(
            "is-moving"
        );


    imageRuntimeReadout.innerHTML = `

        <span>
            RELATIONSHIP://CONTAINER CREATED
        </span>

        <strong>
            app:v1 still exists. The new container is
            an independent running instance created from that image.
        </strong>
    `;


    spawnContainer.disabled =
        false;


    containerBusy =
        false;

}



/* ============================================================
   RESET CONTAINERS
   ============================================================ */

function resetContainerSimulation() {

    runningContainers =
        0;


    containerBusy =
        false;


    containerSlots.forEach(
        (
            slot,
            index
        ) => {

            slot
                .classList
                .remove(
                    "is-running"
                );


            slot
                .querySelector(
                    "strong"
                )
                .textContent =
                "EMPTY";


            slot
                .querySelector(
                    "small"
                )
                .textContent =
                "waiting for image";


            runtimePaths[
                index
            ]
                ?.classList
                .remove(
                    "is-live"
                );

        }
    );


    containerCount.textContent =
        "0 RUNNING";


    imageCore
        .classList
        .remove(
            "is-launching"
        );


    runtimePacket
        .classList
        .remove(
            "is-moving"
        );


    spawnContainer.disabled =
        false;


    imageRuntimeReadout.innerHTML = `

        <span>
            RELATIONSHIP://READY
        </span>

        <strong>
            Image = reusable artifact.
            Container = running instance.
        </strong>
    `;

}


spawnContainer
    ?.addEventListener(
        "click",
        createContainer
    );


resetContainers
    ?.addEventListener(
        "click",
        resetContainerSimulation
    );



/* ============================================================
   08. CONTAINER VS VM
   ============================================================ */

const computeTabs =
    $$(
        "[data-compute]"
    );


const computeSchematic =
    $("#computeSchematic");


const computeReadout =
    $("#computeReadout");


const computeData = {


    container: {

        description:
            "Containers isolate application processes while sharing the host operating-system kernel. Each container carries the application and its dependencies, not a complete guest operating system.",

        middle:
            "Container Runtime"

    },


    vm: {

        description:
            "Each virtual machine includes its own guest operating system. A hypervisor provides the virtualization layer between the VMs and the host infrastructure.",

        middle:
            "Hypervisor"

    }

};



function renderComputeModel(
    model
) {

    const isVM =
        model ===
        "vm";


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
                                ${
                                    isVM
                                    ? "is-vm"
                                    : ""
                                }
                            "
                        >

                            <strong>

                                ${
                                    isVM

                                    ? `VM ${
                                        String(number)
                                            .padStart(
                                                2,
                                                "0"
                                            )
                                    }`

                                    : `Container ${
                                        String(number)
                                            .padStart(
                                                2,
                                                "0"
                                            )
                                    }`
                                }

                            </strong>


                            <span>
                                Application + Dependencies
                            </span>


                            ${
                                isVM

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

            ${computeData[model].middle}

        </div>


        <div class="compute-layer">
            Host Operating System
        </div>


        <div class="compute-layer">
            Hardware
        </div>
    `;


    computeReadout.textContent =
        computeData[
            model
        ]
        .description;


    computeTabs.forEach(
        tab => {

            tab
                .classList
                .toggle(
                    "is-active",
                    tab
                        .dataset
                        .compute
                    ===
                    model
                );

        }
    );

}


computeTabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            () =>
                renderComputeModel(
                    tab.dataset.compute
                )
        );

    }
);


renderComputeModel(
    "container"
);



/* ============================================================
   09. KUBERNETES INSPECTOR
   ============================================================ */

const k8sButtons =
    $$(
        "[data-k8s]"
    );


const k8sInspectorTitle =
    $("#k8sInspectorTitle");


const k8sInspectorText =
    $("#k8sInspectorText");


const k8sInspectorFacts =
    $("#k8sInspectorFacts");


const k8sData = {


    api: {

        title:
            "API Server",

        text:
            "The main communication point for Kubernetes. kubectl, controllers, and integrations interact with the cluster through the Kubernetes API.",

        facts: {

            Layer:
                "Control Plane",

            Purpose:
                "Cluster API",

            Clients:
                "kubectl / controllers"

        }

    },


    etcd: {

        title:
            "etcd",

        text:
            "The distributed key-value store that persists Kubernetes cluster configuration and state.",

        facts: {

            Layer:
                "Control Plane",

            Type:
                "Key-value store",

            Stores:
                "Cluster state"

        }

    },


    scheduler: {

        title:
            "Scheduler",

        text:
            "Selects an appropriate worker node for Pods that have not yet been assigned to a node.",

        facts: {

            Layer:
                "Control Plane",

            Purpose:
                "Pod placement",

            Considers:
                "Scheduling requirements"

        }

    },


    controller: {

        title:
            "Controller Manager",

        text:
            "Controllers compare desired state with actual state and take action when those states do not match.",

        facts: {

            Layer:
                "Control Plane",

            Purpose:
                "Reconciliation",

            Example:
                "Restore replicas"

        }

    },


    kubelet: {

        title:
            "kubelet",

        text:
            "The node agent responsible for making sure the containers defined for assigned Pods are running.",

        facts: {

            Layer:
                "Worker Node",

            Purpose:
                "Node agent",

            TalksTo:
                "Kubernetes API"

        }

    },


    runtime: {

        title:
            "Container Runtime",

        text:
            "Performs the low-level work required to create and run containers on a worker node.",

        facts: {

            Layer:
                "Worker Node",

            Purpose:
                "Run containers",

            DirectedBy:
                "kubelet"

        }

    },


    pod: {

        title:
            "Pod",

        text:
            "Kubernetes' smallest deployable workload unit. A Pod contains one or more closely related containers.",

        facts: {

            Layer:
                "Workload",

            Contains:
                "Container(s)",

            Lifecycle:
                "Replaceable"

        }

    }

};



function inspectK8s(
    key
) {

    const data =
        k8sData[
            key
        ];


    if (
        !data
    ) {

        return;

    }


    k8sButtons.forEach(
        button => {

            button
                .classList
                .toggle(
                    "is-active",
                    button
                        .dataset
                        .k8s
                    ===
                    key
                );

        }
    );


    k8sInspectorTitle.textContent =
        data.title;


    k8sInspectorText.textContent =
        data.text;


    k8sInspectorFacts.innerHTML =

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


k8sButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () =>
                inspectK8s(
                    button.dataset.k8s
                )
        );

    }
);



/* ============================================================
   10. DESIRED STATE SIMULATOR
   ============================================================ */

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


const terminatePod =
    $("#terminatePod");


const resetPods =
    $("#resetPods");


let desiredPods =
    3;


let actualPods =
    3;


let reconciling =
    false;



function renderPods(
    extraClass = ""
) {

    podField.innerHTML =
        "";


    for (
        let i = 1;
        i <= actualPods;
        i++
    ) {

        const pod =
            document.createElement(
                "div"
            );


        pod.className =
            `
                sim-pod
                ${extraClass}
            `.trim();


        pod.textContent =
            `pod-${
                String(i)
                    .padStart(
                        2,
                        "0"
                    )
            }`;


        podField
            .appendChild(
                pod
            );

    }


    desiredCount.textContent =
        desiredPods;


    actualCount.textContent =
        actualPods;

}



async function simulatePodFailure() {

    if (
        reconciling
        ||
        actualPods <= 0
    ) {

        return;

    }


    reconciling =
        true;


    terminatePod.disabled =
        true;


    const pods =
        $$(
            ".sim-pod",
            podField
        );


    pods
        .at(-1)
        ?.classList
        .add(
            "is-dead"
        );


    controllerLog.innerHTML = `

        <span>
            controller-manager $
        </span>

        termination detected...
    `;


    await wait(
        500
    );


    actualPods--;


    renderPods();


    controllerState.textContent =
        "RECONCILING";


    controllerState.className =
        "status-warn";


    controllerLog.innerHTML = `

        <span>
            controller-manager $
        </span>

        actual=${actualPods}
        desired=${desiredPods};
        creating replacement...
    `;


    await wait(
        1500
    );


    actualPods++;


    renderPods(
        "is-new"
    );


    controllerState.textContent =
        "SYNCHRONIZED";


    controllerState.className =
        "status-ok";


    controllerLog.innerHTML = `

        <span>
            controller-manager $
        </span>

        replacement created;
        actual=${actualPods}
        desired=${desiredPods}
    `;


    terminatePod.disabled =
        false;


    reconciling =
        false;

}



function resetPodSimulation() {

    actualPods =
        desiredPods;


    reconciling =
        false;


    renderPods();


    controllerState.textContent =
        "SYNCHRONIZED";


    controllerState.className =
        "status-ok";


    controllerLog.innerHTML = `

        <span>
            controller-manager $
        </span>

        desired state matches actual state
    `;


    terminatePod.disabled =
        false;

}


terminatePod
    ?.addEventListener(
        "click",
        simulatePodFailure
    );


resetPods
    ?.addEventListener(
        "click",
        resetPodSimulation
    );


renderPods();



/* ============================================================
   11. KUBECTL THEORY CONSOLE
   ============================================================ */

const cliButtons =
    $$(
        "[data-cli]"
    );


const cliTerminal =
    $("#cliTerminal");


const cliData = {


    nodes: {

        command:
            "kubectl get nodes",

        output:
`NAME            STATUS   ROLES
docker-desktop  Ready    control-plane`,

        explanation:
            "Lists the nodes known to the current Kubernetes cluster."

    },


    pods: {

        command:
            "kubectl get pods",

        output:
`NAME        READY   STATUS
web-7d9f    1/1     Running
api-6b44    1/1     Running`,

        explanation:
            "Lists Pods in the current namespace and shows their current state."

    },


    deployments: {

        command:
            "kubectl get deployments",

        output:
`NAME   READY   UP-TO-DATE   AVAILABLE
web    3/3     3            3`,

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
            "Lists Kubernetes Services and their cluster networking information."

    }

};


let cliBusy =
    false;



async function typeText(
    element,
    text,
    delay = 16
) {

    for (
        const character
        of text
    ) {

        element.textContent +=
            character;


        await wait(
            delay
        );

    }

}



async function runCliCommand(
    key,
    button
) {

    if (
        cliBusy
    ) {

        return;

    }


    cliBusy =
        true;


    cliButtons.forEach(
        item => {

            item
                .classList
                .toggle(
                    "is-active",
                    item === button
                );

        }
    );


    const data =
        cliData[
            key
        ];


    cliTerminal.innerHTML =
        "";


    const command =
        document.createElement(
            "div"
        );


    command.className =
        "terminal-command";


    command.textContent =
        "darling@DarlingPC:~$ ";


    cliTerminal
        .appendChild(
            command
        );


    await typeText(
        command,
        data.command,
        18
    );


    await wait(
        250
    );


    const output =
        document.createElement(
            "div"
        );


    output.textContent =
        `\n${data.output}`;


    cliTerminal
        .appendChild(
            output
        );


    await wait(
        250
    );


    const explanation =
        document.createElement(
            "div"
        );


    explanation.className =
        "terminal-success";


    explanation.textContent =
        `\n# ${data.explanation}`;


    cliTerminal
        .appendChild(
            explanation
        );


    cliBusy =
        false;

}


cliButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () =>
                runCliCommand(
                    button.dataset.cli,
                    button
                )
        );

    }
);



/* ============================================================
   12. SYSTEM HANDOFF
   ============================================================ */

const handoffButtons =
    $$(
        "[data-handoff]"
    );


const runHandoff =
    $("#runHandoff");


const handoffReadout =
    $("#handoffReadout");


const handoffData = {


    source:
        "Application source code is the starting point.",


    docker:
        "Docker provides the build workflow used to package the application.",


    image:
        "The image becomes the reusable artifact passed from the build process to later runtime systems.",


    registry:
        "A container registry stores and distributes image versions.",


    deployment:
        "A Kubernetes Deployment declares desired application state and references a container image.",


    pods:
        "Kubernetes creates Pods that run containers using the selected image."

};



function activateHandoff(
    button
) {

    const key =
        button
            .dataset
            .handoff;


    handoffButtons.forEach(
        item => {

            item
                .classList
                .toggle(
                    "is-active",
                    item === button
                );

        }
    );


    handoffReadout.innerHTML = `

        <span>
            FLOW://${key.toUpperCase()}
        </span>

        <strong>
            ${handoffData[key]}
        </strong>
    `;

}


handoffButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () =>
                activateHandoff(
                    button
                )
        );

    }
);


runHandoff
    ?.addEventListener(
        "click",
        async () => {

            runHandoff.disabled =
                true;


            for (
                const button
                of handoffButtons
            ) {

                activateHandoff(
                    button
                );


                await wait(
                    1100
                );

            }


            runHandoff.disabled =
                false;

        }
    );



/* ============================================================
   13. AWS / EKS INSPECTOR
   ============================================================ */

const awsButtons =
    $$(
        "[data-aws]"
    );


const awsReadout =
    $("#awsReadout");


const awsData = {


    developer:
        "A developer creates or changes the application source code.",


    github:
        "GitHub stores and versions the application source.",


    cicd:
        "A CI/CD workflow can build, test, and deliver application changes.",


    ecr:
        "Amazon ECR stores container images so workloads in AWS can retrieve them.",


    alb:
        "An Application Load Balancer receives incoming application traffic and distributes it toward the workload.",


    pod:
        "Pods run the application containers on Kubernetes worker compute.",


    route53:
        "Route 53 provides DNS services for application names.",


    storage:
        "EBS and EFS provide storage options that can be integrated with Kubernetes workloads.",


    cloudwatch:
        "CloudWatch provides AWS logs, metrics, and observability.",


    secrets:
        "Secrets Manager stores sensitive application secret values.",


    users:
        "Users generate incoming application traffic.",


    service:
        "A Kubernetes Service gives Pods a stable network abstraction inside the cluster."

};


awsButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const key =
                    button
                        .dataset
                        .aws;


                awsButtons.forEach(
                    item => {

                        item
                            .classList
                            .toggle(
                                "is-active",
                                item === button
                            );

                    }
                );


                awsReadout.innerHTML = `

                    <span>
                        AWS://${key.toUpperCase()}
                    </span>

                    <strong>
                        ${
                            awsData[key]
                            ||
                            "This component participates in the EKS architecture."
                        }
                    </strong>
                `;

            }
        );

    }
);