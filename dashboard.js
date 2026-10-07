// ===============================
// GET SELECTED AREA
// ===============================

const state = localStorage.getItem("selectedState");
const district = localStorage.getItem("selectedDistrict");
const assembly = localStorage.getItem("selectedAssembly");


// ===============================
// SHOW SELECTED AREA
// ===============================

const areaTitle = document.getElementById("areaTitle");
const stateTitle = document.getElementById("stateTitle");

if (district && assembly) {
    areaTitle.textContent = `${assembly}, ${district}`;
} else if (district) {
    areaTitle.textContent = district;
}

if (state) {
    stateTitle.textContent = state;
}


// ===============================
// LOAD REPORTS
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
// UPDATE OVERVIEW
// ===============================

const overviewCards =
    document.querySelectorAll(".overview-card");

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
// RECENT REPORTS
// ===============================

const reportsSection =
    document.querySelector(".reports-section");

const emptyReports =
    document.querySelector(".empty-reports");


// Remove old report cards if any
const oldReportCards =
    document.querySelectorAll(".recent-report-card");

oldReportCards.forEach(function (card) {
    card.remove();
});


if (reports.length > 0) {

    // Hide empty message
    if (emptyReports) {
        emptyReports.style.display = "none";
    }

    // Show latest 5 reports
    const recentReports = reports.slice(-5).reverse();

    recentReports.forEach(function (report) {

        const card = document.createElement("div");

        card.className = "recent-report-card";

        const category =
            report.category || "Other";

        const problem =
            report.problem || "Civic problem";

        const status =
            report.status || "Unresolved";

        const village =
            report.village || "Area not specified";

        card.innerHTML = `
            <div class="recent-report-icon">
                📍
            </div>

            <div class="recent-report-content">

                <h3>
                    ${problem}
                </h3>

                <p>
                    ${category} • ${village}
                </p>

                <span class="report-status ${status
                    .toLowerCase()
                    .replace(" ", "-")}">
                    ${status}
                </span>

            </div>
        `;

        reportsSection.appendChild(card);

    });

}


// ===============================
// CATEGORY LINKS
// ===============================

const categoryLinks =
    document.querySelectorAll(".category-card");

categoryLinks.forEach(function (card) {

    card.addEventListener("click", function () {

        const url = card.getAttribute("href");

        if (url) {
            window.location.href = url;
        }

    });

});


// ===============================
// VIEW ALL
// ===============================

const viewAllButton =
    document.querySelector(".view-all");

if (viewAllButton) {

    viewAllButton.addEventListener("click", function () {

        window.location.href = "all-reports.html";

    });

}


// ===============================
// PROFILE
// ===============================

const profileButton =
    document.querySelector(".profile-btn");

if (profileButton) {

    profileButton.addEventListener("click", function () {

        alert("Profile section will be added soon.");

    });

}


// ===============================
// NOTIFICATIONS
// ===============================

const notificationButton =
    document.querySelector(".icon-btn");

if (notificationButton) {

    notificationButton.addEventListener("click", function () {

        if (reports.length === 0) {

            alert("No new notifications.");

        } else {

            alert(
                `You have ${reports.length} report(s) in your area.`
            );

        }

    });

}