$(document).ready(function(){

	$('.drawer-activator').click(function(){
		$('.drawer').addClass('active');
    $('.drawer-shade').addClass('active');
	});

	$('.drawer-item').click(function(){
    $('.drawer').removeClass('active');
		$('.drawer-shade').removeClass('active');
	})

  $('.drawer').click(function(){
    $('.drawer').removeClass('active');
    $('.drawer-shade').removeClass('active');
  });

  $('.drawer-shade').click(function(){
    $('.drawer').removeClass('active');
    $('.drawer-shade').removeClass('active');
  });
  
	$('.entry').click(function(){
		$('.drawer').removeClass('active');
	});

  $('.artwork-detail-label').click(function(){
    $(this).siblings().addClass('active');
    $(this).siblings().css("z-index" , "20");

  });

   $('.artwork-image').click(function(){
    $(this).parent().siblings().addClass('active');
    $(this).parent().siblings().css("z-index" , "20");

  });

   $('.detail').click(function(){
    $(this).removeClass('active');
    // $(this).css("z-index", "-20");
    setTimeout(function(){
      console.log("timed!")
      $('.detail').css("z-index","-20");
    },[500]);

   });

   $('.site-nav-trigger').click(function(){
    $('.site-nav').toggleClass('active');
   })
});


function moveBack(){
  $(this).css("z-index" , "-20");
}



// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });