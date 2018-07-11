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
        if !showPageOpen
            $(".form-container, .form-container .dynamic-form.login-form").addClass("form-visible")
        else
            $(".form-container, .form-container .dynamic-form").removeClass("form-visible")
        showPageOpen = !showPageOpen
    $(".form-container .close, .form-container .clickable-bg").click =>
        $(".form-container, .form-container .dynamic-form").removeClass("form-visible")
        showPageOpen = false;
