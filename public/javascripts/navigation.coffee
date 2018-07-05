$(document).ready =>
    $("nav").css "left", "-80px"
    navOpen = false;
    $("#nav-button").click =>
        if navOpen then $("nav").css "left", "-80px"
        else $("nav").css "left", "0px"
        navOpen = !navOpen
    $("nav .button-container").hover =>
        $("nav .bar").addClass("hidden-i")
    , =>
        $("nav .bar").removeClass("hidden-i")
    $("nav li").click ->
        $(".title-holder .alterable").text($(this).text());
