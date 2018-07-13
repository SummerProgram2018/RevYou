submitData = (route, data) =>
    $.ajax
        url: route
        type: 'POST'
        data: data

$(document).ready =>
    $(".form-container .close, .form-container .clickable-bg").click =>
        $(".form-container, .form-container .dynamic-form").removeClass("form-visible")
        showPageOpen = false;
    $(".form-container .dynamic-form.login-form .register").click =>
        $(".form-container, .form-container .dynamic-form").removeClass("form-visible")
        $(".form-container, .form-container .dynamic-form.register-form").addClass("form-visible")
    $(".form-container .dynamic-form.register-form .login").click =>
        $(".form-container, .form-container .dynamic-form").removeClass("form-visible")
        $(".form-container, .form-container .dynamic-form.login-form").addClass("form-visible")
    $("#review .buttons .add-review").click =>
        submitData("/user/getSessionId", {}).then (res) =>
            if res
                $(".form-container, .form-container .dynamic-form").removeClass("form-visible")
                $(".form-container, .form-container .dynamic-form.add-review-form").addClass("form-visible")
            else
                $(".form-container, .form-container .dynamic-form").removeClass("form-visible")
                $(".form-container, .form-container .dynamic-form.login-form").addClass("form-visible")
    $(".form-container .register-form .submit").click =>
        username = $(".form-container .register-form .username").val()
        password = $(".form-container .register-form .password").val()
        cPassword = $(".form-container .register-form .cpassword").val()
        if not username then return $(".form-container .register-form .error").text("Username cannot be empty.")
        if not password then return $(".form-container .register-form .error").text("Password cannot be empty.")
        if not cPassword then return $(".form-container .register-form .error").text("Password cannot be empty.")
        if username.length < 5 then return $(".form-container .register-form .error").text("Username must be at least 5 letters.")
        if password.length < 5 then return $(".form-container .register-form .error").text("Password be at least 5 letters.")
        if password != cPassword then return $(".form-container .register-form .error").text("Password must match.")
        $(".form-container .register-form .error").text(" ")
        submitData("user/newUser", {
            username: username
            password: password
        }).then (res) =>
            if not JSON.parse(res).status
                $(".form-container .register-form .error").text(JSON.parse(res).message)
            else
                location.reload()
    $(".form-container .login-form .submit").click =>
        username = $(".form-container .login-form .username").val()
        password = $(".form-container .login-form .password").val()
        submitData("/user/login", {
            username: username
            password: password
        }).then (res) =>
            if not JSON.parse(res).status
                $(".form-container .login-form .error").text(JSON.parse(res).message)
            else
                location.reload()
    $(".form-container .add-review-form .submit").click =>
        $(".add-review-form .review-text").css("border", "1px solid transparent")
        $(".add-review-form .category .cat").css("border", "1px solid transparent")
        $(".add-review-form .category .rating").css("border", "1px solid transparent")
        $(".add-review-form .overall").css("border", "1px solid transparent")
        $(".add-review-form .title").css("border", "1px solid transparent")
        if not $(".add-review-form .title").val()
            $(".add-review-form .title").css("border", "1px solid black")
        if not $(".add-review-form .review-text").val()
            $(".add-review-form .review-text").css("border", "1px solid black")
        if not $(".add-review-form .overall").val() or isNaN($(".add-review-form .overall").val())
            $(".add-review-form .overall").css("border", "1px solid black")
        allcategory = []
        for section in $(".add-review-form .category")
            category = $(section).find(".cat")
            rating = $(section).find(".rating")
            console.log(category.val(), rating.val())
            if not category.val()
                category.css("border", "1px solid black")
            if not rating.val() or isNaN(rating.val())
                rating.css("border", "1px solid black")
            if allcategory.indexOf(category.val()) != -1
                category.css("border", "1px solid black")
            if category.val() and rating.val() and not isNaN(rating.val()) and allcategory.indexOf(category.val()) == -1
                console.log(category, rating)
                allcategory.push([category.val().toLowerCase(), rating.val()])
        if $(".add-review-form .review-text").val() and $(".add-review-form .overall").val() and not isNaN($(".add-review-form .overall").val()) and $(".add-review-form .title").val()
            submitData("/user/getSessionId", {}).then (userId) =>
                submitData("/review/addReview", {
                    title: $(".add-review-form .title").val()
                    reviewText: $(".add-review-form .review-text").val()
                    category: JSON.stringify(allcategory)
                    overall: $(".add-review-form .overall").val()
                    pId: $("#review").attr("pid")
                    userId: userId
                    type: $("#review").attr("type")
                }).then (res) =>
                    location.reload()
                allcategory = []
            