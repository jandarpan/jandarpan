// ===============================
// GET REPORTS
// ===============================

let reports = JSON.parse(
    localStorage.getItem("janDarpanReports")
) || [];


// ===============================
// ELEMENTS
// ===============================

const reportsList = document.getElementById("reportsList");
const emptyMessage = document.getElementById("emptyMessage");

const tabs = document.querySelectorAll(".report-tab");


// ===============================
// SHOW REPORTS
// ===============================

function showReports(status = "All") {

    reportsList.innerHTML = "";

    let filteredReports = reports;

    // Filter according to selected tab
    if (status !== "All") {

        filteredReports = reports.filter(function (report) {

            return report.status === status;

        });

    }


    // No reports
    if (filteredReports.length === 0) {

        reportsList.style.display = "none";
        emptyMessage.style.display = "block";

        return;

    }


    reportsList.style.display = "flex";
    emptyMessage.style.display = "none";


    // Show reports
    filteredReports.forEach(function (report) {

        const reportCard = document.createElement("div");

        reportCard.className = "report-item";


        reportCard.innerHTML = `

            <img
                src="${report.photo}"
                class="report-photo"
                alt="Reported problem"
            >

            <div class="report-content">

                <div class="report-top">

                    <span class="report-category">
                        ${report.category}
                    </span>

                    <span class="report-status">
                        ${report.status}
                    </span>

                </div>


                <h3>
                    ${report.problem}
                </h3>


                <p class="report-description">
                    ${report.description || "No description provided."}
                </p>


                <p class="report-location">
                    📍 ${report.assembly}, ${report.district}, ${report.state}
                </p>


                <p class="report-date">
                    📅 ${report.date}
                </p>


                <div class="report-actions">

                    <button
                        class="delete-btn"
                        onclick="deleteReport(${report.id})"
                    >
                        🗑 Delete Report
                    </button>

                </div>

            </div>

        `;


        reportsList.appendChild(reportCard);

    });

}


// ===============================
// DELETE REPORT
// ===============================

function deleteReport(reportId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this report?"
    );


    if (!confirmDelete) {
        return;
    }


    // Remove selected report
    reports = reports.filter(function (report) {

        return report.id !== reportId;

    });


    // Save updated reports
    localStorage.setItem(
        "janDarpanReports",
        JSON.stringify(reports)
    );


    // Refresh list
    showReports();


    alert("Report deleted successfully.");

}


// ===============================
// TAB FILTER
// ===============================

tabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        // Remove active from all
        tabs.forEach(function (item) {

            item.classList.remove("active");

        });


        // Activate clicked tab
        tab.classList.add("active");


        // Get selected status
        const status = tab.dataset.status;


        // Show filtered reports
        showReports(status);

    });

});


// ===============================
// INITIAL LOAD
// ===============================

showReports();