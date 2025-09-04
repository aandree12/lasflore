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