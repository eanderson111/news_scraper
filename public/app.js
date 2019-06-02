// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    if (i>20) {
    // Display the apropos information on the page
    // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    var newsCard = $("<div>")
    .addClass("card")
    .attr ("data-id", data[i]._id)
    .appendTo($("#articles"));
    
    var cardHeader = $("<div>")
    .attr("class", "card-header")
    .appendTo(newsCard);
    
    var text = $("<h5>")
    .appendTo(cardHeader)
    .attr("data-id", data[i]._id);
    
    var link = $("<a/>")
    .attr("class", "article-link")
    .attr("target", "_blank")
    .attr("rel", "noopener noreferrer")
    .attr("href", data[i].link)
    .text(data[i].title)
    .appendTo(text)
    
    var button = $("<button>")
    .attr("class", "btn btn-success save")
    .attr("id", "note-button")
    .attr("type", "button")
    .attr("data-id", data[i]._id)
    .text("Add a note")
    .appendTo(text)
  }
  }
});


// Whenever someone clicks a add a note tag
$(document).on("click", "button", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  console.log(thisId)
  
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // $('#myModal').modal('show').on('shown.bs.modal', function() {
      //   $('#noteText').html("")
      //   console.log("register modal")
  
      // $.each(thisId, function(i)
      // {
      // var title = $('<h2>')
      //       .text(data.title)
      //       .appendTo($('#noteText'));
      
      //  var aaa = $('<input>')
      //       .attr('id', 'titleinput')
      //       .attr('name', 'title')
      //       .appendTo(title);

      //       var textToEnter = $('<textarea>')
      //       .attr('id', 'bodyinput')
      //       .attr('name', 'body')
      //       .appendTo(aaa);

      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' placeholder='enter note title here' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body' placeholder='enter note text here'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
      });
    });

//     });
// });




// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
