/* =========================================================
   BLUE FOX DEFENSE
   Kubernetes Platform Operations Portal

   Main Application JavaScript
   ========================================================= */


/* =========================================================
   APPLICATION CONFIGURATION

   Right now these values are stored directly in JavaScript.

   Later in the Kubernetes lab, we will move some of this
   configuration outside of the application using Kubernetes
   ConfigMaps.

   This is intentional.

   It lets us compare:

   Hard-coded application configuration
                   vs.
   Kubernetes-managed configuration
   ========================================================= */

const appConfig = {
    name: "bluefox-web",
    version: "v1.0.0",
    environment: "Local Development",
    environmentShortName: "Local",
    platform: "Local"
};


/* =========================================================
   HTML ELEMENT REFERENCES
   ========================================================= */

const applicationVersion =
    document.getElementById("applicationVersion");

const applicationEnvironment =
    document.getElementById("applicationEnvironment");

const environmentBadge =
    document.getElementById("environmentBadge");

const platformValue =
    document.getElementById("platformValue");

const footerVersion =
    document.getElementById("footerVersion");

const healthCheckButton =
    document.getElementById("healthCheckButton");

const healthResult =
    document.getElementById("healthResult");

const healthMessage =
    document.getElementById("healthMessage");

const healthTimestamp =
    document.getElementById("healthTimestamp");


/* =========================================================
   LOAD APPLICATION INFORMATION

   This function updates the interface with the information
   stored in appConfig.

   Later, Kubernetes configuration can replace some of these
   values without requiring us to rebuild the entire app.
   ========================================================= */

function loadApplicationConfig() {

    applicationVersion.textContent =
        appConfig.version;

    applicationEnvironment.textContent =
        appConfig.environment;

    environmentBadge.textContent =
        appConfig.environmentShortName;

    platformValue.textContent =
        appConfig.platform;

    footerVersion.textContent =
        appConfig.version;

}


/* =========================================================
   APPLICATION HEALTH CHECK

   This is currently a front-end simulation.

   It confirms that JavaScript is running and the application
   interface is responding.

   Later we will create an actual health endpoint that
   Kubernetes can use with:

   - readiness probes
   - liveness probes

   Those probes will allow Kubernetes itself to determine
   whether the workload is healthy.
   ========================================================= */

function runHealthCheck() {

    const checkTime = new Date();


    /*
        Show the health result panel.
    */
    healthResult.hidden = false;


    /*
        Update the displayed status.
    */
    healthMessage.textContent =
        `${appConfig.name} ${appConfig.version} responded successfully.`;


    /*
        Record when the health check was performed.
    */
    healthTimestamp.textContent =
        checkTime.toLocaleString();

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

healthCheckButton.addEventListener(
    "click",
    runHealthCheck
);


/* =========================================================
   APPLICATION INITIALIZATION

   Run when the JavaScript file loads.
   ========================================================= */

loadApplicationConfig();