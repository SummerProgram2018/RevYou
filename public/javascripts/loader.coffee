$(document).ready =>
    $("body").css "overflow-y", "hidden"
    $(document).imagesLoaded().progress (instance, image) =>
    .done =>
        setTimeout () =>
            $("body").css "overflow-y", "auto"
            $("#loader").addClass "hidden"
        , 10
    $("body").css "overflow-y", "auto"
    $("#loader").addClass "hidden"