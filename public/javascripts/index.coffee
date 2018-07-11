$(document).ready =>
    $(window).scroll =>
        winTop = $(window).scrollTop()
        $("header#index .background-holder").css("opacity", 1 - winTop / 1000)