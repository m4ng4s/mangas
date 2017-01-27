/*
* @Author: Imam
* @Date:   2017-01-24 23:18:46
* @Last Modified by:   Imam
* @Last Modified time: 2017-01-25 00:04:33
*/

'use strict';

export const init_style = () => {
		console.log('skel ', skel)
		console.log('$ ', $)
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

window.init_style = init_style