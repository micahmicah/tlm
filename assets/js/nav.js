require({

}, ["dojo/ready", "dojo/window", "dojo/on",
	"dojox/fx/scroll", "dojo/fx/easing", "dojo/dom-geometry",
	"dojo/dom-class", "dojo/dom-style", "dojo/query"],

	function (ready, win, on, scroll,
			easing, domGeom, domClass, domStyle, query) {

		ready(function() {
			// reference to the all important body tag
			var body = document.getElementsByTagName('body')[0];
			var canvas_el = document.getElementById('canvas');

			// all links to filter through
			var all_links = document.getElementsByTagName('a');

			// add a new css style on each resize
			// that defines with the img
			// height should be 
			var set_image_height = function () {
				var set_height = window.innerHeight * 0.79;
				var class_to_set = "img." + window.SUPPLEMENTAL.class_to_resize;
				var style = class_to_set + ' { max-height: ' +
								set_height + 'px; }';
				var style_el = document.createElement('style');
				style_el.type = "text/css";
				style_el.media = "screen";
				if(style_el.styleSheet){
					// ie
					style_el.styleSheet.cssText = style;
				} else {
					style_el.appendChild(document
											.createTextNode(style));
				}

				document.getElementsByTagName('head')[0]
						.appendChild(style_el);
			};
			// end determine window height

			// number of elements that will be scrolled through
			// used to mark progress
			var scroll_total = 0;
			var i;
			for (i=0; i < all_links.length; i++) {
				if(all_links[i].getAttribute("data-scroll_id")) {
					scroll_total += 1;
					// add click event to move between pieces
					on(all_links[i], "click", function (e) {
						var scroll_node = document.getElementById(
													this.getAttribute("data-scroll_id"));
						scroll({
							node: scroll_node,
							duration: 600,
							win: window,
							ease: easing["sineInOut"]
						}).play();
						close_drawer();
					});
				}
			}

			// set up interaction to open drawer
			// function to toggle drawer
			var close_drawer = function () {
				domClass.remove(body, "drawer_active");
			};
			var open_drawer = function () {
				domClass.add(body, "drawer_active");
			};
			var toggle_drawer = function () {
				if (domClass.contains(body, "drawer_active")) {
					close_drawer();
				} else {
					open_drawer();
				}
			};
			var drawer_activator_el = document.getElementById('drawer_activator');
			on(drawer_activator_el, "click", function (e) {
				toggle_drawer();
			});
			var nav_el = document.getElementById('nav');
			on(nav_el, "click", function (e) {
				if (window.innerWidth <= 480) {
					close_drawer();
				}
			});
			var drawer_wrapper_el = document.getElementById('drawer_wrapper');
			on(drawer_wrapper_el, "click", function (e) {
				if (window.innerWidth <= 480) {
					close_drawer();
				}
			});
			// end set up interaction to open drawer

			// set up interaction to close drawer
			// on any click thats not in the 
			// #drawer_activator
			var event_target = function (e) {
				var target;
				if (!e) {
					var e = window.event;
				}
				if (e.target) {
					target = e.target;
				} else if (e.srcElement) {
					target = e.srcElement;
				}
				return target;
			};
			var activator_children = drawer_activator_el
										.getElementsByTagName('*');
			var shade_el = document.getElementById("shade");
			on(shade_el, "click", function(e) {
				close_drawer();
			});
			var drawer_el = document.getElementById("drawer");
			on(drawer_el, "click", function(e) {
				close_drawer();
			});

			//* end smooth scrolling links

			// hide the detail image hints
			var hide_details = function () {
				return setTimeout( function () {
					var hints = query('.to_hide');
					var i;
					for(i=0; i < hints.length; i++) {
						domClass.add(hints[i], "faded");
					}
				}, 10000);
			};
			// end hide the detail image hints

			var children_have_class = function (el, cls) {
				var has_class = false;
				var children = el.getElementsByTagName("*");
				var i;
				for(i=0; i < children.length; i++) {
					if(children[i].nodeType === 1) {
						if(domClass.contains(children[i], cls)){
							return true;
						}
					}
				}
				return has_class;
			};

			// on resize
			var wait_for_final_resize = (function () {
				var timers = {};
				return function (callback, ms, unique_id) {
					if(!unique_id) {
						unique_id = "Don't call 2x without unique_id";
					}
					if (timers[unique_id]) {
						clearTimeout(timers[unique_id]);
					}
					timers[unique_id] = setTimeout(callback, ms);
				};
			})();
			on(window, "resize", function (e) {
				wait_for_final_resize(function() {
					// should not update if at the
					// top of the window anyway.
					if (manually_resize_images) {
						// set img height initially
						set_image_height();
					}
				}, 200, "resize");
			});
			// end on resize

			//* lightbox
			var lightbox_el = document.getElementById('lightbox');
			if(lightbox_el) {
				var to_lightbox = query("img." +
										window.SUPPLEMENTAL.class_to_lightbox);
				var hint_to_lightbox = query(".detail_hint");

				var k;
				for(k=0; k < to_lightbox.length; k++) {
					on(to_lightbox[k], "click", function (e) {
						var current_id = this.getAttribute("data-lightbox_id");

						var lightbox_el = document.getElementById('lightbox');
						lightbox_el.className = "active";
						lightbox_el.setAttribute("data-exposing", current_id);

						var id_to_expose = "lightbox_" + current_id;

						var node_to_expose = document.getElementById(id_to_expose);
						node_to_expose.className = "active";
					});
					on(hint_to_lightbox[k], "click", function (e) {
						var current_id = this.getAttribute("data-lightbox_id");

						var lightbox_el = document.getElementById('lightbox');
						lightbox_el.className = "active";
						lightbox_el.setAttribute("data-exposing", current_id);

						var id_to_expose = "lightbox_" + current_id;

						var node_to_expose = document.getElementById(id_to_expose);
						node_to_expose.className = "active";
					});
				}

				on(lightbox_el, "click", function (e) {
						var lightbox_el = document.getElementById('lightbox');
						lightbox_el.className = "";

						var exposing_index = lightbox_el.getAttribute("data-exposing");

						var exposed_id = 'lightbox_' + exposing_index;

						var node_to_hide = document.getElementById(exposed_id);
						node_to_hide.className = "";

						lightbox_el.setAttribute("data-exposing", "");
				});
			}
			//* end lightbox


			var manually_resize_images = true;
			if (manually_resize_images) {
				// set image height initially
				set_image_height();
			}

			// svg fallback
			if(!Modernizr.inlinesvg) {
				var svg = query('.svg_wrapper');
				if(svg.length > 0) {
					var i;
					for(i=0; i < svg.length; i++) {
						var fallback = document.createElement("div");
						fallback.className = "detail_fallback";

						svg[i].innerHTML = '';
						svg[i].appendChild(fallback);
					}
				}
			}
			// end svg fallback
		});
	});