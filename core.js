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

  // Управление темами
  const themeToggle = document.getElementById('themeToggle');
  
  if (themeToggle) {
    const themeIcon = document.querySelector('.theme-icon');
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Обработчик переключения темы
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
      if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
      }
    }
  }

  // Данные о букетах
  const bouquetsData = {
    1: {
      title: "Весенний букет для Ваших мам",
      price: "1269₽",
      image: "img/first-bouqet.png",
      composition: [
        "Розы нежно-розового оттенка",
        "Белые хризантемы",
        "Зеленые ветки эвкалипта",
        "Гипсофила для воздушности",
        "Декоративная зелень"
      ],
      description: "Нежный и элегантный букет, созданный специально для самых важных женщин в вашей жизни. Идеально подходит для подарка маме на день рождения, 8 марта или просто чтобы выразить свою любовь.",
      features: [
        "Свежие цветы от проверенных поставщиков",
        "Долгое сохранение свежести",
        "Экологичная упаковка",
        "Бесплатная открытка в подарок"
      ],
      care: "Поставьте букет в чистую воду комнатной температуры. Меняйте воду каждые 2 дня и подрезайте стебли. Избегайте прямых солнечных лучей и сквозняков."
    },
    2: {
      title: "Милый и маленький букет для ваших подруг",
      price: "999₽",
      image: "img/second-bouqet.png",
      composition: [
        "Нежные альстромерии",
        "Миниатюрные розы",
        "Мелкие полевые цветы",
        "Ажурная зелень",
        "Декоративные элементы"
      ],
      description: "Очаровательный компактный букет, который станет прекрасным сюрпризом для подруги. Подходит для любого повода - от дня рождения до простого знака внимания.",
      features: [
        "Компактный размер - удобно носить",
        "Яркое сочетание цветов",
        "Подходит для любого возраста",
        "Долго сохраняет свежесть"
      ],
      care: "Добавьте в воду специальную подкормку для цветов. Удаляйте увядшие цветы. Храните в прохладном месте вдали от фруктов."
    },
    3: {
      title: "Уютный букет чтобы принести домой жене",
      price: "1499₽",
      image: "img/third-bouqet.png",
      composition: [
        "Красные розы премиум-класса",
        "Белые лилии",
        "Темно-зеленые листья",
        "Декоративные ветки",
        "Сезонные акценты"
      ],
      description: "Роскошный и стильный букет, который выразит ваши чувства без слов. Идеальный выбор для романтического вечера или просто чтобы сделать приятное любимой жене.",
      features: [
        "Цветы премиум-качества",
        "Индивидуальная сборка",
        "Стильное оформление",
        "Идеальные пропорции"
      ],
      care: "Используйте только отстоянную воду. Добавляйте аспирин для продления жизни цветов. Вечером можно опрыскивать цветы из пульверизатора."
    }
  };

  // Обработчик для кнопок информации о букете
  $('.info-btn').on('click', function() {
    const bouquetId = $(this).data('bouquet');
    const bouquet = bouquetsData[bouquetId];
    
    if (bouquet) {
      // Заполняем модальное окно данными
      $('#bouquetModalTitle').text(bouquet.title);
      $('#bouquetModalPrice').text(bouquet.price);
      $('#bouquetModalImage').attr('src', bouquet.image);
      $('#bouquetModalImage').attr('alt', bouquet.title);
      
      // Заполняем состав
      const compositionList = $('#bouquetModalComposition');
      compositionList.empty();
      bouquet.composition.forEach(item => {
        compositionList.append(`<li>${item}</li>`);
      });
      
      // Заполняем описание
      $('#bouquetModalDescription').text(bouquet.description);
      
      // Заполняем особенности
      const featuresList = $('#bouquetModalFeatures');
      featuresList.empty();
      bouquet.features.forEach(item => {
        featuresList.append(`<li>${item}</li>`);
      });
      
      // Заполняем уход
      $('#bouquetModalCare').text(bouquet.care);
      
      // Обработчик для кнопки добавления в корзину в модальном окне
      $('.add-to-cart-modal').off('click').on('click', function() {
        addToCart(bouquetId, bouquet);
      });
    }
  });

  // Функция добавления в корзину
  function addToCart(bouquetId, bouquet) {
    // Здесь можно добавить логику добавления в корзину
    alert(`Букет "${bouquet.title}" добавлен в корзину!`);
    
    // Закрываем модальное окно
    $('#bouquetModal').modal('hide');
    
    // Визуальная обратная связь
    const cartButton = $(`.info-btn[data-bouquet="${bouquetId}"]`).siblings('.cart');
    cartButton.css({
      'transform': 'scale(1.3)',
      'transition': 'all 0.3s ease'
    });
    
    setTimeout(() => {
      cartButton.css({
        'transform': 'scale(1)',
        'transition': 'all 0.3s ease'
      });
    }, 300);
  }

  // Обработчик для клика по карточке букета
  $('.first-bouqet, .second-bouqet, .third-bouqet').on('click', function(e) {
    // Открываем модальное окно только если клик не по кнопке
    if (!$(e.target).closest('.info-btn, .cart').length) {
      const bouquetId = $(this).data('bouquet-id');
      $(`.info-btn[data-bouquet="${bouquetId}"]`).click();
    }
  });

  // Добавляем интерактивность для карточек букетов
  $('.first-bouqet, .second-bouqet, .third-bouqet').hover(
    function() {
      // При наведении
      $(this).css({
        'transform': 'translateY(-10px)',
        'transition': 'all 0.3s ease'
      });
    },
    function() {
      // При уходе курсора
      $(this).css({
        'transform': 'translateY(0)',
        'transition': 'all 0.3s ease'
      });
    }
  );

  // Интерактивность для иконок корзины
  $('.cart').hover(
    function() {
      $(this).css({
        'transform': 'scale(1.2)',
        'transition': 'all 0.3s ease'
      });
    },
    function() {
      $(this).css({
        'transform': 'scale(1)',
        'transition': 'all 0.3s ease'
      });
    }
  );

  // Улучшенная валидация с визуальной обратной связью
  const formInputs = document.querySelectorAll('#contactForm input, #contactForm select');
  
  formInputs.forEach(input => {
    // Обработчик фокуса
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
      this.classList.add('focused-input');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      this.classList.remove('focused-input');
      
      // Проверяем валидность при потере фокуса
      validateField(this);
    });
    
    // Валидация в реальном времени для email и телефона
    if (input.type === 'email' || input.type === 'tel') {
      input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
          this.classList.add('has-value');
          validateField(this);
        } else {
          this.classList.remove('has-value');
        }
      });
    }
    
    // Для select
    if (input.tagName === 'SELECT') {
      input.addEventListener('change', function() {
        if (this.value) {
          this.classList.add('has-value');
          validateField(this);
        } else {
          this.classList.remove('has-value');
        }
      });
    }
  });

  function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    
    if (!errorElement) return;
    
    // Очищаем предыдущую ошибку
    errorElement.textContent = '';
    field.classList.remove('invalid');
    
    let isValid = true;
    let errorMessage = '';
    
    switch(field.id) {
      case 'email':
        if (field.value.trim() && !validateEmail(field.value.trim())) {
          isValid = false;
          errorMessage = 'Пожалуйста, введите корректный email';
        }
        break;
      case 'phone':
        if (field.value.trim() && !validatePhone(field.value.trim())) {
          isValid = false;
          errorMessage = 'Пожалуйста, введите корректный номер телефона';
        }
        break;
      case 'selection':
        if (!field.value) {
          isValid = false;
          errorMessage = 'Пожалуйста, выберите тип букета';
        }
        break;
    }
    
    if (!isValid) {
      errorElement.textContent = errorMessage;
      field.classList.add('invalid');
    } else {
      field.classList.add('valid');
    }
  }

  // Анимация для навигационных ссылок
  $('.nav-item').hover(
    function() {
      // При наведении на пункт меню
      $(this).find('.nav-line').css({
        'transform': 'scaleX(1)',
        'transition': 'transform 0.3s ease'
      });
      $(this).find('.nav-link').css({
        'transform': 'translateY(-2px)',
        'transition': 'all 0.3s ease'
      });
    },
    function() {
      // При уходе курсора
      $(this).find('.nav-line').css({
        'transform': 'scaleX(0)',
        'transition': 'transform 0.3s ease'
      });
      $(this).find('.nav-link').css({
        'transform': 'translateY(0)',
        'transition': 'all 0.3s ease'
      });
    }
  );

  // Инициализация AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });
});

