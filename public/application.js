$(document).ready(function() {

    $(document).on("click", ".comment", function() {
        $("#comments").empty();
        var commentId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/articles/" + commentId
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
        $.get("/clear").then(function(res) {
            res.render("clear");
        });
    });

    $(".save").on("click", function () {
        var articleId = $(".card-id").data("id");

        $.ajax({
            method: "PUT",
            url: "/articles/" + articleId,
            data: {
                title: $(".article-link").text(),
                link: $(".article-link").attr("href"),
                summary: $(".summary").text(),
                saved: true
            }
        }).then(function(data) {
           if (data.saved === true) {
                console.log("Article Saved: ", data.title);
           }
        })

    });

});
