(function ($) {
    "use strict";
    $(".sakura-falling").sakura();
})(jQuery);

var weddingDate = new Date("June 4, 2026 05:00:00").getTime();
var countdownEl = document.getElementById("time");

function renderCountdown() {
    var now = new Date().getTime();
    var distance = weddingDate - now;

    if (distance < 0) {
        countdownEl.innerHTML = "<p class='quote'>Today is the day. Please bless the couple for a joyful married life.</p>";
        return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML =
        "<div class='count-grid'>" +
        "<div class='time-box'><strong>" + days + "</strong><span>Days</span></div>" +
        "<div class='time-box'><strong>" + hours + "</strong><span>Hours</span></div>" +
        "<div class='time-box'><strong>" + minutes + "</strong><span>Minutes</span></div>" +
        "<div class='time-box'><strong>" + seconds + "</strong><span>Seconds</span></div>" +
        "</div>";
}

renderCountdown();
setInterval(renderCountdown, 1000);

var audio = document.getElementById("my_audio");
var autoplayFallbackBound = false;

function tryAutoplay() {
    if (!audio) {
        return;
    }

    var playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
            // Some mobile browsers block autoplay with sound until first user interaction.
            if (autoplayFallbackBound) {
                return;
            }
            autoplayFallbackBound = true;

            var startOnFirstTap = function () {
                audio.play();
                document.removeEventListener("click", startOnFirstTap);
                document.removeEventListener("touchstart", startOnFirstTap);
            };

            document.addEventListener("click", startOnFirstTap, { once: true });
            document.addEventListener("touchstart", startOnFirstTap, { once: true });
        });
    }
}

// Trigger autoplay in multiple phases for better cross-browser reliability.
tryAutoplay();
document.addEventListener("DOMContentLoaded", tryAutoplay);
window.addEventListener("load", tryAutoplay);
if (audio) {
    audio.addEventListener("canplaythrough", tryAutoplay, { once: true });
}
