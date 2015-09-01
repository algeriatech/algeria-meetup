if (typeof meetup === 'undefined') meetup = {};

meetup = {
	init:function(){
		this.setSectionHeight();
		this.initScroller();
		this.spyScroll();
		$(window).on('resize',function(e){
            meetup.setSectionHeight();
            meetup.initScroller();
            meetup.spyScroll();
        });
	},

	//bind bootstrap spy scroll plugin
	spyScroll:function() {
         var $navtop = $('#site-nav'),
        
        offset  = $navtop.outerHeight();

        

        $('body').scrollspy({ 
            target: '#site-nav',
            offset:offset
        });
    },

	//bind scrolling when clicking in the navbar menu
	initScroller:function() {
        $('a.page-scroll').bind('click', function(event) {
           if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 900,'easeInOutExpo');
            return false;
          }
        }
        });
    },

    //make section fits the screen height
	setSectionHeight:function(){
		aboutSection    = $('.section-about');
	    organiserSection = $('.section-organiser');
	    meetupsSection     = $('.section-meetups');
	    
	    contactSection  = $('.section-contact');

	    $navtop = $('#site-nav'),
	    $section = $('.section'),
	    offset  = $navtop.outerHeight();

	    $section.each(function(i,section){
	    	$(section).css('padding-top',offset)
	    });

	    windowHeight    = $(window).height();
	    aboutHeight     =  Math.round(0.9 * windowHeight);
	    sectionHeight   =  Math.round(0.7 * windowHeight);

	    $('.section-intro').height(windowHeight);

	    $.each([aboutSection,organiserSection,meetupsSection,contactSection],function(i,section){
	    	$(section).css('padding-bottom',offset) ;
	        $(section).css('height',windowHeight);  
	    });
	}
};

meetup.init();