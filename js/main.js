$(function() {

    $(document).tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function(position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        },
    });

    $(window).resize(function(event) {
        catalogWidth();
        headerFixed()
    });
    catalogWidth();
    headerFixed()

    $(window).scroll(function(event) {
        if ($('.category').length) {
            hambVisible();
        }
        headerFixed()
        scrollup();
    });
    scrollup();

    //ширина каталога
    function catalogWidth() {
        size = $('.catalog__submenu').parents('.wrapper').width() - $('.catalog').width();
        $('.catalog__submenu').css('width', size + 'px');
    }

    // показать/скрыть .hamb_aside
    function hambVisible() {
        if ($(window).scrollTop() > $('.category').offset().top) {
            $('.hamb_aside').addClass('visible');
        } else {
            $('.hamb_aside').removeClass('visible');
        }
    }

    var headerHeight = $('header').outerHeight();
    //
    function headerFixed() {
        if ($(window).scrollTop() > headerHeight) {
        // $('.header').css('marginBottom', $('.header__bottom').outerHeight());
            $('.header').addClass('fixed');
        } else {
            $('.header').removeClass('fixed');
        }
    }

    //Анимация прокрутки к якорю
    $('a[href*=#].anchor').bind("click", function(e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 700);
        e.preventDefault();
    });

    //Вызов блока с товарами в поле поиска
    $('#input_search').on('input keyup focusout', function(event) {
        if ($(this).val().length >= 3) {
            $('.search__result').addClass('visible');
            $('form.search').addClass('active');
        } else {
            $('.search__result').removeClass('visible');
            $('form.search').removeClass('active');
        }
    });

    //Вызов бокового меню
    $('.menu-toggle').on('click', function() {
        $('.hidden_menu').toggleClass('menu-open');
        $('.menu-toggle').toggleClass('menu-open');
    });

    //Работа выпадающего меню товаров
    if ($(window).width() < 1050) {
        $('.catalog__title').on('click', function(event) {
            if ($('.catalog__items').hasClass('menu-open')) {
                $('.catalog__title .toggle-burger, .catalog__items').removeClass('menu-open');
            } else {
                $('.catalog__title .toggle-burger, .catalog__items').addClass('menu-open');
            }
        });
    } else {
        $('.catalog__title').on('mouseover', function(event) {
            $('.catalog__title .toggle-burger, .catalog__items').addClass('menu-open');
        });
        $('.catalog__items').on('mouseover', function(event) {
            $('.catalog__title .toggle-burger, .catalog__items').addClass('menu-open');
        });
        $('.catalog').on('mouseout', function(event) {
            $('.catalog__title .toggle-burger, .catalog__items').removeClass('menu-open');
        });

    };

    /*
    //отключать ссылки на категории
    if ($(window).width() > 760) {
        $('.catalog__item > a').on('click', function(event) {
            event.preventDefault();
        });
    };
    */

    //Закрыть меню при клике вне него
    $(document).on('click touchstart', function(event) {
        if (!$(event.target).closest('.hidden_menu').length && !$(event.target).closest('.menu-toggle').length) {
            if ($('.hidden_menu').hasClass('menu-open')) {
                $('.menu-open').removeClass('menu-open');
            };
        };
        if (!$(event.target).closest('.catalog').length) {
            $('.catalog__title .toggle-burger, .catalog__items').removeClass('menu-open');
        };
    });

    if ($(window).width() < 1130) {
        $('.goods').on('click', '.goods__item', function(event) {
            $('.goods__item').removeClass('deployed');
            $(this).addClass('deployed');
        });
    }


    //Добавляем маску к вводу телефона
    $("input[type='tel']").each(function() {
        $(this).mask("+7 (999) 999-9999");
    });

    //Слайдер на главной со скидками
    var mainSwiper = new Swiper('.main__slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

    //Слайдер "горячие товары"
    var hotSwiper = new Swiper('.hot_sale__slider', {
        nextButton: '.hot_sale_control--next',
        prevButton: '.hot_sale_control--prev',
    });

    var addGoodsSwiper = new Swiper('.addition-slider', {
        nextButton: '.addition-btn-next',
        prevButton: '.addition-btn-prev',
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: 3000,
        breakpoints: {
            1130: {
                spaceBetween: 15,
                slidesPerView: 3,
            },
            820: {
                spaceBetween: 10,
                slidesPerView: 2,
            },
            550: {
                slidesPerView: 1,
            },
        }
    });

    var recentlySwiper = new Swiper('.recently-slider', {
        nextButton: '.recently-btn-next',
        prevButton: '.recently-btn-prev',
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: 3000,
        breakpoints: {
            1130: {
                spaceBetween: 15,
                slidesPerView: 3,
            },
            820: {
                spaceBetween: 10,
                slidesPerView: 2,
            },
            550: {
                slidesPerView: 1,
            },
        }
    });

    var compareSwiper = new Swiper('.compare__box', {
        slidesPerView: 4,
        spaceBetween: 30,
        scrollbar: '.swiper-scrollbar',
        paginationClickable: true,
        scrollbarHide: false,
        breakpoints: {
            1130: {
                spaceBetween: 10,
                slidesPerView: 3,
            },
            820: {
                spaceBetween: 10,
                slidesPerView: 2,
            },
            550: {
                slidesPerView: 1,
            },
        }
    });

    //Сворачивающиеся опции поиска
    $('.category__sidebar_item--foldable').accordion({
        collapsible: true,
        active: false,
        animate: 200
    });

    /* слайдер цен */
    $(".sliderElm").slider({
        range: true,
        create: function(event, ui) {
            $(this).slider("option", "min", parseInt($(this).parents('.rangeSlider').find('.minCost').attr('data-minCount')));
            $(this).slider("option", "max", parseInt($(this).parents('.rangeSlider').find('.maxCost').attr('data-maxCount')));
            $(this).slider("option", "values", [$(this).slider("option", "min"), $(this).slider("option", "max")]);
        },
        stop: function(event, ui) {
            $(this).parents('.rangeSlider').find('.minCost').val($(this).slider("values", 0));
            $(this).parents('.rangeSlider').find('.maxCost').val($(this).slider("values", 1));
        },
        slide: function(event, ui) {
            $(this).parents('.rangeSlider').find('.minCost').val($(this).slider("values", 0));
            $(this).parents('.rangeSlider').find('.maxCost').val($(this).slider("values", 1));
        }
    });

    $("input.minCost").change(function() {
        var value1 = $("input.minCost").val();
        var value2 = $("input.maxCost").val();
        if (parseInt(value1) > parseInt(value2)) {
            value1 = value2;
            $("input.minCost").val(value1);
        }
        if (parseInt(value1) < $(this).attr('data-minCount')) {
            value1 = $(this).attr('data-minCount');
            $("input.minCost").val(value1);
        }
        if (parseInt(value1) == "") {
            $("input.minCost").val($(this).attr('data-minCount'));
        }
        $(".sliderElm").slider("values", 0, value1);
    });

    $("input.maxCost").change(function() {
        var value1 = $("input.minCost").val();
        var value2 = $("input.maxCost").val();
        if (parseInt(value2) > $(this).attr('data-maxCount')) {
            value2 = $(this).attr('data-maxCount');
            $("input.maxCost").val(value2);
        }
        if (parseInt(value1) > parseInt(value2)) {
            value2 = value1;
            $("input.maxCost").val(value2);
        }
        $(".sliderElm").slider("values", 1, value2);
    });

    //Слайдер в карточке товара
    $('.product__gallery').lightSlider({
        item: 1,
        gallery: true,
        controls: false,
        thumbItem: 10,
        loop: false,
        height: '100%',
        enableDrag: false,
        thumbMargin: 1,
        responsive: [{
            breakpoint: 520,
            settings: {
                thumbItem: 5,
            }
        }, ]
    });

    //Табы внутри товара
    // $('.product__bottom').tabs({
    //     hide: {
    //         effect: "fade",
    //         duration: 200
    //     },
    //     show: {
    //         effect: "fade",
    //         duration: 200
    //     },
    // })

    //запрет ввода символов
    $(".rangeSlider input, .quantity__number").keypress(function(e) {
        e = e || event;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        var chr = getChar(e);
        if (chr == null) return;
        if (chr < '0' || chr > '9') {
            return false;
        }
    });

    //Запрет ввода 0 и чисел больше 99
    $('.quantity__number').on('input keyup focusout', function(e) {
        if ($(this).val() > 99) {
            $(this).val('99')
        }
        if ($(this).val() < 1) {
            $(this).val('1')
        }
    });

    var count = 1;

    //Изменение значения в поле по нажатию +/-
    $('.quantity__btn').on('click', function(event) {
        if ($(this).hasClass('quantity__btn--minus')) {
            count = Number($(this).parent().find('.quantity__number').val()) - 1;
            if (count < 1) {
                count = 1;
            };
            $(this).parent().find('.quantity__number').val(count).trigger('change');
        } else if ($(this).hasClass('quantity__btn--plus')) {
            count = Number($(this).parent().find('.quantity__number').val()) + 1;
            if (count > 99) {
                count = 99;
            };
            $(this).parent().find('.quantity__number').val(count).trigger('change');
        }
    });

    //цвет радокнопок
    $('.color__item label').each(function(index, el) {
        $(this).css({
            background: $(this).attr('data-color'),
        });
    });

    //окрашиваение иконок
    $('body')
        .on('click', '.link_icons .link_icons__item', function(event) {
            if ($(this).is('header *')) return;

            event.preventDefault();

            var pId = $(this).closest('.goods__item, .product__right').data('id');

            $.post('assets/components/favorites/connector.php', {
                action: $(this).hasClass('active') ? 'remove' : 'add',
                id: pId,
                dict: $(this).data('dict')
            });

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });

    $(document).on('click', '.quickView__btn', function(e) {
        e.preventDefault();

        if ($(this).hasClass('quickView__btn--left')) {
            window.pid--;
        } else {
            window.pid++;
        }

        if (window.pid < 0) {
            window.pid = window.neighbours.length - 1;
        }

        if (window.pid > window.neighbours.length - 1) {
            window.pid = 0;
        }

        $('.goods__image .goods__link.callPopup', window.neighbours[pid]).click();
    })

    $('.goods__image .goods__link.callPopup')
        .on('click', function(event) {
            event.preventDefault();

            var $item = $(this).closest('.goods__item');

            if ($item.parent().is('.swiper-slide')) {
                window.neighbours = $item.parent().parent().find('.goods__item');
            } else {
                window.neighbours = $item.parent().children('.goods__item');
            }

            window.pid = window.neighbours.index($item);

            $.post('assets/components/favorites/connector.php', {
                action: 'quick',
                id: $(this).closest('.goods__item').data('id'),
            }, function(data) {
                $('.popup.quickView').html(data);

                $('.popup.quickView .product__gallery').lightSlider({
                    item: 1,
                    gallery: true,
                    controls: false,
                    thumbItem: 10,
                    loop: false,
                    enableDrag: false,
                    thumbMargin: 1,
                    responsive: [{
                        breakpoint: 520,
                        settings: {
                            thumbItem: 5,
                        }
                    }, ]
                });

                $('.product__left .lslide .zoom').each(function(index, el) {
                    $(this).easyZoom({
                        selector: {
                            preview: '.preview-zoom',
                            window: "#window-zoom"
                        }
                    });
                });

                $('.lightgallery').lightGallery({
                    selector: '.lightgallery_item',
                    download: false,
                });

                //Закрыть "быстрый просмотр" после дабавления товара в корзину
                $('.quickView button[name="ms2_action"]').on('click', function(event) {
                    $('.popup, #overlay').removeClass('visible');
                });

            });

        });


    //Якорь к отзыву
    $('.view-review').on('click', function(event) {
        event.preventDefault();
        $('.product__bottom').tabs("option", "active", 2)
    });

    //Выпадающее меню select
    $('select.nice-select').niceSelect();
    //Скролл для выпадающего меню
    $('.nice-select .list').perfectScrollbar();

    //Вкладки в личном кабинете
    $('.cabinet__box').tabs({
        active: 0,
    });

    //Удалить карточку с товаром
    $('.goods .goods__remove .icon').on('click', function(event) {
        event.preventDefault();

        $.post('assets/components/favorites/connector.php', {
            action: 'remove',
            id: $(this).closest('.goods__item').data('id'),
            dict: 'favorites'
        });

        $(this).parents('.goods__item').remove();
    });

    //Удалить карточку с товаром
    $('.compare__box .goods__remove .icon').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.swiper-slide').remove();
        compareSwiper.onResize();
    });

    //открыть боковое меню фильтра
    $('.hamb_aside').on('click', function(event) {
        $(this).parents('aside').addClass('open');
        $('#overlay').addClass('visible')
    });

    $('.cabinet__data_btn').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.cabinet__data_row').find('.changeform').addClass('visible').find('input[type="text"]').focus();
    });

    $('.cabinet__data_address_item .amend').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.cabinet__data_address_item').find('.changeform').addClass('visible').find('input[type="text"]').focus();
    });

    $('.cabinet__data_address_item .remove').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.cabinet__data_address_item').remove();
    });

    $('#goup').click(function() {
        $("html, body").animate({
            scrollTop: 0 + "px"
        }, {
            duration: 500
        });
    });

    $('#comment-form .goods__rating .star')
        .on('click', function() {
            var $this = $(this);
            $this
                .addClass('active')
                .prevAll()
                .addClass('active');

            $this.nextAll().removeClass('active');


            $this.siblings('input').val($this.index() + 1);
        })

    $('.goods__rating').each(function() {
        var $this = $(this);

        var rating = parseInt($this.data('rating'));

        if (rating) {
            var $stars = $this.children('.star');
            $stars.removeClass('active');
            $stars
                .eq(rating - 1)
                .addClass('active')
                .prevAll()
                .addClass('active');
        }
    })

    $('.feedback').on('click', function(event) {
        event.preventDefault();
        $(this).css('display', 'none').parents('.product__reviews').find('form').css('display', 'flex').find('textarea').focus();
    });

    //Вызов google карты
    if ($('.contacts__map').length) {
        mapInitialize();
    }

    var shown = window.localStorage.getItem('offerShown');

    if (shown != 1) {
        window.localStorage.setItem('offerShown', 1);

        var popup = 'popupOffer';
        if ($('.' + popup).hasClass('popup--notfixed')) {
            $('.' + popup).css('top', $(window).scrollTop() + $(window).height() / 2);
        };
        $('#overlay').addClass('visible');
        setTimeout(function() {
            $('.' + popup).addClass('visible')
        }, 300);
        setTimeout(function() {
            $('.' + popup).find('input').eq(0).focus();
        }, 1000)
    }

    $('.basket__bottom a').on('click', function(e) {
        if (!$('#acceptoffer').is(':checked')) {
            e.preventDefault();
            alert('Для оформления заказа, пожалуйста, примите оферту')
        }
    });


    $('.lightgallery').lightGallery({
        selector: '.lightgallery_item',
        download: false,
    });

    //Лупа на фото товаров
    $('.product__left .lslide .zoom').each(function(index, el) {
        $(this).easyZoom({
            selector: {
                preview: '.preview-zoom',
                window: "#window-zoom"
            }
        });
    });

    
});

