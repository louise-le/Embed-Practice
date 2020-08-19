console.log("Herro");

// create viz variable
let viz;

// grab the vizcontainer element
const vizContainer = document.getElementById("vizContainer");
// grab url of tableau dashboard
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const url2 =
  "https://public.tableau.com/views/Freeschoolmealsandeducationalattainment/Dashboard";
// grab the options (desktop, height, width)
const options = {
  device: "desktop",
  hideToolbar: true,
};

// export to PDF
const pdfButton = document.getElementById("pdfButton");
pdfButton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

// export to image
const imageButton = document.getElementById("imageButton");
imageButton.addEventListener("click", function () {
  viz.showExportImageDialog();
});

// grab show/hide buttons
const showButton = document.getElementById("showButton");
const hideButton = document.getElementById("hideButton");
// hide the show button by default - done in function below
// click on hide button replaces hide with show button
hideButton.addEventListener("click", function () {
  // 1. hide tableau viz
  viz.hide();
  // 2. hide the hide button and show the show button
  showButton.style.display = "inline";
  hideButton.style.display = "none";
});

showButton.addEventListener("click", function () {
  // 1. hide tableau viz
  viz.show();
  // 2. hide the hide button and show the show button
  showButton.style.display = "none";
  hideButton.style.display = "inline";
});

// listen for click on switchviz button
const switchViz = document.getElementById("switchViz");
switchViz.addEventListener("click", function () {
  // remove first viz, replace with second
  if (viz.getUrl() === url) {
    initViz(url2);
  } else {
    initViz(url);
  }
});

// loop through filter values
document.querySelectorAll(".filter").forEach((filter) => {
  console.log(filter);
  filter.addEventListener("click", (e) => singleFilter(e.target.value));
});

// filter dashboard to region
function singleFilter(value) {
  const sheetToFilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");

  sheetToFilter.applyFilterAsync(
    "Region",
    value,
    tableau.FilterUpdateType.REPLACE
  );
}

// create function that initialises dashboard
function initViz(vizUrl) {
  if (viz) {
    viz.dispose();
  }
  viz = new tableau.Viz(vizContainer, vizUrl, options);
  showButton.style.display = "none";
}

initViz(url);
