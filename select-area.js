const stateSelect = document.getElementById("state");
const districtSelect = document.getElementById("district");
const assemblySelect = document.getElementById("assembly");


const data = {

    "Bihar": {

        "Araria": [
            "46-Narpatganj",
            "47-Raniganj (SC)",
            "48-Forbesganj",
            "49-Araria",
            "50-Jokihat",
            "51-Sikti"
        ],

        "Arwal": [
            "214-Arwal",
            "215-Kurtha"
        ],

        "Aurangabad": [
            "219-Goh",
            "220-Obra",
            "221-Nabinagar",
            "222-Kutumba (SC)",
            "223-Aurangabad",
            "224-Rafiganj"
        ],

        "Banka": [
            "159-Amarpur",
            "160-Dhauraiya (SC)",
            "161-Banka",
            "162-Katoria (ST)",
            "163-Belhar"
        ],

        "Begusarai": [
            "141-Cheria Bariarpur",
            "142-Bachhwara",
            "143-Teghra",
            "144-Matihani",
            "145-Sahebpur Kamal",
            "146-Begusarai",
            "147-Bakhri (SC)"
        ],

        "Bhagalpur": [
            "152-Bihpur",
            "153-Gopalpur",
            "154-Pirpainti (SC)",
            "155-Kahalgaon",
            "156-Bhagalpur",
            "157-Sultanganj",
            "158-Nathnagar"
        ],

        "Bhojpur": [
            "192-Sandesh",
            "193-Barhara",
            "194-Arrah",
            "195-Agiaon (SC)",
            "196-Tarari",
            "197-Jagdishpur",
            "198-Shahpur"
        ],

        "Buxar": [
            "199-Brahampur",
            "200-Buxar",
            "201-Dumraon",
            "202-Rajpur (SC)"
        ],

        "Darbhanga": [
            "78-Kusheshwar Asthan (SC)",
            "79-Gaura Bauram",
            "80-Benipur",
            "81-Alinagar",
            "82-Darbhanga Rural",
            "83-Darbhanga",
            "84-Hayaghat",
            "85-Bahadurpur",
            "86-Keoti",
            "87-Jale"
        ],

        "East Champaran": [
            "10-Raxaul",
            "11-Sugauli",
            "12-Narkatia",
            "13-Harsidhi (SC)",
            "14-Govindganj",
            "15-Kesaria",
            "16-Kalyanpur",
            "17-Pipra",
            "18-Madhuban",
            "19-Motihari",
            "20-Chiraia",
            "21-Dhaka"
        ],

        "Gaya": [
            "225-Gurua",
            "226-Sherghati",
            "227-Imamganj (SC)",
            "228-Barachatti (SC)",
            "229-Bodh Gaya (SC)",
            "230-Gaya Town",
            "231-Tikari",
            "232-Belaganj",
            "233-Atri",
            "234-Wazirganj"
        ],

        "Gopalganj": [
            "99-Baikunthpur",
            "100-Barauli",
            "101-Gopalganj",
            "102-Kuchaikote",
            "103-Bhorey (SC)",
            "104-Hathua"
        ],

        "Jamui": [
            "240-Sikandra (SC)",
            "241-Jamui",
            "242-Jhajha",
            "243-Chakai"
        ],

        "Jehanabad": [
            "216-Jehanabad",
            "217-Ghosi",
            "218-Makhdumpur (SC)"
        ],

        "Kaimur": [
            "203-Ramgarh",
            "204-Mohania (SC)",
            "205-Bhabua",
            "206-Chainpur"
        ],

        "Katihar": [
            "63-Katihar",
            "64-Kadwa",
            "65-Balrampur",
            "66-Pranpur",
            "67-Manihari (ST)",
            "68-Barari",
            "69-Korha (SC)"
        ],

        "Khagaria": [
            "148-Alauli (SC)",
            "149-Khagaria",
            "150-Beldaur",
            "151-Parbatta"
        ],

        "Kishanganj": [
            "52-Bahadurganj",
            "53-Thakurganj",
            "54-Kishanganj",
            "55-Kochadhaman"
        ],

        "Lakhisarai": [
            "167-Suryagarha",
            "168-Lakhisarai"
        ],

        "Madhepura": [
            "70-Alamnagar",
            "71-Bihariganj",
            "72-Singheshwar (SC)",
            "73-Madhepura"
        ],

        "Madhubani": [
            "31-Harlakhi",
            "32-Benipatti",
            "33-Khajauli",
            "34-Babubarhi",
            "35-Bisfi",
            "36-Madhubani",
            "37-Rajnagar (SC)",
            "38-Jhanjharpur",
            "39-Phulparas",
            "40-Laukaha"
        ],

        "Munger": [
            "164-Tarapur",
            "165-Munger",
            "166-Jamalpur"
        ],

        "Muzaffarpur": [
            "88-Gaighat",
            "89-Aurai",
            "90-Minapur",
            "91-Bochaha (SC)",
            "92-Sakra (SC)",
            "93-Kurhani",
            "94-Muzaffarpur",
            "95-Kanti",
            "96-Baruraj",
            "97-Paroo",
            "98-Sahebganj"
        ],

        "Nalanda": [
            "171-Asthawan",
            "172-Biharsharif",
            "173-Rajgir (SC)",
            "174-Islampur",
            "175-Hilsa",
            "176-Nalanda",
            "177-Harnaut"
        ],

        "Nawada": [
            "235-Rajauli (SC)",
            "236-Hisua",
            "237-Nawada",
            "238-Gobindpur",
            "239-Warsaliganj"
        ],

        "Patna": [
            "178-Mokama",
            "179-Barh",
            "180-Bakhtiarpur",
            "181-Digha",
            "182-Bankipur",
            "183-Kumhrar",
            "184-Patna Sahib",
            "185-Fatuha",
            "186-Danapur",
            "187-Maner",
            "188-Phulwari (SC)",
            "189-Masaurhi (SC)",
            "190-Paliganj",
            "191-Bikram"
        ],

        "Purnia": [
            "56-Amour",
            "57-Baisi",
            "58-Kasba",
            "59-Banmankhi (SC)",
            "60-Rupauli",
            "61-Dhamdaha",
            "62-Purnia"
        ],

        "Rohtas": [
            "207-Chenari (SC)",
            "208-Sasaram",
            "209-Kargahar",
            "210-Dinara",
            "211-Nokha",
            "212-Dehri",
            "213-Karakat"
        ],

        "Saharsa": [
            "74-Sonbarsha (SC)",
            "75-Saharsa",
            "76-Simri Bakhtiarpur",
            "77-Mahishi"
        ],

        "Samastipur": [
            "131-Kalyanpur (SC)",
            "132-Warisnagar",
            "133-Samastipur",
            "134-Ujiarpur",
            "135-Morwa",
            "136-Sarairanjan",
            "137-Mohiuddinnagar",
            "138-Bibhutipur",
            "139-Rosera (SC)",
            "140-Hasanpur"
        ],

        "Saran": [
            "112-Maharajganj",
            "113-Ekma",
            "114-Manjhi",
            "115-Baniapur",
            "116-Taraiya",
            "117-Marhaura",
            "118-Chapra",
            "119-Garkha (SC)",
            "120-Amnour",
            "121-Parsa",
            "122-Sonepur"
        ],

        "Sheikhpura": [
            "169-Sheikhpura",
            "170-Barbigha"
        ],

        "Sheohar": [
            "22-Sheohar"
        ],

        "Siwan": [
            "105-Siwan",
            "106-Ziradei",
            "107-Darauli (SC)",
            "108-Raghunathpur",
            "109-Daraundha",
            "110-Barharia",
            "111-Goriakothi"
        ],

        "Sitamarhi": [
            "23-Riga",
            "24-Bathnaha (SC)",
            "25-Parihar",
            "26-Sursand",
            "27-Bajpatti",
            "28-Sitamarhi",
            "29-Runnisaidpur",
            "30-Belsand"
        ],

        "Supaul": [
            "41-Nirmali",
            "42-Pipra",
            "43-Supaul",
            "44-Triveniganj (SC)",
            "45-Chhatapur"
        ],

        "Vaishali": [
            "123-Hajipur",
            "124-Lalganj",
            "125-Vaishali",
            "126-Mahua",
            "127-Raja Pakar (SC)",
            "128-Raghopur",
            "129-Mahnar",
            "130-Patepur (SC)"
        ],

        "West Champaran": [
            "1-Valmiki Nagar",
            "2-Ramnagar (SC)",
            "3-Narkatiaganj",
            "4-Bagaha",
            "5-Lauriya",
            "6-Nautan",
            "7-Chanpatia",
            "8-Bettiah",
            "9-Sikta"
        ]

    }

};


