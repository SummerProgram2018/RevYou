submitData = (route, data) =>
    $.ajax
        url: route
        type: 'POST'
        data: data
$(document).ready =>
    submitData("/user/getSessionId", {}).then (res) =>
        if res
            $("nav li.login p").text("Sign Out")
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
        $("form.search-form .product-type").val($(this).text().trim().toLowerCase())
    showPageOpen = false;
    $("#user-nav .login").click =>
        submitData("/user/getSessionId", {}).then (res1) =>
            if res1
                submitData("/user/logout", {}).then (res2) =>
                    if res2
                        location.reload()
            else
                if !showPageOpen
                    $(".form-container, .form-container .dynamic-form.login-form").addClass("form-visible")
                else
                    $(".form-container, .form-container .dynamic-form").removeClass("form-visible")
                showPageOpen = !showPageOpen
    $("nav li.home").click =>
        window.location.href = "/";
    themeVisible = false;
    $("nav .themes").click =>
        $(".form-container, .form-container .dynamic-form").removeClass("form-visible")
        if themeVisible then $(".theme-selec-container").removeClass("form-visible")
        else $(".theme-selec-container").addClass("form-visible")
        themeVisible = !themeVisible
    $(".theme-selec-container, .theme-selec-container .close").click =>
        $(".theme-selec-container").removeClass("form-visible")
        themeVisible = false
    $("nav .profile").click =>
        submitData("/user/getSessionId", {}).then (res) =>
            if res
                window.location.href = "/profile/" + res