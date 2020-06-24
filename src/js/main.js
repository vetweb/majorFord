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

let modalForm = document.querySelector(".jsModalForm");

//Open Modal Rent
function OpenModal() {
    let linkMore = document.querySelector(".js-form-order");

    linkMore.onclick = function () {
        modalForm.classList.add('open');
    }
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
        loop: true,
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


    //var $form = $("#register-form");
    $("form[data-form-validate='true']").each(function () {
        $(this).validate({
            errorPlacement: function (error, element) {
                // to append radio group validation erro after radio group
                error.insertAfter(element);
            }
        });
    })

});