// STATE CHANGE

stateSelect.addEventListener("change", function () {

    const selectedState = this.value;

    districtSelect.innerHTML =
        '<option value="">Select your district</option>';

    assemblySelect.innerHTML =
        '<option value="">Select your assembly</option>';

    districtSelect.disabled = true;
    assemblySelect.disabled = true;


    if (selectedState === "Bihar") {

        districtSelect.disabled = false;

        const districts = data["Bihar"];

        Object.keys(districts).forEach(function (district) {

            const option = document.createElement("option");

            option.value = district;
            option.textContent = district;

            districtSelect.appendChild(option);

        });

    }

});


// DISTRICT CHANGE

districtSelect.addEventListener("change", function () {

    const selectedDistrict = this.value;

    assemblySelect.innerHTML =
        '<option value="">Select your assembly</option>';

    assemblySelect.disabled = true;


    if (
        selectedDistrict &&
        data["Bihar"][selectedDistrict]
    ) {

        assemblySelect.disabled = false;

        const assemblies =
            data["Bihar"][selectedDistrict];

        assemblies.forEach(function (assembly) {

            const option = document.createElement("option");

            option.value = assembly;
            option.textContent = assembly;

            assemblySelect.appendChild(option);

        });

    }

});


// FORM SUBMIT

const areaForm = document.getElementById("areaForm");

areaForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const state = stateSelect.value;
    const district = districtSelect.value;
    const assembly = assemblySelect.value;

    if (!state || !district || !assembly) {

        alert("Please select your complete area.");

        return;

    }

    localStorage.setItem("selectedState", state);
    localStorage.setItem("selectedDistrict", district);
    localStorage.setItem("selectedAssembly", assembly);

    window.location.href = "dashboard.html";

});