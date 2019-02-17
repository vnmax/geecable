( function( window ) {
  'use strict';

    $.exists = function(selector) {
      return ($(selector).length > 0);
    }

    window.onpageshow = function(event) {
      if (event.persisted) {
          window.location.reload() 
      }
    };

    $(window).on('resize', onsize, function(e){
      e.stopPropagation();
      onsize();
    });
    
    PageTransition();
    end_transition();
    StickyElement();
    StickyElement2();
    MobileMenu();
    HomeSlider();
    ProjectSlider();
    StickyHeader();
    Grid();
    Pager();
    Skills();
  
})( window );


    
  /*------------------
  Page transition
  -------------------*/
    function PageTransition(){
      $('body').prepend('<div class="preload"></div>');
        // load page effect
        end_transition();
        $('.page-transition a').on('click', function(event){
          event.preventDefault();
          var newLocation = $(this).attr('href');
          start_transition(newLocation);
        });
    }
    // Page transition function
    function start_transition(newLocation) {
      if (newLocation != '#' && newLocation != '') {
        $('.container').css('overflow', 'visible');
        $('.preload').css('visibility', 'visible');
        anime({
          targets: '.preload',
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });
        anime({
          targets: '.container',
          duration: 1400,
          translateX: [0, -100],
          easing: 'easeOutExpo'
        });
        anime({
          targets: '.header-inner',
          duration: 1400,
          translateY: [0, -20],
          easing: 'easeOutExpo'
        });
        anime({
          targets: 'footer',
          duration: 1400,
          translateY: '20px',
          easing: 'easeOutExpo'
        });
        setTimeout(function() {window.location = newLocation;}, 600);
      }
    }
    function end_transition(){
      $('.container').css('visibility', 'visible');
        anime({
          targets: '.preload',
            opacity: [1, 0],
            duration: 1000,
            easing: 'easeInOutCubic',
            complete: function(){
              $('.preload').css('visibility', 'hidden');
            },
        });
        anime({
          targets: '.container',
          duration: 1400,
          translateX: [100, 0],
          easing: 'easeOutExpo',
          complete: function(){
            $('.container').css({
              'transform': ''
            });
          },
        });
        anime({
          targets: '.header-inner',
          duration: 1400,
          translateY: [-40, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo'
        });
        anime({
          targets: 'footer',
          duration: 1400,
          translateY: [40, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
        });
    }
  /*------------------
  Sticky element
  -------------------*/
    function StickyElement(){
      if ($.exists('#sticky')) {
        $(document).on( 'scroll', function(){
          $('#sticky').stick_in_parent({offset_top: 100, parent: '.project-content'});
        });   
      }
    }
    function StickyElement2(){
      if ($.exists('#sticky2')) {
        $(document).on( 'scroll', function(){
          $('#sticky2').stick_in_parent({offset_top: 100, parent: '.project-content'});
        });   
      }
    }
  /*------------------
  Mobile menu
  -------------------*/
    function MobileMenu(){
      $('.nav-trigger').on('click', function(){
        $(this).parent().toggleClass('nav-open');
        $('.menu').toggleClass('menu-open');
        $('body').toggleClass('scroll-off');
          $('.menu').find('.sub-menu').prev('a').toggleClass('dropdown');
      });
      $('.menu').on('click', 'a.dropdown', function(){
        $(this).next('ul').slideToggle('fast').prev().toggleClass('on');
      });
    }
    var onsize = function() {
      var w_width = $(window).width();
      if(w_width >= 1024) {
        $('.sub-menu').css({'display' : 'block'});
        $('body').removeClass('scroll-off');
        $('.nav-trigger').parent().removeClass('nav-open');
        $('.menu').removeClass('menu-open');
        $('.dropdown').next('ul').slideUp();
        $('.menu').find('.sub-menu').prev('a').removeClass('dropdown on');
      } else {
        $('.sub-menu').css({'display' : 'none'});
        $('.menu').find('.sub-menu').prev('a').removeClass('on');
      }
    };
  /*------------------
  Home slider
  -------------------*/
    function HomeSlider(){
      if ($.exists('.home-slider')) {
        var slider = $('.home-slider-horizontal');
        slider.slick({
          centerMode: true,
          variableWidth: true,
          infinite: true,
          dots: true,
          mobileFirst: true,
          customPaging : function(slider, i) {
            return '<button class="nav__item"></button>';
          },
          speed: 600,
          autoplaySpeed: 6000,
          autoplay: true,
          arrows: false,
          cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
          centerPadding: '160px',
          slidesToShow: 1
        });
        var slider2 = $('.home-slider-single');
          slider2.slick({
            infinite: true,
            arrows: false,
            dots: true,
            autoplay: true,
            autoplaySpeed: 6000,
            customPaging : function(slider, a) {
              return '<button class="nav__item-2"><svg class="nav__icon"><use xlink:href="#icon-circle"></use></svg></button>';
            },
            slidesToShow: 1,
            fade: true,
            speed: 500,
            cssEase: 'linear',

          });
        $('.prev').on('click', function(){
          slider.slick('slickPrev');
        });
        $('.next').on('click', function(){
          slider.slick('slickNext');
        });
        slider.on('click', '.slide a', function(event) {
          event.preventDefault();
        });
        slider.on('click', '.slide.slick-current a', function(event) {
          event.preventDefault();
          var newLocation = $(this).attr('href');
          start_transition(newLocation);
        });
        $(window).on('resize', function(){
          var curentSlide = $('.home-slider-horizontal').slick('slickCurrentSlide');
          $('.home-slider-horizontal').slick('slickGoTo', curentSlide);
        });
      }
    }
  /*------------------
  Project slider
  -------------------*/
    function ProjectSlider(){
      if ($.exists('.project-slider')) {
        var slider = $('.project-slider').slick({
          slidesToShow: 1,
          lazyLoad: "progressive",
          dots: true,
          arrows: false,
          adaptiveHeight: false,
          infinite: true,
          customPaging : function(slider, i) {
            return '<button class="nav__item"><span class="nav__item-inner"></span></button>';
          },
        });
        $('.controls-navigate .prev').on('click', function(){
          slider.slick('slickPrev');
        });
        $('.controls-navigate .next').on('click', function(){
          slider.slick('slickNext');
        });    
      }
    }
  /*------------------
  Sticky header
  -------------------*/
    function StickyHeader(){
      if ($.exists('.auto-hide-header')) {
        var mainHeader = $('.auto-hide-header'),
        belowNavHeroContent = $('.sub-nav-hero'),
        headerHeight = mainHeader.height();
        var scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;
        $(window).on('scroll', function(){
        if( !scrolling ) {
          scrolling = true;
          (!window.requestAnimationFrame)
          ? setTimeout(autoHideHeader, 250)
          : requestAnimationFrame(autoHideHeader);
        }
        });
        $(window).on('resize', function(){
          headerHeight = mainHeader.height();
        });
        function autoHideHeader() {
          var currentTop = $(window).scrollTop();
          ( belowNavHeroContent.length > 0 ) 
          ? checkStickyNavigation(currentTop) : checkSimpleNavigation(currentTop);
          previousTop = currentTop;
          scrolling = false;
        }
        function checkSimpleNavigation(currentTop) {
        if (previousTop - currentTop > scrollDelta) {
          mainHeader.removeClass('is-hidden');
        } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
          mainHeader.addClass('is-hidden');
        }
        }
      }
    }
  /*------------------
  Grid gallery
  -------------------*/
    function Grid(){
      if ($.exists('.grid')) {
        $('.grid').imagesLoaded()
          .done( function( instance ) {
            $('.grid').isotope({
              itemSelector: '.grid-item',
              percentPosition: true,
            });
            $('.grid-item').css('visibility', 'visible');
            anime({
              targets: '.grid-item',
              translateX: [200, 0],
              opacity: [0, 1],
              duration: 1400,
              easing: 'easeOutExpo',
              delay: function(el, index) {
                return index * 100;
              }
            });  
          });
        // filter items on button click
        $('#filters').on( 'click', 'button', function() {
          var filterValue = $(this).attr('data-filter');
          $('.grid').isotope({ filter: filterValue });
        });
        $('#filters .btn-filter').on( 'click', function() {
          $(this).addClass('current');
          $(this).siblings().removeClass('current');
        });    
      }
      if ($.exists('#lightgallery')) {
        $("#lightgallery").lightGallery(); 
      }
      if ($.exists('#video-gallery')) {       
        $('#video-gallery').lightGallery({
          videojs: true,
          selector: '.grid-item a',
          thumbnail: true
        }); 
      }
    }
  /*------------------
  Paginat hover effect
  -------------------*/
    function Pager(){
      if ($.exists('.pager')) {
          $('.button.all').hover(function(){
            $('.all-text').css({opacity: '1'});
          }, 
          function(){
            $('.all-text').css({opacity: '0'});
          });
          $('.button.prev').hover(function(){
            $('.arrow-texts p').css({transform: 'translateY(-2px)'});
          }, 
          function(){
            $('.arrow-texts p').css({transform: 'translateY(-35px)'});
          });
          $('.button.next').hover(function(){
            $('.arrow-texts p').css({transform: 'translateY(-67px)'});
          }, 
          function(){
            $('.arrow-texts p').css({transform: 'translateY(-35px)'});
          });
      }
    }
  /*------------------
  Skills
  -------------------*/
    function Skills(){
      if ($.exists('.about-skills')) {
        $('.skills').addClass('active-bar');
        $('.skills .skill .skill-bar span').each(function() {
          $(this).animate({
            "width": $(this).parent().attr('data-bar') + "%"
          }, 1000);
          $(this).append('<b>' + $(this).parent().attr("data-bar") + '%</b>');
        });
        setTimeout(function() {
          $(".skills .skill .skill-bar span b").animate({"opacity":"1"},1000);
        }, 1400);
      }
    }
  /*------------------
  Validate form
  -------------------*/
    if ($.exists('#validForm')) {
        $("#validForm").validate({
            ignore: ":hidden",
            rules:{
                name:{
                    required: true,
                    minlength: 2,
                    maxlength: 16,
                },
                    email:{
                    required: true,
                    email: true,
                },
                    message:{
                    required: true,
                    minlength: 16,
                },
            },
            messages:{
                name:{
                    required: "<span>Please enter your name</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 16</span>",
                },
                email:{
                    required: "<span>Please enter your email</span>",
                    email: "<span>Please enter a valid email address.</span>",
                },
                message:{
                    required: "<span>Please write me message</span>",
                    minlength: "<span>Your message must consist of at least 16 characters</span>",
                    maxlength: "<span>The maximum number of characters - 100 </span>",
                },
            },
            submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "contact.php",
                data: $(form).serialize(),
                beforeSend: function() {
                    $('button').addClass('sanding').attr("disabled", true);
                    $('button').html('<i class="fa fa-refresh fa-pulse fa-fw"></i><span>sanding...</span>');
                },
                success: function (data) {
                    if (data == "Email sent!");
                    $('input, textarea').val('');
                     $('.form-group').blur(); 
                    $('button').html('<i class="fa fa-check" aria-hidden="true"></i><span>email sent</span>');
                    setTimeout(function(){
                        $('button').html('<i class="fa fa-paper-plane"></i><span>send message</span>');
                        $('button').removeClass('sanding').attr("disabled", false);
                    }, 1400);
                }
            });
            return false;
            }
        });
    }

