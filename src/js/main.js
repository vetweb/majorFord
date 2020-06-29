//Open Burger Menu
function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.js-burger-menu__button', '.js-burger-menu__lines');
    let links = menu.find('.js-burger-menu__link');
    let overlay = menu.find('.js-burger-menu__overlay');

    button.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    links.on('click', () => toggleMenu());
    overlay.on('click', () => toggleMenu());

    function toggleMenu() {
        menu.toggleClass('burger-menu-active');

        if (menu.hasClass('burger-menu-active')) {
            $('body').addClass('o-hidden');
        } else {
            $('body').removeClass('o-hidden');
        }
    }
}

burgerMenu('.top-navigation');

//Open Burger Menu End

var modalForm = document.querySelector(".jsModalForm");

//Open Modal Rent
function OpenModal() {
    $('.js-form-order').on('click', function() {
        modalForm.classList.add('open');
    });
}

function closeModal() {
    let modalClose = document.querySelector(".jsModalClose");
    let modalCloseOverlay = document.querySelector(".jsModalOverlay");

    modalClose.onclick = function () {
        modalForm.classList.remove('open');
    }

    modalCloseOverlay.onclick = function () {
        modalForm.classList.remove('open');
    }
}

OpenModal();
closeModal();

// Swiper Slider
$(document).ready(function () {
    var mySwiper;

    mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        }
    })

    jQuery.extend(jQuery.validator.messages, {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Email введен не корректно",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Please enter at least {0} characters."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });

    //var $form = $("#register-form");
    $("form[data-form-validate='true']").each(function () {
        $(this).validate({
            errorPlacement: function (error, element) {
                // to append radio group validation erro after radio group
                error.insertAfter(element);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).parent('div').addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).parent('div').addClass(validClass).removeClass(errorClass);
            },
            success: function () {
                $('.js-form-success').addClass('success');
                $('form').hide();
            }
        });

    })

});
