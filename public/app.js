$(document).ready(function() {

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

    $(".clear").on("click", function () {
       $(".article-container").empty();
    });
});
