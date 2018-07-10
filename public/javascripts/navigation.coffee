$(document).ready =>
    $("nav#pages").css "left", "-80px"
    $("nav#user-nav").css "right", "-80px"
    navLeftOpen = false;
    navRightOpen = false;
    $("#nav-button-left").click =>
        if navLeftOpen then $("nav#pages").css "left", "-80px"
        else $("nav#pages").css "left", "0px"
        navLeftOpen = !navLeftOpen
    $("#nav-button-right").click =>
        if navRightOpen then $("nav#user-nav").css "right", "-80px"
        else $("nav#user-nav").css "right", "0px"
        navRightOpen = !navRightOpen    
    $("nav .button-container").hover =>
        $("nav .bar").addClass("hidden-i")
    , =>
        $("nav .bar").removeClass("hidden-i")
    $("nav#pages li").click ->
        $(".center-bar .alterable").text($(this).text())
    showPageOpen = false;
    $("#user-nav .profile").click =>
        if !showPageOpen then $("section.form-container").addClass("form-visible")
        else $("section.form-container").removeClass("form-visible")
        showPageOpen = !showPageOpen
    $("#form .close").click =>
        $("section.form-container").removeClass("form-visible")
        showPageOpen = false;
