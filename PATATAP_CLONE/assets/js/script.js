// Check off Specific todos By Clicking
// .on will add listeners for all future elements but will only add to existing elements (that are there the first time the code is run) - in this case the ul that contains the li (list) elements
$("ul").on("click", "#listItem", function() {
    $(this).toggleClass("completed");
});

// Click on X to delete todo
$("ul").on("click", "span", function(e) {
    $(this) // 'this' here refers to the span
        .parent()
        .fadeOut(500, function() {
            $(this).remove(); // 'this' here refers to li not the span
        });
    e.stopPropagation();
});

// opens up add item input field
$(".fa-plus").click(function() {
    $("input[type='text']").fadeToggle();
});

$("input[type='text']").keypress(function() {
    if (event.which === 13) {
        // grabbign new todo text from input
        var todoText = $(this).val();
        // empties input field when user presses enter
        $(this).val(" ");
        //create a new li and add to ul
        $("ul").append(
            "<li id='listItem'><span id='delete'><i class='far fa-trash-alt'></i></span>" +
                todoText +
                "</li>"
        );
    }
});
