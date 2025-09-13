(function ($) {
"use strict";

// preloader js 
function loader() {
	$(window).on('load', function () {
		$('#ctn-preloader').addClass('loaded');
		$("#loading").fadeOut(500);
		// Una vez haya terminado el preloader aparezca el scroll

		if ($('#ctn-preloader').hasClass('loaded')) {
			// Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
			$('#preloader').delay(900).queue(function () {
				$(this).remove();
			});
		}
	});
}
loader();

// Menu Nav
function smoothScrollTop() {
	$('.smooth-scroll').on('click', function (event) {
		var target = $(this.getAttribute('href'));
		if (target.length) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 100
			}, 1000);
		}
	});
}
smoothScrollTop();

// meanmenu
$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "991"
});


$('.side-info-close,.offcanvas-overlay,.mean-nav > ul > li > a').on('click', function () {
	$('.side-info').removeClass('info-open');
	$('.offcanvas-overlay').removeClass('overlay-open');
})
$('.side-toggle,.mean-nav > ul > li > .mean-expand').on('click', function () {
    $('.side-info').addClass('info-open');
    $('.offcanvas-overlay').addClass('overlay-open');
})



// One Page Nav
var top_offset = $('.header__area').height() - 40;
$('.main-menu nav ul').onePageNav({
	currentClass: 'active',
	scrollOffset: top_offset,
});


$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$(".header-sticky").removeClass("sticky");
	} else {
		$(".header-sticky").addClass("sticky");
	}
});

// data background
$("[data-background]").each(function () {
    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
});


// Search 
var $searchWrap = $('.search-wrap');
var $navSearch = $('.nav-search');
var $searchClose = $('#search-close');

$('.search-trigger').on('click', function (e) {
	e.preventDefault();
	$searchWrap.animate({ opacity: 'toggle' }, 500);
	$navSearch.add($searchClose).addClass("open");
});

$('.search-close').on('click', function (e) {
	e.preventDefault();
	$searchWrap.animate({ opacity: 'toggle' }, 500);
	$navSearch.add($searchClose).removeClass("open");
});

function closeSearch() {
	$searchWrap.fadeOut(200);
	$navSearch.add($searchClose).removeClass("open");
}

$(document.body).on('click', function (e) {
	closeSearch();
});

$(".search-trigger, .main-search-input").on('click', function (e) {
	e.stopPropagation();
});



// mainSlider
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: false,
		autoplaySpeed: 10000,
		dots: false,
		fade: true,
		arrows: false,
		responsive: [
			{ breakpoint: 767, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}
mainSlider();


// team slider 
$('.team__active').slick({
	dots: true,
	arrows:false,
	infinite: true,
	centerMode: true,
	centerPadding: '0',
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
	  {
		breakpoint: 1024,
		settings: {
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  infinite: true,
		  dots: true
		}
	  },
	  {
		breakpoint: 991,
		settings: {
		  slidesToShow: 2,
		  slidesToScroll: 1
		}
	  },
	  {
		breakpoint: 767,
		settings: {
		  slidesToShow: 1,
		  slidesToScroll: 1
		}
	  }
	  // You can unslick at a given breakpoint now by adding:
	  // settings: "unslick"
	  // instead of a settings object
	]
});

// testimonial slider 
$('.testimonial__active').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	fade: true,
	arrows:false,
	dots:true,
});


// owlCarousel
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:0,
	items:1,
	navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    nav:true,
	dots:false,
    responsive:{
        0:{
            items:1
        },
        767:{
            items:3
        },
        992:{
            items:5
        }
    }
})


/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


// isotop
$('.grid').imagesLoaded( function() {
	// init Isotope
	var $grid = $('.grid').isotope({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  masonry: {
		// use outer width of grid-sizer for columnWidth
		columnWidth: '.grid-item',
	  }
	});
});

// filter items on button click
$('.portfolio-menu').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

//for menu active class
$('.portfolio-menu button').on('click', function(event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});

// back to top 
$("#scrollToTop").on('click',function(){
	$("body, html").animate({scrollTop : 0}, 500);
	return false;
});

// scrollToTop
$.scrollUp({
	scrollName: 'scrollUp', // Element ID
	topDistance: '300', // Distance from top before showing element (px)
	topSpeed: 300, // Speed back to top (ms)
	animation: 'fade', // Fade, slide, none
	animationInSpeed: 200, // Animation in speed (ms)
	animationOutSpeed: 200, // Animation out speed (ms)
	scrollText: '<i class="fal fa-arrow-up"></i>', // Text for element
	activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
});

// WOW active
new WOW().init();


})(jQuery);