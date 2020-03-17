$(document).ready(function () {
    let id;
    let body;

    function saveArticle() {
        $.ajax({
            method: "PUT",
            url: "/articles/" + id,
            data: {
                saved: true
            }
        }).then(function () {
            location.reload();
        });
    };

    $(".save").on("click", function () {
        event.preventDefault();
        id = $(this).attr("data-id");
        // console.log(id);
        saveArticle();
    });

    function postNote() {
        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: {
                body: body
            }
        }).then(function () {
            location.reload();
        });
    };

    $(".comment").on("submit", function (event) {
        event.preventDefault();
        id = $(this).attr("data-id");
        body = $(this).find("textarea").val();
        // console.log(id + "\n" + body);
        postNote();
    });

    function deleteNote() {
        $.ajax({
            method: "DELETE",
            url: "/notes/" + id
        }).then(() => {
            location.reload();
        });
    };

    $(".delComment").on("click", function (event) {
        event.preventDefault();
        id = $(this).attr("data-id");
        // console.log(id);
        deleteNote();
    });

    function deleteArticle() {
        $.ajax({
            method: "PUT",
            url: "/articles/" + id,
            data: {
                saved: false
            }
        }).then(function () {
            location.reload();
        });
    };

    $(".delete").on("click", function (event) {
        event.preventDefault();
        id = $(this).attr("data-id");
        // console.log(id);
        deleteArticle();
    });
});