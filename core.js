$(".bouqets-link").on('click', '[href*="#our-anchor"]', function(e){
    var fixed_offset = 100;
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 4000);
    e.preventDefault();
    
  });