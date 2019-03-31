$(document).ready(function() {

    $.getJSON("/articles", function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#article-container").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
    })

    $(document).on("click", ".comment", function() {
        $("#comments").empty();
        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        }).then(function(data) {
            console.log(data);
            $("#comments").append("<h3>" + data.title + "</h3>");
            $("#comments").append("<input id='titleinput' name='title' >");
            $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#comments").append("<button data-id='" + data._id + "' id='savenote>SAVE NOTE</button>");

            if (data.comment) {
                $("#titleinput").val(data.comment.title);
                $("#bodyinput").val(data.comment.body);
            }
        });
    });

    $(".clear").on("click", clearArticles);

    function clearArticles() {
        $.get("api/clear").then(function() {
        article-container.empty();
        });
    }
});
