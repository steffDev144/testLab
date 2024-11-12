window.onload = function() {
    const answerItems = document.querySelectorAll('.answer__list_item'),
          formItput = document.querySelectorAll('.form__input'),
          formBtn = document.querySelector('.form__btn'),
          mobile = document.querySelector('.mobile'),
          burger = document.querySelector('.header__burger'),
          close = document.querySelector('.mobile__close');

    let phoneInput = document.getElementById('phone'),
        nameInput = document.getElementById('name');

    if(mobile) {
        burger.addEventListener('click', () => {
            mobile.classList.toggle('active');
        });
        close.addEventListener('click', () => {
            mobile.classList.remove('active');
        });
    }

    if(answerItems) {
        answerItems.forEach(item => {
            item.style.height = item.querySelector('.answer__list_item-head').offsetHeight + 'px';
            item.addEventListener('click', () => {
                item.classList.toggle('active');
                if(item.classList.contains('active')) {
                    item.style.height = item.querySelector('.answer__list_item-head').offsetHeight +  item.querySelector('.answer__list_item-body').offsetHeight + 'px';
                } else {
                    item.style.height = item.querySelector('.answer__list_item-head').offsetHeight + 'px';
                }
            });
        });
    }

    if(formItput) {
        formItput.forEach(item => {
            if(item.value == '' || item.value == ' ') {
                item.parentNode.classList.remove('active');
            } else {
                item.parentNode.classList.add('active');
            }
            item.addEventListener('focus', () => {
                item.parentNode.classList.add('active');
            })
            item.addEventListener('blur', () => {
                if(item.value == '' || item.value == ' ') {
                    item.parentNode.classList.remove('active');
                }
            })
            item.addEventListener('input', () => {
                setTimeout(() => {
                    if (item.getAttribute('name') == 'phone') {
                        if(phoneInput.value.length == 18) {
                            phoneInput.parentNode.classList.add('success');
                            phoneInput.parentNode.classList.remove('error');
                        } else {
                            phoneInput.parentNode.classList.remove('success');
                        }
                    }
                    if (item.getAttribute('name') == 'name') {
                        if(nameInput.value.length == 2) {
                            nameInput.parentNode.classList.add('success');
                            nameInput.parentNode.classList.remove('error');
                        } else {
                            nameInput.parentNode.classList.remove('success');
                        }
                    }
                })
            })
        });
    }

    if(phoneInput) {
        let phoneMask = IMask(phoneInput, {
            mask: '+{7} (000) 000-00-00'
        });
    }

    if(formBtn) {
        formBtn.addEventListener('click', (e) => {
            if(phoneInput.value.length < 18) {
                e.preventDefault();
                phoneInput.parentNode.classList.add('error');
                phoneInput.parentNode.classList.remove('success');
            }
            if(nameInput.value.length < 2) {
                e.preventDefault();
                nameInput.parentNode.classList.add('error');
                nameInput.parentNode.classList.remove('success');
            }
        });
    }

    $( "form" ).on( "submit", function(e) {
        e.preventDefault();
        let formParams = $(this).serialize();
        $.ajax({
        url: '/mailer/smart.php',
        method: 'post',
        dataType: 'json',
        data: formParams ,
        success: function(data){
            console.log("Форма обратной связи отправлена")
            nameInput.value = '';
            phoneInput.value = '';
        }
        });
    });

    var $page = $('html, body');
    $('a[href*="#"]').click(function() {
        mobile.classList.remove('active');
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        return false;
    });
};