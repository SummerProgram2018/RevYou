$(document).ready =>
    rgb = null # todo: Read from file.
    if (!rgb) then rgb = "#ee6c30"
    $(".theme-selec li").click ->
        rgb = $(this).css("background-color")
        $(".dt-text").css("color", rgb)
        $(".dt-bg").css("background-color", rgb)
        $(".dt-border").css("border-color", rgb)
    
    setStyle = (e) =>
        for elem in e
            elem = $(elem)
            if elem.hasClass("dt-texth") then elem.css("color", rgb)
            if elem.hasClass("dt-bgh") then elem.css("background-color", rgb)
            if elem.hasClass("dt-borderh") then elem.css("border-color", rgb)

    resetStyle = (elem) =>
        if elem.hasClass("dt-texth") then elem.css("color", "")
        if elem.hasClass("dt-bgh") then elem.css("background-color", "")
        if elem.hasClass("dt-borderh") then elem.css("border-color", "")
    
    $(".dt-hover").hover ->
        if (!rgb) then return
        setStyle($(this))
        if $(this).hasClass("dt-hover-children")
            setStyle($(this).children())
    , ->
        resetStyle($(this))
        if $(this).hasClass("dt-hover-children") then resetStyle($(this).children())
        else resetStyle($(this))


        