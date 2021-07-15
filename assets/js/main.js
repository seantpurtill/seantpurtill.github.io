/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {


	skel.breakpoints({
		wide: '(min-width: 961px) and (max-width: 1880px)',
		normal: '(min-width: 961px) and (max-width: 1620px)',
		narrow: '(min-width: 961px) and (max-width: 1320px)',
		narrower: '(max-width: 960px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {
		var x = document.body.children[1].children[0].children[0].children[0].children[1];
		//var x = $('location');
		
		getLocation();

		function getLocation() {
			if (navigator.geolocation) {
				x.innerHTML = 'geolocation';
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				x.innerHTML = "Geolocation is not supported by this browser.";
				window.location.href = "google.ca";
			}
		}

		function showPosition(position) {
			
			var userLocation = "Latitude: " + position.coords.latitude +
				" <br>Longitude: " + position.coords.longitude;
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			
			if(userLocation === null || undefined) 
			{
				x.innerHTML = "userlocation is null";
			}

			//Latitude: 51.134463999999994
			//Longitude: -114.081792
			x.innerHTML = userLocation;
			if (lat <= lat + 0.0000009 && lon >= lon - 0.0000009) {
				debugger
				var yourLocation = "Latitude: " + position.coords.latitude +
				" <br>Longitude: " + position.coords.longitude + "......";

				yourLocation += 'You are nearby Sculpture ' + navigator.permissions.query({name:'geolocation'}).toString();
				x.innerHTML = yourLocation;

				var s1Lat = 51.1574016;
				var s1Long = -114.06213120000001
				var s1 = 'lat: ' + s1Lat + ', long' + s1Long;

				x.innerHTML = 'you are at ' + userLocation + 'and sculpture 1 is at ' + s1; 
			}

			x.innerHTML = 'outside locations';
			x.innerHTML -= 'still correct location' + userLocation;
		}


		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly();

		// Nav.
			var $nav_a = $('#nav a');

			// Scrolly-fy links.
				$nav_a
					.scrolly()
					.on('click', function(e) {

						var t = $(this),
							href = t.attr('href');

						if (href[0] != '#')
							return;

						e.preventDefault();

						// Clear active and lock scrollzer until scrolling has stopped
							$nav_a
								.removeClass('active')
								.addClass('scrollzer-locked');

						// Set this link to active
							t.addClass('active');

					});

			// Initialize scrollzer.
				var ids = [];

				$nav_a.each(function() {

					var href = $(this).attr('href');

					if (href[0] != '#')
						return;

					ids.push(href.substring(1));

				});

				$.scrollzer(ids, { pad: 200, lastHack: true });

		// Header (narrower + mobile).

			// Toggle.
				$(
					'<div id="headerToggle">' +
						'<a href="#header" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);
			// Header.
				$('#header')
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'header-visible'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#headerToggle, #header, #main')
						.css('transition', 'none');

	});

})(jQuery);