// Валидация 
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submitForm');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const selectionInput = document.getElementById('selection');
  
  // Проверка email и телефона 
  function validateEmail(email) {
    return email.includes('@') && email.includes('.');
  }
  
  function validatePhone(phone) {
    const cleaned = phone.replace(/[^\d+]/g, '');
    const digits = cleaned.startsWith('+') ? cleaned.substring(1) : cleaned;
    return digits.length >= 10 && digits.length <= 11;
  }
  
  if (submitButton) {
    submitButton.addEventListener('click', function(event) {
      event.preventDefault();
      let isValid = true;
      
      // Очищаем ошибки
      document.getElementById('emailError').textContent = '';
      document.getElementById('phoneError').textContent = '';
      document.getElementById('selectionError').textContent = '';
      
      // Сбрасываем стили валидации
      emailInput.classList.remove('invalid', 'valid');
      phoneInput.classList.remove('invalid', 'valid');
      selectionInput.classList.remove('invalid', 'valid');
      
      // Проверка 
      if (!validateEmail(emailInput.value.trim())) {
        document.getElementById('emailError').textContent = 'Пожалуйста, введите корректный email';
        emailInput.classList.add('invalid');
        isValid = false;
      } else {
        emailInput.classList.add('valid');
      }
      
      if (!validatePhone(phoneInput.value.trim())) {
        document.getElementById('phoneError').textContent = 'Пожалуйста, введите корректный номер телефона';
        phoneInput.classList.add('invalid');
        isValid = false;
      } else {
        phoneInput.classList.add('valid');
      }
      
      if (!selectionInput.value) {
        document.getElementById('selectionError').textContent = 'Пожалуйста, выберите тип букета';
        selectionInput.classList.add('invalid');
        isValid = false;
      } else {
        selectionInput.classList.add('valid');
      }
      
      // отправить данные
      if (isValid) {
        // Визуальная обратная связь при успешной отправке
        submitButton.textContent = 'Отправляется...';
        submitButton.disabled = true;
        
        setTimeout(() => {
          alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
          const modal = bootstrap.Modal.getInstance(document.getElementById('moreModal'));
          modal.hide();
          // Очистка формы
          document.getElementById('contactForm').reset();
          
          // Сброс стилей
          emailInput.classList.remove('valid');
          phoneInput.classList.remove('valid');
          selectionInput.classList.remove('valid');
          
          // Восстановление кнопки
          submitButton.textContent = 'Отправить';
          submitButton.disabled = false;
        }, 1000);
      }
    });
  }

  // Обработчик для кнопки "Купить букет"
  const buyButton = document.querySelector('.buy-btn');
  if (buyButton) {
    buyButton.addEventListener('click', function() {
      // Плавная прокрутка к разделу букетов
      const bouquetsSection = document.getElementById('our-anchor');
      if (bouquetsSection) {
        const navbarHeight = document.getElementById('navbar-id').offsetHeight;
        const targetPosition = bouquetsSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // Добавляем ripple-эффект для кнопок
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  // Применяем ripple-эффект к кнопкам
  const buttons = document.querySelectorAll('.buy-btn, .more-btn, .btn-primary, .info-btn');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
});