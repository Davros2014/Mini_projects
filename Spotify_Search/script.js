(function() {
    var results = $("#results"),
        nextUrl,
        next = $("#more"),
        backgroundContainer = $(".backgroundContainer");
    // image = $(".payloadImage");
    if (!nextUrl) {
        next.hide();
    }

    $(".submit-button").on("click", function() {
        var userInput = $('input[name="user-input"]').val(); // targets input from the user
        var dropdown = $(".artist-or-album")
            .val()
            .toLowerCase(); // the dropdown menu option the user chooses
        // console.log("this is the dropdown value:", dropdown.toUpperCase());
        var selection = dropdown.toUpperCase();
        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            // method: "get", // method not needed as it is 'get' by default
            data: {
                query: userInput, // represents info we get from the user
                type: dropdown // represents selection chosen by the user in the dropdown menu
            },
            success: function(payload) {
                // success function runs once we have heard a response from the API

                function search() {
                    console.log("show if success, payload is", payload);
                    if (userInput != $('input[name="user-input"]').val()) {
                        return;
                    }
                    if (payload && payload.items.length) {
                        var total = payload.total;
                        var output =
                            '<div class="resultTotal">' +
                            "Your search found " +
                            "<span>" +
                            total +
                            "</span>" +
                            " results </div>";
                        for (var j = 0; j < payload.items.length; j++) {
                            var img;
                            if (payload.items[j].images.length > 0) {
                                img =
                                    '<img class="payloadImage" src="' +
                                    payload.items[j].images[0].url +
                                    '" alt="">';
                            } else
                                img =
                                    '<img  class="spotifyLogo" src="assets/spotify-logo" alt="">';

                            output += '<div class="output">';

                            output += img;

                            output += '<div class="infoContainer">';
                            output +=
                                '<a class="album_artist" href="' +
                                payload.items[j].external_urls.spotify +
                                '">' +
                                selection +
                                ": " +
                                payload.items[j].name +
                                "</a>";
                            if (selection === "ALBUM") {
                                output +=
                                    '<p class="release">' +
                                    "Release date: " +
                                    new Date(
                                        payload.items[j].release_date
                                    ).toLocaleDateString() +
                                    "</p>" +
                                    '<p class="trackNum">' +
                                    "Number of tracks: " +
                                    payload.items[j].total_tracks +
                                    "</p>";
                            } else if (payload.items[j].genres.length === 0) {
                                output +=
                                    '<p class="genres">' +
                                    "Genre: Not defined" +
                                    "</p>" +
                                    '<p class="trackNum">' +
                                    "Number of followers: " +
                                    Number(payload.items[j].followers.total) +
                                    "</p>";
                            } else
                                output +=
                                    '<p class="genres">' +
                                    "Genre: " +
                                    payload.items[j].genres +
                                    " " +
                                    "</p>" +
                                    '<p class="trackNum">' +
                                    "Number of followers: " +
                                    Number(payload.items[j].followers.total) +
                                    "</p>";

                            output += "</div>" + "</div>";
                        }
                    } else
                        output =
                            '<div class="noresults"> No results found, please try again </div>';

                    results.append(output).show();
                }

                payload = payload.artists || payload.albums;
                nextUrl =
                    payload.next &&
                    payload.next.replace(
                        "https://api.spotify.com/v1/search",
                        "https://elegant-croissant.glitch.me/spotify"
                    );
                backgroundContainer.addClass("fade");
                next.show();

                next.on("click", function() {
                    console.log("MORE button clicked");
                    $.ajax({
                        url: nextUrl,
                        // method: "get", // not needed >> method is 'get' by default
                        data: {
                            query: userInput, // represents info from user
                            type: dropdown // represents dropdown chosen by user
                        },
                        success: function(payload) {
                            payload = payload.artists || payload.albums;
                            if (
                                userInput != $('input[name="user-input"]').val()
                            ) {
                                return;
                            }
                            if (payload && payload.items.length) {
                                var output = "";
                                for (var j = 0; j < payload.items.length; j++) {
                                    var img;

                                    if (payload.items[j].images.length > 0) {
                                        img =
                                            '<img class="payloadImage" src="' +
                                            payload.items[j].images[0].url +
                                            '" alt="">';
                                    } else
                                        img =
                                            '<img class="spotifyLogo" src="assets/spotify-logo.svg" alt="">';

                                    output += '<div class="output">';

                                    output += img;

                                    output += '<div class="infoContainer">';
                                    output +=
                                        '<a class="album_artist" href="' +
                                        payload.items[j].external_urls.spotify +
                                        '">' +
                                        selection +
                                        ": " +
                                        payload.items[j].name +
                                        "</a>";
                                    if (selection === "ALBUM") {
                                        output +=
                                            '<p class="release">' +
                                            "Release date: " +
                                            new Date(
                                                payload.items[j].release_date
                                            ).toLocaleDateString() +
                                            "</p>" +
                                            '<p class="trackNum">' +
                                            "Number of tracks: " +
                                            payload.items[j].total_tracks +
                                            "</p>";
                                    } else if (
                                        payload.items[j].genres.length === 0
                                    ) {
                                        output +=
                                            '<p class="genres">' +
                                            "Genre: Not defined" +
                                            "</p>" +
                                            '<p class="trackNum">' +
                                            "Number of followers: " +
                                            Number(
                                                payload.items[j].followers.total
                                            ) +
                                            "</p>";
                                    } else
                                        output +=
                                            '<p class="genres">' +
                                            "Genre: " +
                                            payload.items[j].genres +
                                            "</p>" +
                                            '<p class="trackNum">' +
                                            "Number of followers: " +
                                            Number(
                                                payload.items[j].followers.total
                                            ) +
                                            "</p>";

                                    output += "</div>" + "</div>";
                                }
                            } else
                                output =
                                    '<div class="noresults">No results found, please try again</div>';
                            results.append(output).show();
                        }
                    });
                });

                // search artists/album info
                search();
                // $(".output").on("click", function() {
                //     console.log("clicking the image here");
                //     image.append(grow).show();
                // });
            }
        });
    });
})();
