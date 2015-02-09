/**
 * GLS jQuery plugin
 */
$(document).ready(function(){
    'use strict';
    (function($) {
		
        /** 
		 * function to display the lightbox with overlay
		*/
        $.fn.lightbox = function() {
            var windowHeight = window.innerHeight || $(window).height(),
	            windowWidth  = window.innerWidth  || $(window).width();

            // Display the overlay
            $('<div id="overlay"></div>')
            .css({'opacity' : '0.9'})
            .appendTo('body');

            // Create the lightbox container
            $('<div id="lightbox"></div>')
            .hide()
            .appendTo('body');

            // Display the image on load
            $('<img>')
            .attr('src', $(this).attr('src'))
            .css({
                'max-height': windowHeight * 0.75, 
                'max-width':  windowWidth * 0.75
            })
            .load(function() {
                $('#lightbox')
                .css({
                    'top':  (windowHeight - $('#lightbox').height()) / 2,
                    'left': (windowWidth - $('#lightbox').width())  / 2,
                })
                .fadeIn();
            })
            .appendTo('#lightbox');

            // Display the image title
            $('<div id="title-main"></div>')
            .appendTo('#lightbox');

            $('<p id="title"></p>')
            .appendTo('#title-main')
            document.getElementById("title").innerHTML = $(this).attr('title');

			/**
			 * remove Lightbox
			*/

            // Remove Lightbox by ESC button
            $(document).keyup(function(event) {
                if ( event.which == 27 ) {
                    $('#overlay, #lightbox').remove();
                }
            });
			
            // remove Lightbox by click
            $('#overlay, #lightbox').click(function() {
                $('#overlay, #lightbox').remove();
            });
            return this;
        };

        /**
        * Slideshow function
        *
        * @param replace array params with the slideshow parameters
		*
		*/
        $.fn.slideshow = function(params) {
            var options = $.extend({
                'height': 300,
                'fadeTime': 300,
                'intervalTime': 1000,
                'disc': true
            }, params),
            numberOfImages = $(this).children().length,
            discMenu = $('<ul id="disc"></ul>'),
            dothtml = '<li class="dot selected"><a href="#">0</a></li>',
            image = $(this).children(),
            allImages = image.children(),
            intervalTime  = options.intervalTime,
            fade          = options.fadeTime,
            height        = options.height,
            disc,
            intervalID;

            // set #slideshow and images max height
            $(this).css({'height': height + 'px'});
            allImages.css({'height': height + 'px'});

            if(options.disc) {
                // make a single list for each image
                for(var i=1;i<numberOfImages;i++) {
                    dothtml += '<li class="dot deselected"><a href="#">' + i + '</a></li>';
                }

                // create the disc menu
                discMenu.append(dothtml);
                discMenu.insertAfter($(this));

                disc = $('#disc').children();

                // upon clicking one of the disc items
                disc.click(function(event) {
                    event.preventDefault();
                    var currentImageIndex = $(this).text(); // get value of clicked image
                    clearInterval(intervalID);
                    fadeOutAndIn(image.eq(currentImageIndex));

                    // restart the interval
                    setTimeout(function() {
                        makeInterval();
                    }, fade);
                });
            }
			
            // set zIndex and opacity for all iamges
            image.css({'zIndex': '1', 'opacity': '1'});

            // add class .visible to first image
            image.eq(0).addClass('visible').css({'zIndex': '3', 'position': 'relative'});

            /**
             * Function to change focus from one dot to another
             */
            function changeDotFocus(currentDot, nextDot) {
              currentDot
                .removeClass('selected')
                .addClass('deselected');
              nextDot
                .removeClass('deselected')
                .addClass('selected');
            }

            /**
             * Function to swap the current and next image
             */
            function fadeOutAndIn(currentImage) {

              var current = $('.visible'),
                  next;
              
              // if empty, get the index of the next image
              if(!currentImage) {

                // if the current image is the last in the list, set index of the first image
                if(current.index() === numberOfImages -1) {
                  next = 0;
                }
                // set the next image
                else {
                  next = current.index() + 1;
                }
                
                currentImage = image.eq(next);
              }
              
              // if not current image, swap images.
              if(current.index() !== currentImage.index()) {
              
                // set next image zIndex > previous image zIndex
                currentImage.css({'zIndex': '2'});
                
                if(options.disc) {
                  // change the selected dot
                  changeDotFocus(disc.eq(current.index()), disc.eq(currentImage.index()));
                }
                
                // fade out to the current image
                current.fadeTo(fade, 0.0, function() {
                
                  // hide current image
                  current
                    .removeClass('visible')
                    .css({'zIndex': '1', 'opacity': '1'});
                  
                  // display next image
                  currentImage
                    .addClass('visible')
                    .css({'zIndex': '3'});
                });
              }
            }

            /**
             * Function to set the interval execution
             */
            function makeInterval() {
              intervalID = setInterval(function() {
                fadeOutAndIn();
              }, intervalTime);
            }

            // initiate interval execution
            makeInterval();
            return this;
        };

        /**
         * Gallery function to display a list of images in a gallery
         *
         * @param replay array params with Gallery parameters
         */
        $.fn.gallery = function(params) {
          $('#gallery').children().addClass('gallery-item');
          var options = $.extend({
            'imgCounter': true,
            'width': 165,
            'height': 95
          }, params),

          picWidth = options.width,
          picHeight = options.height,
          list = $(this).children(),
          image = list.children(),
          numberOfImages = list.size();

          // set the image width and height
          image.css({'width': picWidth + 'px', 'height': picHeight + 'px'});

          // add eventlistener to gallery items
          image.click(function() {
			  
            // index of a clicked item
            var imageId = $(this).parent().index();
            
            // load the selected image
            loadImg($(this), imageId);
          });


          /**
           * Function to display the selected image
           *
           * @param object obj of the clicked item
           * @param integer imageId for the index of the clicked item
           *
           */
          function loadImg(obj, imageId) {
            $('#lightbox, #overlay').remove();
            obj.lightbox();
            createArrowLinks(imageId);
          }
          
          /**
           * Function to create the navigation arrows
           *
           * @param integer imageId for the index of the shown image
           */
          function createArrowLinks(imageId) {
          
            // establish image placement coordinates
            var top = ($(window).height() - $('#lightbox').height()) / 2,
            side = ($(window).width() - $('#lightbox').width()) / 2,
            middle = $('#lightbox').height() / 2,
            
            previousImage,
            nextImage;
            
            // if not the first item in the list, create left arrow
            if(imageId !== 0) {
            
              // previous image object
              previousImage = $(list).eq(imageId - 1).children();
            
              // create the left arrow
              $('<div id="arrow-left-icon"></div>')
              .appendTo('#lightbox')
              .css({left: '-25px', top: middle})
              .click(function() {
                loadImg(previousImage, imageId - 1);
              });
            }
            
            // if not the last item in the list, create right arrow
            if(imageId + 1 !== numberOfImages) {
            
              // next image object
              nextImage = $(list).eq(imageId + 1).children();
            
              // create the right arrow
              $('<div id="arrow-right-icon"></div>')
              .appendTo('#lightbox')
              .css({right: '-25px', top: middle})
              .click(function() {
                loadImg(nextImage, imageId + 1);
              });
            }

            // display the image counter if requested
            if(options.imgCounter) {
              imgCounter(imageId, top, side);
            }
          }
          
          /**
           * Function to show the image counter within the gallery
           *
           * @param integer imageId, number of image currently being shown
           *
           */
          function imgCounter(imageId) {
          
            // append the counter container
            $('<div id="counter"></div>')
            .appendTo('#lightbox');

            // append the counter text
            $('<span></span>')
            .appendTo('#counter')
            .text((imageId + 1) + '/' + numberOfImages);
          }
        return this;
        };
    }) (jQuery);

    // add eventlistener to display the lighbox with overlay
    $('.lightbox').click(function() {
        $(this).lightbox(); 
    });
});