// ===============================
// GET SELECTED AREA
// ===============================

const state = localStorage.getItem("selectedState");
const district = localStorage.getItem("selectedDistrict");
const assembly = localStorage.getItem("selectedAssembly");


// ===============================
// SHOW AREA
// ===============================

const areaTitle = document.getElementById("areaTitle");
const stateTitle = document.getElementById("stateTitle");

if (district && assembly) {
    areaTitle.textContent = `${assembly}, ${district}`;
}

if (state) {
    stateTitle.textContent = state;
}


// ===============================
// LOAD SAVED REPORTS
// ===============================

let reports = JSON.parse(
    localStorage.getItem("janDarpanReports")
) || [];


// ===============================
// REPORT COUNTS
// ===============================

const totalReports = reports.length;

const inProgressReports = reports.filter(function (report) {
    return report.status === "In Progress";
}).length;

const resolvedReports = reports.filter(function (report) {
    return report.status === "Resolved";
}).length;

const unresolvedReports = reports.filter(function (report) {
    return report.status === "Unresolved";
}).length;


// ===============================
// UPDATE DASHBOARD COUNTS
// ===============================

const overviewCards = document.querySelectorAll(".overview-card");

if (overviewCards.length >= 4) {

    overviewCards[0].querySelector("strong").textContent =
        totalReports;

    overviewCards[1].querySelector("strong").textContent =
        inProgressReports;

    overviewCards[2].querySelector("strong").textContent =
        resolvedReports;

    overviewCards[3].querySelector("strong").textContent =
        unresolvedReports;
}


// ===============================
// CATEGORY LINKS
// ===============================

const categoryLinks = document.querySelectorAll(".category-card");

categoryLinks.forEach(function (card) {

    card.addEventListener("click", function () {

        const url = card.getAttribute("href");

        if (url) {
            window.location.href = url;
        }

    });

});


// ===============================
// BOTTOM NAVIGATION
// ===============================

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });

        item.classList.add("active");

    });

});


// ===============================
// VIEW ALL
// ===============================

const viewAllButton = document.querySelector(".view-all");

if (viewAllButton) {

    viewAllButton.addEventListener("click", function () {

        alert("All reports section will be available soon.");

    });

}


// ===============================
// PROFILE
// ===============================

const profileButton = document.querySelector(".profile-btn");

if (profileButton) {

    profileButton.addEventListener("click", function () {

        alert("Profile section will be added soon.");

    });

}


// ===============================
// NOTIFICATIONS
// ===============================

const notificationButton = document.querySelector(".icon-btn");

if (notificationButton) {

    notificationButton.addEventListener("click", function () {

        alert("No new notifications.");

    });

}