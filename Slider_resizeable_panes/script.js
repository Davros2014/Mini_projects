// left-right

var dragMe = false;
$(".bar").on("mousedown", function(e) {
    e.preventDefault(); //prevents targeting all elements
    dragMe = true;
});
$(".container").on("mousemove", function(e) {
    var mouseX = e.clientX - 10; // to centre the mouse in the bar

    if (dragMe) {
        $(".bar").css({
            left: mouseX + "px"
        });
        $("#top").css({
            width: mouseX + "px"
        });
    }
});

$(".container").on("mouseup", function() {
    dragMe = false;
});

// top-bottom

var draggable = false;
$(".bar2").on("mousedown", function(e) {
    e.preventDefault();
    draggable = true;
});
$(".container2").on("mousemove", function(e) {
    var mouseY = e.clientY - 10;
    if (draggable) {
        $(".bar2").css({
            top: mouseY + "px"
        });
        $("#top2").css({
            height: mouseY + "px"
        });
    }
});
$(".container2").on("mouseup", function() {
    draggable = false;
});
