$(document).ready(function () {
    let id;
    let body;

    // Save Article Function 
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

    // Save button click function
    $(".save").on("click", function () {
        event.preventDefault();
        id = $(this).attr("data-id");
        // console.log(id);
        saveArticle();
    });

    // Add Note Function
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

    // On Submit Comment
    $(".comment").on("submit", function (event) {
        event.preventDefault();
        id = $(this).attr("data-id");
        body = $(this).find("textarea").val();
        // console.log(id + "\n" + body);
        postNote();
    });

    // Delete Comment Function
    function deleteNote() {
        $.ajax({
            method: "DELETE",
            url: "/notes/" + id
        }).then(() => {
            location.reload();
        });
    };

    // Delete Comment Button
    $(".delComment").on("click", function (event) {
        event.preventDefault();
        id = $(this).attr("data-id");
        // console.log(id);
        deleteNote();
    });

    // Delete Article Function
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

    // Delete Article Button
    $(".delete").on("click", function (event) {
        event.preventDefault();
        id = $(this).attr("data-id");
        // console.log(id);
        deleteArticle();
    });
});