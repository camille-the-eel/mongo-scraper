$(document).ready(function() {

    $(document).on("click", ".comment", function() {
        $("#comments").empty();
        var dataId = $(".card-id").data();
        var articleId = dataId._id;
  
        $.ajax({
            method: "GET",
            url: "/articles/" + articleId
        }).then(function(data) {
            console.log(data);
            $("#comments").append("<h4 id='h4-comment'>Comment Title</h4>");
            $("#comments").append("<input id='titleinput' name='title' >");
            $("#comments").append("<h4 id='h4-body'>Comment</h4>");
            $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>SAVE</button>");

            if (data.comment) {
                $("#titleinput").val(data.comment.title);
                $("#bodyinput").val(data.comment.body);
            }
        });
    });

    $(".save").on("click", function () {
        var dataId = $(".card-id").data();
        var articleId = dataId._id;

        $.ajax({
            method: "PUT",
            url: "/articles/saved/" + articleId,
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
