document.addEventListener(
    "DOMContentLoaded",
    function () {


        const name =
            localStorage.getItem(
                "downloadName"
            );


        const file =
            localStorage.getItem(
                "downloadFile"
            );


        const title =
            document.getElementById(
                "downloadTitle"
            );


        const message =
            document.getElementById(
                "downloadMessage"
            );


        const timer =
            document.getElementById(
                "downloadTimer"
            );


        const button =
            document.getElementById(
                "downloadButton"
            );


        if (!file) {

            title.innerText =
                "File Not Found";

            message.innerText =
                "Please select a file first.";

            timer.innerText =
                "X";

            return;

        }


        title.innerText =
            name || "Download File";


        let time = 10;


        const countdown =
            setInterval(
                function () {


                    timer.innerText =
                        time;


                    message.innerText =
                        `Download starting in ${time} seconds...`;


                    time--;


                    if (time < 0) {

                        clearInterval(
                            countdown
                        );


                        timer.innerText =
                            "OK";


                        message.innerText =
                            "Your download is ready!";


                        button.disabled =
                            false;


                        button.innerText =
                            "Download Now";


                        button.onclick =
                            function () {


                                const link =
                                    document.createElement(
                                        "a"
                                    );


                                link.href =
                                    file;


                                link.download =
                                    name || "download";


                                document
                                    .body
                                    .appendChild(
                                        link
                                    );


                                link.click();


                                document
                                    .body
                                    .removeChild(
                                        link
                                    );


                                button.innerText =
                                    "Downloaded";

                            };

                    }


                },
                1000
            );

    }
);