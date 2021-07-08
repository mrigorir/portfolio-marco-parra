$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                url: "https://formspree.io/f/xzbyvkea",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message,
                }, 
                headers: {
                  'Accept': 'application/json'
                },
                cache: false,
                success: function () {
                    // Success message
                    $("#success").html("<div class='alert alert-success text-center'>");
                    $("#success > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button>")
                    $("#success > .alert-success").append("<strong>Your message has been sent. </strong>");
                    $("#success > .alert-success").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                error: function () {
                    // Fail message
                    $("#fail").html("<div class='alert alert-danger'>");
                    $("#fail > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button>");
                    $("#fail > .alert-danger").append("<strong> Sorry "+firstName+", it seems that my mail server is not responding. Please try again later!");
                    $("#fail > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
