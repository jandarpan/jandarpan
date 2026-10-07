// =====================================
// AREA REPORTS - JAN DARPAN
// =====================================

// Dropdowns
const districtSelect = document.getElementById("district");
const assemblySelect = document.getElementById("assembly");
const blockSelect = document.getElementById("block");
const villageSelect = document.getElementById("village");

// Reports container
const reportsList = document.getElementById("reportsList");

// Summary numbers
const summaryCards = document.querySelectorAll(".summary-card strong");


// =====================================
// AREA DATA
// =====================================

const assemblyData = {

    "Siwan": [
        "Amnour",
        "Barharia",
        "Daraunda",
        "Goriyakothi",
        "Maharajganj",
        "Raghunathpur",
        "Siwan",
        "Ziradei"
    ]

};


const blockData = {

    "Daraunda": [
        "Daraunda"
    ],

    "Siwan": [
        "Siwan Sadar"
    ]

};


const villageData = {

    "Daraunda": [
        "All Villages"
    ],

    "Siwan Sadar": [
        "All Villages"
    ]

};


// =====================================
// LOAD REPORTS
// =====================================

let reports = JSON.parse(
    localStorage.getItem("janDarpanReports")
) || [];


// =====================================
// SHOW REPORTS
// =====================================

function showReports() {

    let filteredReports = reports;


    const district = districtSelect.value;
    const assembly = assemblySelect.value;
    const block = blockSelect.value;
    const village = villageSelect.value;


    // District filter
    if (district !== "all") {

        filteredReports = filteredReports.filter(function (report) {

            return report.district === district;

        });

    }


    // Assembly filter
    if (assembly !== "all") {

        filteredReports = filteredReports.filter(function (report) {

            return report.assembly === assembly;

        });

    }


    // Block filter
    if (block !== "all") {

        filteredReports = filteredReports.filter(function (report) {

            return report.block === block;

        });

    }


    // Village filter
    if (village !== "all") {

        filteredReports = filteredReports.filter(function (report) {

            return report.village === village;

        });

    }


    // Update summary
    updateSummary(filteredReports);


    // Clear old reports
    reportsList.innerHTML = "";


    // No reports
    if (filteredReports.length === 0) {

        reportsList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📍
                </div>

                <h3>
                    No reports found
                </h3>

                <p>
                    No reports have been submitted in this area yet.
                </p>

            </div>

        `;

        return;

    }


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

            </div>

        `;


        reportsList.appendChild(reportCard);

    });

}


// =====================================
// UPDATE SUMMARY
// =====================================

function updateSummary(filteredReports) {

    const total = filteredReports.length;

    const inProgress = filteredReports.filter(function (report) {

        return report.status === "In Progress";

    }).length;


    const resolved = filteredReports.filter(function (report) {

        return report.status === "Resolved";

    }).length;


    if (summaryCards.length >= 3) {

        summaryCards[0].textContent = total;
        summaryCards[1].textContent = inProgress;
        summaryCards[2].textContent = resolved;

    }

}


// =====================================
// DISTRICT CHANGE
// =====================================

districtSelect.addEventListener("change", function () {

    const selectedDistrict = districtSelect.value;


    assemblySelect.innerHTML = `
        <option value="all">
            All Constituencies
        </option>
    `;


    blockSelect.innerHTML = `
        <option value="all">
            All Blocks
        </option>
    `;


    villageSelect.innerHTML = `
        <option value="all">
            All Villages
        </option>
    `;


    if (assemblyData[selectedDistrict]) {

        assemblyData[selectedDistrict].forEach(function (assembly) {

            const option = document.createElement("option");

            option.value = assembly;
            option.textContent = assembly;

            assemblySelect.appendChild(option);

        });

    }


    showReports();

});


// =====================================
// ASSEMBLY CHANGE
// =====================================

assemblySelect.addEventListener("change", function () {

    const selectedAssembly = assemblySelect.value;


    blockSelect.innerHTML = `
        <option value="all">
            All Blocks
        </option>
    `;


    villageSelect.innerHTML = `
        <option value="all">
            All Villages
        </option>
    `;


    if (blockData[selectedAssembly]) {

        blockData[selectedAssembly].forEach(function (block) {

            const option = document.createElement("option");

            option.value = block;
            option.textContent = block;

            blockSelect.appendChild(option);

        });

    }


    showReports();

});


// =====================================
// BLOCK CHANGE
// =====================================

blockSelect.addEventListener("change", function () {

    const selectedBlock = blockSelect.value;


    villageSelect.innerHTML = `
        <option value="all">
            All Villages
        </option>
    `;


    if (villageData[selectedBlock]) {

        villageData[selectedBlock].forEach(function (village) {

            const option = document.createElement("option");

            option.value = village;
            option.textContent = village;

            villageSelect.appendChild(option);

        });

    }


    showReports();

});


// =====================================
// VILLAGE CHANGE
// =====================================

villageSelect.addEventListener("change", function () {

    showReports();

});


// =====================================
// INITIAL LOAD
// =====================================

showReports();