// ===============================
// CATEGORY SELECTION
// ===============================

const categoryButtons = document.querySelectorAll(".category-option");
const categoryInput = document.getElementById("category");

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        categoryButtons.forEach(function (item) {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        categoryInput.value = button.dataset.category;

    });

});


// ===============================
// REPORT AREA SELECTION
// ===============================

const reportDistrict = document.getElementById("reportDistrict");
const reportAssembly = document.getElementById("reportAssembly");
const reportBlock = document.getElementById("reportBlock");
const reportVillage = document.getElementById("reportVillage");


// Assembly data

const reportAssemblyData = {

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


// Block data

const reportBlockData = {

    "Daraunda": [
        "Daraunda"
    ],

    "Siwan": [
        "Siwan Sadar"
    ]

};


// Village data

const reportVillageData = {

    "Daraunda": [
        "All Villages"
    ],

    "Siwan Sadar": [
        "All Villages"
    ]

};


// District → Assembly

reportDistrict.addEventListener("change", function () {

    const district = reportDistrict.value;

    reportAssembly.innerHTML = `
        <option value="all">
            Select Assembly
        </option>
    `;

    reportBlock.innerHTML = `
        <option value="all">
            Select Block
        </option>
    `;

    reportVillage.innerHTML = `
        <option value="all">
            Select Village
        </option>
    `;


    if (reportAssemblyData[district]) {

        reportAssemblyData[district].forEach(function (assembly) {

            const option = document.createElement("option");

            option.value = assembly;
            option.textContent = assembly;

            reportAssembly.appendChild(option);

        });

    }

});


// Assembly → Block

reportAssembly.addEventListener("change", function () {

    const assembly = reportAssembly.value;

    reportBlock.innerHTML = `
        <option value="all">
            Select Block
        </option>
    `;

    reportVillage.innerHTML = `
        <option value="all">
            Select Village
        </option>
    `;


    if (reportBlockData[assembly]) {

        reportBlockData[assembly].forEach(function (block) {

            const option = document.createElement("option");

            option.value = block;
            option.textContent = block;

            reportBlock.appendChild(option);

        });

    }

});


// Block → Village

reportBlock.addEventListener("change", function () {

    const block = reportBlock.value;

    reportVillage.innerHTML = `
        <option value="all">
            Select Village
        </option>
    `;


    if (reportVillageData[block]) {

        reportVillageData[block].forEach(function (village) {

            const option = document.createElement("option");

            option.value = village;
            option.textContent = village;

            reportVillage.appendChild(option);

        });

    }

});


// ===============================
// LOAD SELECTED AREA
// ===============================

const state = localStorage.getItem("selectedState");

const selectedDistrict =
    localStorage.getItem("selectedDistrict");

const selectedAssembly =
    localStorage.getItem("selectedAssembly");


const locationArea = document.getElementById("locationArea");
const locationState = document.getElementById("locationState");


if (selectedDistrict && selectedAssembly) {

    locationArea.textContent =
        `${selectedAssembly}, ${selectedDistrict}`;

}


if (state) {

    locationState.textContent = state;

}


// ===============================
// GET CURRENT LOCATION
// ===============================

const locationButton =
    document.getElementById("locationButton");

let latitude = null;
let longitude = null;


locationButton.addEventListener("click", function () {

    if (!navigator.geolocation) {

        alert("Your browser does not support location.");
        return;

    }


    locationButton.textContent =
        "Getting location...";

    locationButton.disabled = true;


    navigator.geolocation.getCurrentPosition(

        function (position) {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;


            locationButton.textContent =
                "✓ Location Added";


            locationButton.style.background =
                "#dcfce7";

            locationButton.style.color =
                "#15803d";


            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);


            alert(
                "Your location has been added successfully."
            );

        },


        function (error) {

            locationButton.textContent =
                "Use Location";

            locationButton.disabled = false;


            if (error.code === 1) {

                alert(
                    "Location permission was denied."
                );

            }

            else if (error.code === 2) {

                alert(
                    "Your location could not be found."
                );

            }

            else {

                alert(
                    "Unable to get your location."
                );

            }

        }

    );

});


// ===============================
// FORM SUBMISSION
// ===============================

const reportForm =
    document.getElementById("reportForm");


reportForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const category =
        categoryInput.value;

    const problem =
        document.getElementById("problem").value;

    const description =
        document.getElementById("description").value;

    const photoInput =
        document.getElementById("photo");


    // AREA VALUES

    const reportDistrictValue =
        reportDistrict.value;

    const reportAssemblyValue =
        reportAssembly.value;

    const reportBlockValue =
        reportBlock.value;

    const reportVillageValue =
        reportVillage.value;


    // ===============================
    // VALIDATION
    // ===============================

    if (!category) {

        alert("Please select a category.");
        return;

    }


    if (reportDistrictValue === "all") {

        alert("Please select a district.");
        return;

    }


    if (reportAssemblyValue === "all") {

        alert("Please select an assembly constituency.");
        return;

    }


    if (reportBlockValue === "all") {

        alert("Please select a block.");
        return;

    }


    if (reportVillageValue === "all") {

        alert("Please select a village.");
        return;

    }


    if (!photoInput.files[0]) {

        alert("Please upload a photo.");
        return;

    }


    if (latitude === null ||
        longitude === null) {

        alert("Please add your location.");
        return;

    }


    // ===============================
    // PHOTO
    // ===============================

    const photoFile =
        photoInput.files[0];


    const reader =
        new FileReader();


    reader.onload = function () {


        const report = {

            id: Date.now(),

            category: category,

            problem: problem,

            description: description,

            photo: reader.result,

            latitude: latitude,

            longitude: longitude,

            state: state || "",

            district: reportDistrictValue,

            assembly: reportAssemblyValue,

            block: reportBlockValue,

            village: reportVillageValue,

            status: "Unresolved",

            date: new Date().toLocaleString()

        };


        // ===============================
        // GET OLD REPORTS
        // ===============================

        let reports = JSON.parse(
            localStorage.getItem("janDarpanReports")
        ) || [];


        // ===============================
        // ADD NEW REPORT
        // ===============================

        reports.push(report);


        // ===============================
        // SAVE REPORTS
        // ===============================

        localStorage.setItem(
            "janDarpanReports",
            JSON.stringify(reports)
        );


        console.log(
            "Saved Report:",
            report
        );


        alert(
            "Report submitted successfully!"
        );


        // ===============================
        // GO TO DASHBOARD
        // ===============================

        window.location.href =
            "dashboard.html";

    };


    reader.readAsDataURL(photoFile);

});