(function() {
    let body = $("body");
    let container = $("#container");
    let span = $("span");
    let light = $("#light");
    let dark = $("#dark");
    let random = $("#random");
    let backgroundColor = localStorage.getItem("backgroundColor");
    let color = localStorage.getItem("color");

    body.css({
        background: backgroundColor,
        color: color
    });

    span.css({
        border: `2px solid ${color}`
    });
    let transition = "all 0.25s ease-in-out";

    // STYLING FOR LIGHT THEME
    light.on("click", () => {
        localStorage.setItem("backgroundColor", "#cbf1f5");
        localStorage.setItem("color", "black");
        body.css({
            background: localStorage.getItem("backgroundColor"),
            color: localStorage.getItem("color"),
            transition: transition
        });
        span.css({
            border: `2px solid ${localStorage.getItem("color")}`,
            transition: transition
        });
    });

    // STYLING FOR DARK THEME
    dark.on("click", () => {
        localStorage.setItem("backgroundColor", "#18284a");
        localStorage.setItem("color", "#f0f0f0");
        transition;

        body.css({
            background: localStorage.getItem("backgroundColor"),
            color: localStorage.getItem("color"),
            transition: transition
        });
        span.css({
            border: `2px solid ${localStorage.getItem("color")}`,
            transition: transition
        });
    });

    // random color generator funtion

    // random.addEventListener("mouseup", function() {
    //     colorChange();
    // });

    // STYLING FOR RANDOM THEME
    random.on("click", () => {
        function getRandomNumber(num) {
            return Math.floor(Math.random() * num);
        }
        let colorChange = () => {
            var r = getRandomNumber(256),
                g = getRandomNumber(256),
                b = getRandomNumber(256);
            var randomColor = "rgb(" + r + "," + g + "," + b + ")";
            return randomColor;
        };
        var newBackgroundColor = colorChange();
        var newColor = colorChange();
        localStorage.setItem("backgroundColor", newBackgroundColor);
        localStorage.setItem("color", newColor);
        transition;
        body.css({
            background: localStorage.getItem("backgroundColor"),
            color: localStorage.getItem("color")
        });
        span.css({
            border: `2px solid ${localStorage.getItem("color")}`
        });
    });
})();
