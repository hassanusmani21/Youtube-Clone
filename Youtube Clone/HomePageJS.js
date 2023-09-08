
// const API = "AIzaSyDs8Ilqm1li - AkJXoV3wsHywwnQUn0iD6c";
const API = "AIzaSyBc0v12Ts9NOlGMLXGINI8yJgbWjPsM6Bs";
let count = 0;

const SearchMovies = async () => {
  count++;
  let q = $("#query").val();
  try {
    const fetchData = await $.ajax({
      url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${q}%202&key=${API}`,
      method: "GET"
    });
    if (!fetchData.ok) {
      throw new Error(`HTTP error! status: ${fetchData.status}`);
    }
    const res = await fetchData.json();
    if (res.items === undefined) {
      throw new Error("Response data structure is incorrect!");
    }
    appendVideo(res.items);
    console.log(res.items);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

const Recommended = async () => {
    if (count == 0) {
      let q = $("#query").val();
      try {
        const fetchData = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${q}%202&key=${API}`);
        if (!fetchData.ok) {
          throw new Error(`HTTP error! status: ${fetchData.status}`);
        }
        const res = await fetchData.json();
        if (res.items === undefined) {
          throw new Error("Response data structure is incorrect!");
        }
        appendVideo(res.items);
        console.log(res.items);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
  };
  
Recommended();


function appendVideo(Data) {
    // Select the #VideoShow element and add the "grid-layout" class to it
    let movies_show = $("#VideoShow");
    movies_show.addClass("grid-layout");
    movies_show.empty(); // Clear the innerHTML of the element

    // Loop through each video in the data and create a new div element for it
    $.each(Data, function(index, {id: {videoId}, snippet: {title, thumbnails}}) {
        let div = $("<div>");

        // Create a new image element and set its attributes to display the video thumbnail
        let img = $("<img>");
        img.addClass("Thumnail");
        img.attr("src", thumbnails.high.url);
        img.css("width", "100%");

        // Create a new iframe element and set its attributes to display the video
        let iframe = $("<iframe>");
        iframe.attr("src", `https://www.youtube.com/embed/${videoId}`);
        iframe.css("aspect-ratio", "16/9");

        // Create a new paragraph element to display the video title
        let p = $("<p>");
        p.text(title);

        // Append the image and paragraph elements to the div element
        div.append(img, p);

        // Append the div element to the #VideoShow element
        movies_show.append(div);

        // Create a data object containing the video ID and title
        let data = {
            videoId,
            title
        };

        // Add an onclick event handler to the div element that calls the YoutubeVideos function with the data object
        div.on("click", function() {
            YoutubeVideos(data);
        });
    });
}

// Define the YoutubeVideos function that stores the video data in localStorage and navigates to the video.html page
let YoutubeVideos = function(data) {
    localStorage.setItem("Video", JSON.stringify(data));
    window.location.href = "video.html";
};


// {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/nWv0c7UWS1E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}


