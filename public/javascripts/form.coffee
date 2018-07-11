submitData = (route, data) =>
    $.ajax
        url: route
        type: 'POST'
        data: data

$(document).ready =>
    $(".form-container .register-form .submit").click =>
        username = $(".form-container .register-form .username").val()
        password = $(".form-container .register-form .password").val()
        cPassword = $(".form-container .register-form .cpassword").val()
        if not username then return $(".form-container .register-form .error").text("Username cannot be empty.")
        if not password then return $(".form-container .register-form .error").text("Password cannot be empty.")
        if not cPassword then return $(".form-container .register-form .error").text("Password cannot be empty.")
        if username.length <= 5 then return $(".form-container .register-form .error").text("Username must be at least 5 letters.")
        if password.length <= 5 then return $(".form-container .register-form .error").text("Password be at least 5 letters.")
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
        submitData("user/login", {
            username: username
            password: password
        }).then (res) =>
            if not JSON.parse(res).status
                $(".form-container .login-form .error").text(JSON.parse(res).message)
            else
                location.reload()