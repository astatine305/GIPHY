var myGiphy = ["cat", "dog", "bird"];

function renderButtons() {

    $("#myAnimals").empty();

    for (var i = 0; i < myGiphy.length; i++ ) {
        $("#myAnimals").append("<button class='giphBtn' data-name='"+ myGiphy[i]+"'>" + myGiphy[i] + "</button>");
      }
}

$("#addBtn").on("click", function() {
    event.preventDefault();

    var newAnimal = $("#animal").val().trim();
    if (myGiphy.indexOf(newAnimal) ===-1 && myGiphy !== "") {
        myGiphy.push(newAnimal);
    }
    renderButtons();
    $("#animal").val("");
    getGiphy();    
    
});

renderButtons();

function getGiphy() {
$(".giphBtn").on("click", function() { // START ON CLICK
   // Grabbing and storing the data-animal property value from the button
    $("#myDisplay").empty();
    var animal = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          var animalDiv = $("<div>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          var animalImage = $("<img>");
          var staticSrc = results[i].images.fixed_height_still.url;
          var animatedSrc = results[i].images.fixed_height.url;
          var download = $("<a>");
          var icon = $("<i>");
          download.attr("href", animatedSrc);
          download.attr("download", "myGif.gif");
          icon.addClass("fas fa-angle-double-down");
          animalDiv.attr("data-name", staticSrc);
          animalImage.addClass("giphyImage");
          animalImage.attr("data-state", "still");
          animalImage.attr("data-still", staticSrc);
          animalImage.attr("data-animate", animatedSrc);

          // Setting the default src attribute of the image to a property pulled off the result item
          animalImage.attr("src", staticSrc);

          // Appending the paragraph and image tag to the animalDiv
          
          animalDiv.append(animalImage);
          // animalDiv.append(p);
          animalDiv.append(p.append(download.append(icon)));

          // Prependng the animalDiv to the HTML page in the "#myDisplay" div
          $("#myDisplay").prepend(animalDiv);

        }
      });

  }); //END ON CLICK
};

function playGifs() {
    var state = $(this).attr("data-state");
   if (state === "still") {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
   } else {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still");
}
}

$(document).on("click", ".giphyImage", playGifs);

getGiphy();






