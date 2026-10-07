const searchInput = document.getElementById("searchInput");

const notes = document.querySelectorAll(".note-card");

const noResults = document.getElementById("noResults");


function searchNotes() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let found = false;

    notes.forEach(note => {

        const text =
            note.innerText.toLowerCase();

        if (text.includes(searchText)) {

            note.style.display = "flex";

            found = true;

        } else {

            note.style.display = "none";

        }

    });

    if (found) {

        noResults.style.display = "none";

    } else {

        noResults.style.display = "block";

    }
}


/* Search while typing */

searchInput.addEventListener("input", searchNotes);


/* Subject filter */

function filterSubject(subject) {

    let found = false;

    notes.forEach(note => {

        const noteSubject =
            note.getAttribute("data-subject");

        if (noteSubject === subject) {

            note.style.display = "flex";

            found = true;

        } else {

            note.style.display = "none";

        }

    });

    if (found) {

        noResults.style.display = "none";

        document.getElementById("notes")
            .scrollIntoView({
                behavior: "smooth"
            });

    } else {

        noResults.style.display = "block";

    }
}