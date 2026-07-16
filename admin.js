let musicList =
    JSON.parse(localStorage.getItem("musicList")) || [];

let ringtoneList =
    JSON.parse(localStorage.getItem("ringtoneList")) || [];


/* =========================
   SECTION SWITCH
========================= */

document
    .querySelectorAll("[data-section]")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".admin-section")
                    .forEach(section => {

                        section.classList.add(
                            "hidden"
                        );

                    });


                const section =
                    document.getElementById(
                        button.dataset.section
                    );


                section.classList.remove(
                    "hidden"
                );


                if (
                    button.dataset.section ===
                    "updates"
                ) {

                    loadAdminItems();

                }

            }
        );

    });


/* =========================
   ADD MUSIC
========================= */

document
    .getElementById("addMusicBtn")
    .addEventListener(
        "click",
        function () {


            const name =
                document
                .getElementById("musicName")
                .value
                .trim();


            const fileInput =
                document.getElementById(
                    "musicFile"
                );


            const file =
                fileInput.files[0];


            if (!name || !file) {

                alert(
                    "Please enter name and select music file"
                );

                return;

            }


            if (
                !file.type.startsWith("audio/")
            ) {

                alert(
                    "Please select audio file only"
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload = function (event) {


                musicList.push({

                    name: name,

                    file: event.target.result,

                    date: new Date()
                        .toLocaleDateString()

                });


                try {

                    localStorage.setItem(
                        "musicList",
                        JSON.stringify(
                            musicList
                        )
                    );


                    alert(
                        "Music Added Successfully"
                    );


                    document
                        .getElementById(
                            "musicName"
                        )
                        .value = "";


                    fileInput.value = "";


                    updateStats();

                }

                catch (error) {

                    alert(
                        "Storage full. Please remove old files."
                    );

                }

            };


            reader.readAsDataURL(file);

        }
    );


/* =========================
   ADD RINGTONE
========================= */

document
    .getElementById("addRingtoneBtn")
    .addEventListener(
        "click",
        function () {


            const name =
                document
                .getElementById("ringtoneName")
                .value
                .trim();


            const fileInput =
                document.getElementById(
                    "ringtoneFile"
                );


            const file =
                fileInput.files[0];


            if (!name || !file) {

                alert(
                    "Please enter name and select ringtone file"
                );

                return;

            }


            if (
                !file.type.startsWith("audio/")
            ) {

                alert(
                    "Please select audio file only"
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload = function (event) {


                ringtoneList.push({

                    name: name,

                    file: event.target.result,

                    date: new Date()
                        .toLocaleDateString()

                });


                try {

                    localStorage.setItem(
                        "ringtoneList",
                        JSON.stringify(
                            ringtoneList
                        )
                    );


                    alert(
                        "Ringtone Added Successfully"
                    );


                    document
                        .getElementById(
                            "ringtoneName"
                        )
                        .value = "";


                    fileInput.value = "";


                    updateStats();

                }

                catch (error) {

                    alert(
                        "Storage full. Please remove old files."
                    );

                }

            };


            reader.readAsDataURL(file);

        }
    );


/* =========================
   DAILY UPDATES
========================= */

function loadAdminItems() {

    const container =
        document.getElementById(
            "adminItems"
        );


    container.innerHTML = "";


    musicList.forEach(
        function (item, index) {


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "admin-item";


            div.innerHTML = `

                <span>
                    Music - ${item.name}
                </span>

                <button class="delete-btn">
                    Delete
                </button>

            `;


            div
                .querySelector(".delete-btn")
                .addEventListener(
                    "click",
                    function () {

                        musicList.splice(
                            index,
                            1
                        );


                        localStorage.setItem(
                            "musicList",
                            JSON.stringify(
                                musicList
                            )
                        );


                        loadAdminItems();

                        updateStats();

                    }
                );


            container.appendChild(div);

        }
    );


    ringtoneList.forEach(
        function (item, index) {


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "admin-item";


            div.innerHTML = `

                <span>
                    Ringtone - ${item.name}
                </span>

                <button class="delete-btn">
                    Delete
                </button>

            `;


            div
                .querySelector(".delete-btn")
                .addEventListener(
                    "click",
                    function () {


                        ringtoneList.splice(
                            index,
                            1
                        );


                        localStorage.setItem(
                            "ringtoneList",
                            JSON.stringify(
                                ringtoneList
                            )
                        );


                        loadAdminItems();

                        updateStats();

                    }
                );


            container.appendChild(div);

        }
    );

}


/* =========================
   STATS
========================= */

function updateStats() {

    document
        .getElementById("musicCount")
        .innerText =
        musicList.length;


    document
        .getElementById("ringtoneCount")
        .innerText =
        ringtoneList.length;

}


/* =========================
   LOGOUT
========================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );


updateStats();