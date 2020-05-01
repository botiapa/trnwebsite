//  Loading screen animation
var loadingStep = 1;
var numOfSteps = 5;

var obj = document.getElementById("loading-screen");
obj.style.setProperty("background-color", rainbow(numOfSteps, 1))
animateLoading(numOfSteps, 1)
function animateLoading(numOfSteps, step) {
    window.setTimeout(function() {
        obj.style.setProperty("background-color", rainbow(numOfSteps, step+1));
        if(step < numOfSteps)
            animateLoading(numOfSteps, step + 1)
    }, 3000)
}

function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

window.onload = function() {
    window.setTimeout(function() {
        document.getElementById("loading-screen").style.setProperty("display", "none");
        document.getElementById("main").style.setProperty("display", "block");
    }, 500)
}