$(document).ready =>
    $("body").css "overflow-y", "hidden"
    if $("img").length != 0
        $(document).imagesLoaded().progress (instance, image) =>
            .done =>
                setTimeout =>
                    $("body").css "overflow-y", "auto"
                    $("#loader").addClass "hidden"
                , 100
    else
        $("body").css "overflow-y", "auto"
        $("#loader").addClass "hidden"