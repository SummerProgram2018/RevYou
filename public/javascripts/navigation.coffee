$(document).ready =>
    $("nav .button-container").hover =>
        $("nav .bar").addClass("hidden-i")
    , =>
        $("nav .bar").removeClass("hidden-i")