function mapInitialize() {

    var brooklyn1 = new google.maps.LatLng(59.92860856, 30.30128850);
    var brooklyn2 = new google.maps.LatLng(59.92860856, 30.30128850);

    var mapOptions1 = {
        zoom: 16,
        center: brooklyn1,
        mapTypeControl: false,
        scrollwheel: false,
        navigationControl: false,
        scaleControl: false,
        draggable: true,
    };

    var mapOptions2 = {
        zoom: 16,
        center: brooklyn2,
        mapTypeControl: false,
        scrollwheel: false,
        navigationControl: false,
        scaleControl: false,
        draggable: true,
    };

    if ($(window).width() <= 1180) {
        mapOptions1.draggable = false;
        mapOptions2.draggable = false;
    }

    //////////////////////////////////////

    map1 = new google.maps.Map(document.getElementById("map_canvas-1"), mapOptions1);

    marker1 = new google.maps.Marker({
        map: map1,
        draggable: false,
        position: brooklyn1,
        title: "Мы находимся тут!"
    });

    var contentString1 = '<div class="map_info"><p><img src="images/ico/mark-map.svg" alt="">Москва, ул. Хавская 36</p><a href="tel:88005553535"><img src="images/ico/phone-map.svg" alt="">8 800 555 35 35</a><p><img src="images/ico/clock-map.svg" alt="">09.00 - 18.00 <span>Выходной сб.-вс.</span></p></div>'

    var infowindow1 = new google.maps.InfoWindow({
        content: contentString1
    });
    infowindow1.open(map1, marker1);

    //////////////////////////////////////////

    map2 = new google.maps.Map(document.getElementById("map_canvas-2"), mapOptions2);

    marker2 = new google.maps.Marker({
        map: map2,
        draggable: false,
        position: brooklyn2,
        title: "Мы находимся тут!"
    });

    var contentString2 = '<div class="map_info"><p><img src="images/ico/mark-map.svg" alt="">Москва, ул. Хавская 36</p><a href="tel:88005553535"><img src="images/ico/phone-map.svg" alt="">8 800 555 35 35</a><p><img src="images/ico/clock-map.svg" alt="">09.00 - 18.00 <span>Выходной сб.-вс.</span></p></div>'

    var infowindow2 = new google.maps.InfoWindow({
        content: contentString2
    });
    infowindow2.open(map2, marker2);

    if ($(window).width() <= 720) {

    }

}

function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
    }
    return null; // специальная клавиша
}

function scrollup() {
    if ($(window).scrollTop() > 500) {
        $('#goup').fadeIn('fast');
    } else {
        $('#goup').fadeOut('fast');
    }
}