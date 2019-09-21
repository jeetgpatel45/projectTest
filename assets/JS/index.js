
$(document).ready(function () {

    //--------------------------SLIDESHOW--------------------------//
    var slideIndex = 0;

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("images");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "flex";
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
    showSlides();


    //-------------------------GETTING THE API'S-------------------------//
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        console.log("you clicked")

        var songString = $("#inputSearch").val().trim();
        var newSongString = songString.split(' ').join('+');
        var title = newSongString
        var topTitleMatch = newSongString

        var apiKey = "637a89984572ad6c6f2f4d364da0305e"
        var queryURL = "http://ws.audioscrobbler.com/2.0/?method=track.search" + "&limit=5" + "&track=" + title + "&api_key=" + apiKey + "&format=json"
        console.log("queryURL: " + queryURL)

        var trackList = [];
        var artistList = [];
        var albumList = [];

        var arrayCart = [];

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // take first best match and put it in the variable that we will use for the youtube api
            topTitleMatch = response.results.trackmatches.track[0].name

            for (var i = 0; i < 5; i++) {

                var theHref = response.results.trackmatches.track[i].url

                var artistName = response.results.trackmatches.track[i].artist
                artistName = artistName.split(' ').join('+');

                var trackName = response.results.trackmatches.track[i].name
                trackName = trackName.split(' ').join('+');
                trackList.push(trackName)
                artistList.push(artistName)

                // Create the new row
                var newRow = $("<tr>").attr('class', 'trBody').append(
                    // $("<td>").text(response.results.trackmatches.track[i].image[i].size).attr('id', 'trackID' + i),
                    $("<td>").text(response.results.trackmatches.track[i].name),
                    $("<td>").text(response.results.trackmatches.track[i].artist),
                    $("<td>").text("unknown"),
                    $("<td>").html("<a href='" + theHref + "'" + "target='_blank'" + "class='linkBtn'>" + "Last.fm</a>"),
                    $("<td>").html("<button class='youtubeBtn'>" + "Youtube" + "</button>"),
                    $("<td>").html("<button" + "  data-id='" + i + "' class='linkBtn2'>" + "Add to Cart" + "</button>")

                );
                // Append the new row to the table

                $("#music-table > tbody").append(newRow);

            }
            // loop through table, get track and artist then call last.fm again to get the album name
            for (let i = 0; i < trackList.length; i++) {

                let artistName = artistList[i];
                let trackName = trackList[i];

                // get the album name for the track
                // have to call last.fm again to get that info
                var apiKey = "637a89984572ad6c6f2f4d364da0305e"
                let queryURL = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=" + apiKey + "&artist=" + artistName + "&track=" + trackName + "&format=json"

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    var albumName = response.track.album.title
                    var t = "albumNameID" + i
                    // console.log(album)
                    $("#" + t).text(albumName)
                    albumName = albumName.split(' ').join('+');
                    albumList.push(albumName)
                });
            }
            $(document).on("click", ".linkBtn2", function (event) {
                console.log("You clicked cart Btn");

                var cartAttr = $(this).data().id;

                arrayCart.push({
                    Song: (trackList[cartAttr]).split('+').join(' '),
                    Artist: (artistList[cartAttr]).split('+').join(' '),
                    Album: (albumList[cartAttr]).split('+').join(' '),
                })
                // console.log(arrayCart)

                for (var j = 0; j < arrayCart.length; j++) {
                    localStorage.setItem("piedPiperCart1284", JSON.stringify(arrayCart[j]));
                    // console.log(localStorage)
                    var parse = JSON.parse(localStorage.getItem("piedPiperCart1284"));
                    console.log(parse);
                }

            })
        })
    })


    $(document).on("click", ".youtubeBtn", function (event) {
        console.log("you clicked a youtube btn")

        var row = $(this).closest("tr")
        var songTitle = row.find("td:nth-child(1)");
        var artistName = row.find("td:nth-child(2)");
        var youTubeVideoID

        var newSongTitle = $(songTitle).text()
        newSongTitle = newSongTitle.split(' ').join('+');

        var youTubeApiKey = "AIzaSyBdKCyg7sttppX9lC9j18Rpdz99RddVhXA"
        var queryURL = " https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + newSongTitle + "&topicId=%2Fm%2F04rlf&type=video&key=" + youTubeApiKey;
        console.log("youTube URL: " + queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var videoIds = JSON.stringify(response.items[0].id.videoId);
            var videoLink = "https://www.youtube.com/watch?v=" + videoIds;

            youTubeVideoID = videoIds.replace(/['"]+/g, '')
            videoLink = "https://www.youtube.com/watch?v=" + youTubeVideoID;
            console.log(youTubeVideoID)
            console.log("<<>> this is the youtube link -->>>  " + videoLink)

            // var newRow2 = $("<tr>").attr('class', 'trBody').append(
            //     // $("<td>").html("<button class='youtubeBtn'>" + "Youtube" + "</button>")
            //     $("<td>").html("<a href='" + videoLink + "'" + "target='_blank'" + "class='youtubeBtn'>" + "Youtube</a>"),
            // );
            // $("#music-table > tbody").append(newRow2);


            $("#video-output").empty();
            $("<img>", {
                src: response.items[0].snippet.thumbnails.medium.url,
                width: response.items[0].snippet.thumbnails.medium.width,
                height: response.items[0].snippet.thumbnails.medium.height
            }).appendTo("#video-output");
            $("<h1></h1>").text(response.items[0].snippet.title).appendTo("#video-output");
            $("<p></p>").text(response.items[0].snippet.description).appendTo("#video-output");
            $("<li></li>").text("Published at: " + response.items[0].snippet.publishedAt).appendTo("#video-output");
            // call youtube again and get statistics on the video we found (use part=statistics

            $.getJSON("https://www.googleapis.com/youtube/v3/videos", {
                key: "AIzaSyBdKCyg7sttppX9lC9j18Rpdz99RddVhXA",
                part: "snippet,statistics",
                id: youTubeVideoID
            }, function (response) {
                $("<li></li>").text("View count: " + response.items[0].statistics.viewCount).appendTo("#video-output");
                $("<li></li>").text("Favorite count: " + response.items[0].statistics.favoriteCount).appendTo("#video-output");
                $("<li></li>").text("Like count: " + response.items[0].statistics.likeCount).appendTo("#video-output");
                $("<li></li>").text("Dislike count: " + response.items[0].statistics.dislikeCount).appendTo("#video-output");
                $("<li></li>").html("<a href='" + videoLink + "'" + "target='_blank'" + "class='btn button'>" + "YouTube LINK!</a>").appendTo("#video-output");
            });
        });
    });

})
