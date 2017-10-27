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

});