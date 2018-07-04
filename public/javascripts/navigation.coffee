$(document).ready =>
    $("nav .button-container").hover =>
        $("nav .bar").addClass("hidden-i")
    , =>
        $("nav .bar").removeClass("hidden-i")
    $("nav li").click ->
        $(".title-holder .alterable").text($(this).text());
