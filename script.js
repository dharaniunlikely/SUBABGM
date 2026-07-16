let musicList =
    JSON.parse(localStorage.getItem("musicList")) || [];

let ringtoneList =
    JSON.parse(localStorage.getItem("ringtoneList")) || [];

let currentFilter = "all";


/* =========================
   LOAD MUSIC
========================= */

function loadMusic() {

    const container =
        document.getElementById("musicList");

    if (!container) return;

    container.innerHTML = "";


    let allItems = [];


    if (
        currentFilter === "all" ||
        currentFilter === "music"
    ) {

        musicList.forEach(item => {

            allItems.push({
                ...item,
                type: "music"
            });

        });

    }


    if (
        currentFilter === "all" ||
        currentFilter === "ringtone"
    ) {

        ringtoneList.forEach(item => {

            allItems.push({
                ...item,
                type: "ringtone"
            });

        });

    }


    if (allItems.length === 0) {

        container.innerHTML = `

            <div class="music-card empty-box">

                <h3>No Updates</h3>

                <p>
                    New music and ringtones coming soon.
                </p>

            </div>

        `;

        return;

    }


    allItems.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            `music-card ${item.type}`;


        const info =
            document.createElement("div");

        info.className =
            "music-info";


        const title =
            document.createElement("h3");

        title.innerText =
            item.type === "music"
                ? `Music - ${item.name}`
                : `Ringtone - ${item.name}`;


        const date =
            document.createElement("p");

        date.innerText =
            `Updated: ${item.date}`;


        info.appendChild(title);

        info.appendChild(date);


        const audio =
            document.createElement("audio");

        audio.controls = true;

        audio.src =
            item.file;


        const button =
            document.createElement("button");

        button.className =
            "download-btn";

        button.innerText =
            "Download";


        button.addEventListener(
            "click",
            function () {

                goDownload(
                    item.name,
                    item.file
                );

            }
        );


        card.appendChild(info);

        card.appendChild(audio);

        card.appendChild(button);


        container.appendChild(card);

    });


    autoPauseMusic();

}


/* =========================
   DOWNLOAD PAGE
========================= */

function goDownload(name, file) {

    localStorage.setItem(
        "downloadName",
        name
    );

    localStorage.setItem(
        "downloadFile",
        file
    );

    window.location.href =
        "download.html";

}


/* =========================
   SEARCH
========================= */

function searchMusic() {

    const input =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const cards =
        document.querySelectorAll(".music-card");


    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();


        card.style.display =
            text.includes(input)
                ? "block"
                : "none";

    });

}


/* =========================
   AUTO PAUSE
========================= */

function autoPauseMusic() {

    const players =
        document.querySelectorAll("audio");


    players.forEach(player => {

        player.addEventListener(
            "play",
            function () {

                players.forEach(other => {

                    if (other !== player) {

                        other.pause();

                    }

                });

            }
        );

    });

}


/* =========================
   PAGE EVENTS
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        loadMusic();


        const search =
            document.getElementById(
                "searchInput"
            );


        if (search) {

            search.addEventListener(
                "input",
                searchMusic
            );

        }


        const explore =
            document.getElementById(
                "exploreBtn"
            );


        if (explore) {

            explore.addEventListener(
                "click",
                function () {

                    document
                        .getElementById(
                            "musicSection"
                        )
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );

        }


        document
            .querySelectorAll(
                "[data-filter]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        currentFilter =
                            button.dataset.filter;

                        loadMusic();

                    }
                );

            });


        }
    

);
card.innerHTML = `

    <img
        src="${item.photoURL}"
        class="song-photo"
        alt="${item.name}">

    <div class="music-info">

        <h3>

            ${
                item.type === "music"
                    ? "Music"
                    : "Ringtone"
            }

            - ${item.name}

        </h3>

        <p>

            Updated:
            ${item.date}

        </p>

    </div>

    <audio controls>

        <source src="${item.url}">

    </audio>

    <button class="download-btn">

        Download

    </button>

`;