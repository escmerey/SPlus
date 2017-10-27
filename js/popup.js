$(function() {
	
	$('body').on('click', '.p_close ,.popup_close, #overlay', function(event) {
		$('.popup, #overlay').removeClass('visible');
		$('aside').removeClass('open');
	});

	$(".callPopup").on('click', function(event) {
		if(!$(this).is('[name=ms2_action]')) {
            event.preventDefault();		    
		}
		
		var popup = $(this).attr('data-popupBlock');
		if ($('.'+popup).hasClass('popup--notfixed')) {
			$('.'+popup).css('top', $(window).scrollTop() + $(window).height()/2);
		};
		$('#overlay').addClass('visible');
		setTimeout(function () {
			$('.'+popup).addClass('visible')
		},300);
		setTimeout(function () {
			$('.'+popup).find('input').eq(0).focus();
		},1000)
	});


    function forms() {
        function setMailHandler(formSelector, formLink) {
            

            $('body').on('submit', formSelector, function (e) {
                var $form = $(this);
                
                e.preventDefault();

                $form.find('input, textarea, .loadFiles, label').removeClass('error');

                
                var $btn = $('button', $form);
                $btn.prop('disabled', true);

                var xhr = new XMLHttpRequest();
                var formData = new FormData($form.get(0));

                xhr.addEventListener('load', function(e) {
                    if(xhr.status == 200) {
                        var res = $.parseJSON(xhr.responseText);

                        if(!res) return alert('РћС€РёР±РєР° СЃРµСЂРІРµСЂР°');
                        switch (res.status) {
                            case 'wrong':
                                $.each(res.fields, function (id, val) {
                                    var $input = $form.find('[name=' + val + ']');
                                    $input.addClass('error');
                                });

                                $btn.prop('disabled', false);
                                break;

                            case 'error':
                                $btn.prop('disabled', false);
                                break;

                            default:
                                $form.addClass('done');
                                $form[0].reset();
                                $btn.prop('disabled', false);

                                
                        }
                    }
                });


                xhr.open('POST', formLink);
                xhr.send(formData);

                return false;
            });
        }
        
        setMailHandler('.popupCall form, .popupBook form', '/connectors/components/mail/mail.php');
        
    }    

    forms();
});