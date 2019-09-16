// $(document).ready(function () {

//     function clear() {
//         $("#music-table-body").empty();
//     }

// $("searchBtn").on("click", function (event) {
//     event.preventDefault();
//     clear();
//     console.log("The submit button was clicked!");
//     var songString = $("#inputSearch").val().trim();
//     var newSongString = songString.split(' ').join('+');
//     console.log("newSongString: " + newSongString)
//     // API Calls to Last.FM

//     var title = newSongString

//     var apiKey = "637a89984572ad6c6f2f4d364da0305e"

//     var queryURL = "http://ws.audioscrobbler.com/2.0/?method=track.search" + "&limit=5" + "&track=" + title + "&api_key=" + apiKey + "&format=json"
//     console.log("queryURL: " + queryURL)
//     var trackList = [];
//     var artistList = [];
//     var albumList = [];
//     // placeholder for the youtube song string
//     var topTitleMatch = newSongString
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         // take first best match and put it in the variable that we will use for the youtube api
//         topTitleMatch = response.results.trackmatches.track[0].name
//         console.log(response);
//         console.log(response.results.trackmatches.track[0].name);
//         console.log(response.results.trackmatches.track[0].artist);

//         for (var i = 0; i < 5; i++) {

//             var theHref = response.results.trackmatches.track[i].url
//             console.log("<a href='" + theHref + "'" + "class='btn btn-default'>" + "LINK!</a>")

//             var artistName = response.results.trackmatches.track[i].artist
//             artistName = artistName.split(' ').join('+');
//             var trackName = response.results.trackmatches.track[i].name
//             trackName = trackName.split(' ').join('+');
//             trackList.push(trackName)
//             artistList.push(artistName)

//             // Create the new row
//             var newRow = $("<tr>").append(
//                 $("<td>").text(response.results.trackmatches.track[i].name).attr('id', 'trackID' + i),
//                 $("<td>").text(response.results.trackmatches.track[i].artist).attr('id', 'artistID' + i),
//                 $("<td>").text("unknown").attr('id', 'albumNameID' + i),

//                 $("<td>").html("<a href='" + theHref + "'" + "target='_blank'" + "class='btn button'>" + "Last.fm LINK!</a>")
//             );
//             // Append the new row to the table

//             $("#music-table > tbody").append(newRow);

//         }
//         // loop through table, get track and artist then call last.fm again to get the album name
//         for (let i = 0; i < trackList.length; i++) {

//             let artistName = artistList[i];
//             let trackName = trackList[i];

//             console.log("--new track name: " + trackName)
//             console.log("--new artist name: " + artistName)
//             // get the album name for the track
//             // have to call last.fm again to get that info
//             var apiKey = "637a89984572ad6c6f2f4d364da0305e"
//             let queryURL = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=" + apiKey + "&artist=" + artistName + "&track=" + trackName + "&format=json"
//             console.log("url to get track info: " + queryURL)
//             $.ajax({
//                 url: queryURL,
//                 method: "GET"
//             }).then(function (response) {
//                 console.log("XX-- second call to last.fm to get album name")
//                 console.log(response)
//                 var albumName = response.track.album.title
//                 console.log("album name: " + albumName)
//                 var t = "albumNameID" + i
//                 console.log("t = " + t)
//                 $("#" + t).text(albumName)
//                 albumName = albumName.split(' ').join('+');
//                 albumList.push(albumName)
//             });
//         }
//     });
//     });

// $(document).on("click", "#music-table tr", function (event) {
//     console.log("you clicked a table row!")
//     var row = $(this).closest("tr")
//     var songTitle = row.find("td:nth-child(1)");
//     console.log("song title: " + $(songTitle).text())
//     var artistName = row.find("td:nth-child(2)");
//     console.log("artist name: " + $(artistName).text())
//     // Call the youtube api here
//     // Get ONE video url from youtube!
//     // We don't need multiple results.  We just need the top matching result.
//     // put the url in the href variable
//     var newSongTitle = $(songTitle).text()
//     newSongTitle = newSongTitle.split(' ').join('+');
//     var youTubeApiKey = "AIzaSyBdKCyg7sttppX9lC9j18Rpdz99RddVhXA"
//     var queryURL = " https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + newSongTitle + "&topicId=%2Fm%2F04rlf&type=video&key=" + youTubeApiKey;
//     console.log("youTube URL: " + queryURL)
//     var youTubeVideoID
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         var videoIds = JSON.stringify(response.items[0].id.videoId);
//         var videoLink = "https://www.youtube.com/watch?v=" + videoIds;
//         console.log("--- Response from youtube ---")
//         console.log(response)

//         console.log(response.items[0].snippet.title);
//         console.log(videoIds.replace(/['"]+/g, ''));
//         youTubeVideoID = videoIds.replace(/['"]+/g, '')
//         console.log("-- you tube video id: " + youTubeVideoID)
//         videoLink = "https://www.youtube.com/watch?v=" + youTubeVideoID;
//         console.log("<<>> this is the youtube link -->>>  " + videoLink)
//         // clear the video output div
//         $("#video-output").empty();
//         // let's put a pile of data in the video-output div
//         $("<img>", {
//             src: response.items[0].snippet.thumbnails.medium.url,
//             width: response.items[0].snippet.thumbnails.medium.width,
//             height: response.items[0].snippet.thumbnails.medium.height
//         }).appendTo("#video-output");
//         $("<h1></h1>").text(response.items[0].snippet.title).appendTo("#video-output");
//         $("<p></p>").text(response.items[0].snippet.description).appendTo("#video-output");
//         $("<li></li>").text("Published at: " + response.items[0].snippet.publishedAt).appendTo("#video-output");
//         // call youtube again and get statistics on the video we found (use part=statistics

//         console.log("youTube video id: " + youTubeVideoID)
//         $.getJSON("https://www.googleapis.com/youtube/v3/videos", {
//             key: "AIzaSyBdKCyg7sttppX9lC9j18Rpdz99RddVhXA",
//             part: "snippet,statistics",
//             id: youTubeVideoID
//         }, function (response) {
//             $("<li></li>").text("View count: " + response.items[0].statistics.viewCount).appendTo("#video-output");
//             $("<li></li>").text("Favorite count: " + response.items[0].statistics.favoriteCount).appendTo("#video-output");
//             $("<li></li>").text("Like count: " + response.items[0].statistics.likeCount).appendTo("#video-output");
//             $("<li></li>").text("Dislike count: " + response.items[0].statistics.dislikeCount).appendTo("#video-output");
//             $("<li></li>").html("<a href='" + videoLink + "'" + "target='_blank'" + "class='btn button'>" + "YouTube LINK!</a>").appendTo("#video-output");
//         });  // the second youtube ajax call
//     });  // the youtube ajax call
// });  // the you tube link click event

// })

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

    //---------------------MODAL---------------------//
    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

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
                    $("<td>").html("<button class='youtubeBtn'>" + "Youtube" + "</button>")
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

                    $("#" + t).text(albumName)
                    albumName = albumName.split(' ').join('+');
                    albumList.push(albumName)
                });
            }
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
