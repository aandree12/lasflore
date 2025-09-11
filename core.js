$(".bouqets-link").on('click', '[href*="#our-anchor"]', function(e){
    var fixed_offset = 100;
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 4000);
    e.preventDefault();
    
  });

$(document).ready(function() {
  // Закрываем меню при клике на ссылку (для мобильной версии)
  $('.navbar-nav a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
  });

  // Обработка клика по всем ссылкам навигационного меню
  $('#navbar-id a.nav-link').on('click', function(e) {
    // Проверяем, является ли ссылка якорем
    if(this.hash !== "") {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      // Вычисляем высоту навигационного бара
      var fixed_offset = $('#navbar-id').outerHeight();

      // Плавная прокрутка к элементу
      $('html, body').stop().animate({
        scrollTop: $target.offset().top - fixed_offset
      }, 900, 'swing', function() {
        window.location.hash = target;
      });
    }
  });
});
// Валидация формы в модальном окне
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submitForm');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const selectionInput = document.getElementById('selection');
  
  // Функция проверки email и телефона 
  function validateEmail(email) {
    return email.includes('@') && email.includes('.');
  }
  
  function validatePhone(phone) {
    const cleaned = phone.replace(/[^\d+]/g, '');
    const digits = cleaned.startsWith('+') ? cleaned.substring(1) : cleaned;
    return digits.length >= 10 && digits.length <= 11;
  }
  
  // Обработчик события для проверки формы
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    let isValid = true;
    
    // Очищаем предыдущие ошибки
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('selectionError').textContent = '';
    
    // Проверка 
    
    if (!validateEmail(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Пожалуйста, введите корректный email';
      isValid = false;
    }
    if (!validatePhone(phoneInput.value.trim())) {
      document.getElementById('phoneError').textContent = 'Пожалуйста, введите корректный номер телефона';
      isValid = false;
    }
    if (!selectionInput.value) {
      document.getElementById('selectionError').textContent = 'Пожалуйста, выберите тип букета';
      isValid = false;
    }
    
    // Если форма валидна, можно отправить данные
    if (isValid) {
      alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      const modal = bootstrap.Modal.getInstance(document.getElementById('moreModal'));
      modal.hide();
      // Очистка формы
      document.getElementById('contactForm').reset();
    }
  });
});