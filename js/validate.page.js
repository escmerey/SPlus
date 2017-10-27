$(document).ready(function() {
    $("form.form_valid").each(function(index) {
        var it = $(this);
        it.validate({
            rules: {
                usr_name: {
                    required: false,
                },
                usr_email: {
                    required: true,
                    email: true,
                },
                usr_phone: {
                    required: true,
                },
                usr_message: {
                    required: true,
                    minlength: 10,
                    maxlength: 500
                },
            },
            messages: {},
            errorPlacement: function(error, element) {},
            submitHandler: function(form) {
                form.submit();
            },
            success: function() {},
            highlight: function(element, errorClass) {
                $(element).addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
            }
        });
    });
});