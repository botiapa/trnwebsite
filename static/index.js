//  GLOBALS

var animated = [".member", ".card", ".twitch-frame"];

//  MAIN
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

$(window).on("scroll touchmove", function() {
    interpolatedBackground("#players-block", {r:32,g:32,b:32,a:255}, {r:55,g:55,b:55,a:255});
    interpolatedBackground("#merch-block", {r:25,g:26,b:54,a:255}, {r:31,g:32,b:65,a:255});

    checkAnimation();
});

function interpolatedBackground(id, color1, color2) {
    var total = $(id).height();
    var bottom = $(id).position().top + $(id).height();
    var scrollElem = $((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    if(scrollElem.scrollTop() >= $(id).position().top 
    && scrollElem.scrollTop() <= bottom) {
        var t = (bottom - scrollElem.scrollTop()) / total; // Remaining height / total = t
        var col = colorInterpolation(
            color2, //FROM
            color1, //TO
            t
        );
        $(id).css('background-color', colorToString(col));
    }
}

function colorInterpolation(a, b, t) {
    var retr = a.r + (b.r - a.r) * t;
    var retg = a.g + (b.g - a.g) * t;
    var retb = a.b + (b.b - a.b) * t;
    var reta = a.a + (b.a - a.a) * t;
    return {r:retr,g:retg,b:retb,a:reta}
}

function colorToString(color) {return `rgba(${color.r},${color.g},${color.b},${color.a})`}


function isElementInViewport(elem) {
    var $elem = $(elem);

    var scrollElem = $((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = scrollElem.scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

function isElementCloserToBottom(elem) {
    var scrollElem = $((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = scrollElem.scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    var elemTop = Math.round( elem.offset().top );
    var distanceToViewportTop = Math.abs(viewportTop - elemTop);
    var distanceToViewportBottom = Math.abs(viewportBottom - elemTop);
    return distanceToViewportTop > distanceToViewportBottom;

}

function checkAnimation() {
    animated.forEach(function(item) {
        if(item.startsWith(".")){
            var objects = $(item);
            $.each(objects, function(key,obj) {
                var obj = $(obj);
                doAnimation(obj);
            });
        }
        else if(item.startsWith("#")) {
            var obj = $(item);
            doAnimation(obj);
        }
        else {
            console.log(`Error elem(s) not found: ${item}`)
        }
    })
}

function doAnimation(obj) {
    if (obj.hasClass('appear')) return;
    if(!isElementCloserToBottom(obj)) { // If the user is scrolling upwards, don't play the animation
        obj.addClass('appear');
    }
    obj.css("transform", "translateX(-125%)");
    if (isElementInViewport(obj)) 
        obj.addClass('appear');
    obj.css("transform", "translateX(0)");
}