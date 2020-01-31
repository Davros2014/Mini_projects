(function() {
    var images = document.getElementsByClassName("images"),
        dots = document.getElementsByClassName("dot"),
        navLogo = document.getElementsByClassName("navLogo"),
        title = document.getElementsByClassName("title"),
        description = document.getElementsByClassName("description"),
        current = 0,
        timer,
        transitionComplete = true;

    // holds opening image on screen for 2s before first transition
    setTimeout(moveImages, 2000);

    document.addEventListener("transitionend", function(e) {
        // transitionend event occurs when a CSS transition has completed
        // webkitTransitionEnd for Safari 3.1 to 6.0
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit");
            console.log("Transition complete - the current image is ", current);
            timer = setTimeout(moveImages, 5000);
            transitionComplete = false;
        }
    });

    // iife starts loop through dots automatically
    for (var i = 0; i < dots.length; i++) {
        (function(i) {
            dots[i].addEventListener("click", function(e) {
                if (current == i) {
                    e.target.classList.remove("on");
                    return;
                }
                if (transitionComplete) {
                    return;
                }
                // cancels scheduled incoming image
                clearTimeout(timer);
                moveImages(i);
            });
        })(i);
    }

    // declare function to move images and navigation dots
    function moveImages(next) {
        console.log("the current image is " + current);
        images[current].classList.remove("onscreen");
        // removes onscreen class to current image class
        dots[current].classList.remove("on");
        // dots[current - 1].classList.add("off");
        navLogo[current].classList.remove("on");
        images[current].classList.remove("intro");
        title[current].classList.remove("textAnimate");
        description[current].classList.remove("textAnimateUp");
        // removes on class from current dot class
        images[current].classList.add("exit");
        // add exit class to current image

        transitionComplete = true;

        current++; // current start at zero, 1 is added on each pass through
        if (current >= images.length) {
            // resets image number back to zero if current exceeds number of images!
            current = 0;
        }
        // if next is greater than or equal to zero, assign the value of next to current
        if (next >= 0) {
            current = next;
        }
        description[current].classList.add("textAnimateUp");
        title[current].classList.add("textAnimate");
        dots[current].classList.add("on");
        navLogo[current].classList.add("on");

        // adds on class to the next dot class
        images[current].classList.add("onscreen");
        console.log("The next image is ", current);
        // adds onscreen class to the next one
    }
})(); // end iife
