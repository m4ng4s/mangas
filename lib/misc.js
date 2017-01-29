/*
* @Author: Imam
* @Date:   2017-01-24 23:18:46
* @Last Modified by:   Imam
* @Last Modified time: 2017-01-29 02:04:59
*/

'use strict';

export const init_spotlight = (next) => {
	/* set vars */
	var firstChar = false,
	    visible = false,
	    pissed = false,
	    $document = $(document),
	    $spotlightWrapper = $('#spotlight_wrapper'),
	    $spotlight = $('#spotlight');

	function hideSpotlight(){
	  $spotlightWrapper.hide();
	  $spotlight.val('');
	  visible = false;
	}

	function showSpotlight(){
	  $spotlightWrapper.show();
	  $spotlight.focus();
	  visible = true;
	}


	/* add listener for keydown to detect shortcut */
	$document.on('keydown',function(event){
	  //17 = CTRL
	  //32 = SPACE
	  
	  //save char code in var if it is ctrl
	  if(event.which == 17){
	    firstChar = event.which;
	  }
	  
	  //if firstchar is ctrl and the current keydown event char is space, continue
	  if(firstChar == 17 && event.which == 32){

	    //check if spotlight is already visible
	    if(!visible){

	      //show spotlight
	      showSpotlight();

	    } else {

	      //hide spotlight
	      hideSpotlight();

	    }
	    
	    //delete firstchar var
	    firstChar = false;
	    
	  }  
	  
	  
	  if(event.which == 13 && !pissed){
	    // alert('You really thought it would search anything? :-P');
	    // alert('Possibly in upcoming versions... Who knows? :-)');
	 	if(typeof next == 'function') next()
	    pissed = true;
	  }
	  
	});

	// delete firstchar var on keyup to ensure "shortcut" behaviour and that ther spotlight doesn't show up if not wanted
	$document.on('keyup',function(){
	  firstChar = false;
	});

	// stop propagating if clicked within the spotlight
	$spotlight.on('click', function(e){
	    e.stopPropagation();
	});

	// hide spotlight when clicked anywhere
	$document.on('click',function(){
	  hideSpotlight();
	});

}

export const init_style = (next) => {
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});
		$(function() {

			var	$window = $(window),
				// $body = $('#root'),
				$body = $('#body'),
				$header = $('#header'),
				$footer = $('#footer');

			// Disable animations/transitions until the page has loaded.
				$body.addClass('is-loading');

				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-loading');
					}, 100);
				});

			// Fix: Placeholder polyfill.
				$('form').placeholder();

			// Prioritize "important" elements on medium.
				skel.on('+medium -medium', function() {
					$.prioritize(
						'.important\\28 medium\\29',
						skel.breakpoint('medium').active
					);
				});

			// Header.
				$header.each( function() {

					var t 		= jQuery(this),
						button 	= t.find('.button');

					button.click(function(e) {

						t.toggleClass('hide');

						if ( t.hasClass('preview') ) {
							return true;
						} else {
							e.preventDefault();
						}

					});

				});

			// Footer.
				$footer.each( function() {

					var t 		= jQuery(this),
						inner 	= t.find('.inner'),
						button 	= t.find('.info');

					button.click(function(e) {
						t.toggleClass('show');
						e.preventDefault();
					});

				});

		});
}

export const detectBottomScroll = (element_out, element_in, next) => {
	if ((window.innerHeight + window.scrollY) >= (element_in.offsetHeight + (29*2))) {
	    if(typeof next == 'function') {
	    	next()
	    }
	}
}

window.init_style = init_style