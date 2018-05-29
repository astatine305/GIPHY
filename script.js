var myGiphy = ["cat", "dog", "bird"]

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
          animalImage.addClass("giphyImage")
          animalImage.attr("data-state", "still");
          animalImage.attr("data-still", staticSrc);
          animalImage.attr("data-animate", animatedSrc);

          // Setting the default src attribute of the image to a property pulled off the result item
          animalImage.attr("src", staticSrc);

          // Appending the paragraph and image tag to the animalDiv
          
          animalDiv.append(animalImage);
          animalDiv.append(p);

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



























// $(".giphBtn").on("click", function(){
//     var searchTerm = $(this).attr("data-name");
//     var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=i7Qpgk7s3Eds4hBQ4FLFsh6X1Hwz2xFF&tag="+ searchTerm
//     +"&limit=10"

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       })

//       .then(function(response) {

//           var results = response.data;

//           for (var i = 0; i < results.length; i++) {

//             // Creating and storing a div tag
//             var animalDiv = $("<div>");

//             // Creating a paragraph tag with the result item's rating
//             var p = $("<p>").text("Rating: " + results[i].rating);

//             // Creating and storing an image tag
//             var animalImage = $("<img>");
//             // Setting the src attribute of the image to a property pulled off the result item
//             animalImage.attr("src", results[i].images.fixed_height.url);

//             // Appending the paragraph and image tag to the animalDiv
//             animalDiv.append(p);
//             animalDiv.append(animalImage);

//             // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
//             $("#myAnimals").prepend(animalDiv);
//           }
//         });

        
// });

