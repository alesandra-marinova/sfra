'use strict';

module.exports = function () {
    
   
    $('body').on('click', '.notify-confirmation-btn', function (e) {
        e.preventDefault();

        var productID = $('#notify-product').val();
        var phone = $('#notify-phone').val();
        var phoneRegex = /^(?=(?:\D*\d){10,15}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$/;
        if(!phone.match(phoneRegex)) {
            $('#invalidPhoneNumber').css('display', 'block');
        }
        else 
        {
        var url = $(this).data('url');
        var data = {
            pid: productID,
            phone: phone
        };

        $.ajax({
            url: url,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function (data) {
                $('#notifyWhenBackProductModal').modal('hide');
                $('#notifyWhenBackProductModal #notify-phone').val('');
                $('body').append('<div class="subscription-messages"></div>');
                
                $('.subscription-messages').append(
                    '<div class="alert alert-success add-to-subscription-alert text-center"'
                    + ' role="alert">'
                    + data.message + '</div>'
                );
                setTimeout(function () {
                    $('.add-to-subscription-alert').remove();
                }, 3000);

            },
            error: function (data) {
                $('#notifyWhenBackProductModal').modal('hide');
                $('#notifyWhenBackProductModal #notify-phone').val('');
                $('body').append('<div class="subscription-messages"></div>');
                
                $('.subscription-messages').append(
                    '<div class="alert alert-danger add-to-subscription-alert text-center"'
                    + ' role="alert">'
                    + data.message + '</div>'
                );
                setTimeout(function () {
                    $('.add-to-subscription-alert').remove();
                }, 3000);
            }
        });
        }
        
    });

    $('body').on('click', '.notify-when-back-header .close ', function (e) {
        $('#notifyWhenBackProductModal #notify-phone').val(''); 
        $('#invalidPhoneNumber').css('display', 'none');   
    });

}