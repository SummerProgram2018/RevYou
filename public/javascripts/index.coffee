$(document).ready =>
    $(window).scroll =>
        winTop = $(window).scrollTop()
        $("header#index .background-holder").css("opacity", 1 - winTop / 1000)
    $("#index .title h1").click =>
        window.location.href = "review/site/0"