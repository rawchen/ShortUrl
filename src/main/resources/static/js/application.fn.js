(function($){
 // Smooth Scroll
  $.fn.extend({ 
    smoothscroll: function(settings) {
      var defaults = {
          holder: 0
      };
      var s = $.extend(defaults, settings);      
      $(this).click(function(e){
        e.preventDefault();
        if(!s.holder){
          var href=$(this).attr("href");
        }else{
          var href=s.holder;
        }
        var pos=$(href).position(); 
        var css=$(this).attr('class');
            $("."+css).removeClass("active");
            $('body,html').animate({ scrollTop: pos.top-30 });               
      });
    }        
  });
})(jQuery);