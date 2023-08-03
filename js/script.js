$(document).ready(function () {
    const container = $('.container');
    const sections = $('.section');
    const homeContainer = $('.home');
    const aboutContainer = $('.about');
    const projectsContainer = $('.projects');
    const testimonialsContainer = $('.testimonials');
    const contactContainer = $('.contact');
    const menuLinks = document.querySelectorAll('.sf-menu li a');


    // Cache frequently used elements
    var image; // Variable to store the current image

    // Event delegation for focus and blur events on contact fields
    contactContainer.on('blur', 'input', function () {
        if (this.value === '') {
            this.setAttribute('placeholder', this.getAttribute('placeholder'));
        } else {
            this.removeAttribute('placeholder');
        }
    });
    
    // Function to zoom the image
    function zoomImage(index) {
        // Find the image within the current section
        var currentSection = sections.eq(index - 1); // Get the current section based on the index
        image = currentSection.find('.background-img');
        currentSection.css('transition', 'transform 1.4s'); // Set the transition property for the current section

        // Toggle the 'zoomed' class to scale the image
        image.css('transition', 'transform 7s'); // Set the transition property for the image
        image.toggleClass('zoomed'); // Toggle the 'zoomed' class of the image
        image.css('transform', image.hasClass('zoomed') ? 'scale(1.1)' : 'scale(1)'); // Scale the image based on the 'zoomed' class
    }

    // Event delegation for focus and blur events on contact fields
    contactContainer.on('focus', 'input', function () {
      if (this.value === '') {
        this.placeholder = '';
      }
    });

  contactContainer.on('blur', 'input', function () {
    if (this.value === '') {
      var inputId = this.id;
      var field = contactFields.find(function (field) {
        return field.input === inputId;
      });
      if (field) {
        this.placeholder = field.placeholder;
      }
    }
  });

    // Initialize the pagepiling plugin
    $('#pagepiling').pagepiling({


        // Configuration options
        menu: null,
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: [],
        anchors: ['Home', 'About', 'Projects', 'Testimonials', 'Contact'],
        scrollingSpeed: 700,
        startingSection: 1, // Set the starting section index to 1 (home page)
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        navigation: {
            'textColor': '',
            'bulletsColor': '',
            'position': 'right',
            'tooltips': []
        },
        normalScrollElements: '*',
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: false,

        // Event callbacks
        afterRender: function() {
          var isScrolling = false;

          $(window).on('wheel', function(event) {
            if (isScrolling) return;

            isScrolling = true;

            var deltaY = event.originalEvent.deltaY;

            if (deltaY < 0) {
              // Mousewheel up event
              $.fn.pagepiling.moveSectionUp();
            } else if (deltaY > 0) {
              // Mousewheel down event
              $.fn.pagepiling.moveSectionDown();
            }

            setTimeout(function() {
              isScrolling = false;
            }, 1000); // Set the timer to 1 second (1000 milliseconds)
          });
        },
        onLeave: function (index, nextIndex, direction) { 

            // container.css('z-index', '1'); //Reset the containers index to 1 on leave

            // Find the image within the current section
            var image = sections.eq(index - 1).find('img');

            // Check if the image is already zoomed
            if (image.hasClass('zoomed')) {
                // If it's already zoomed, animate it back to 100%
                image.css('transition', 'transform 0.7s'); // Set the transition property for the image
                image.css('transform', 'scale(1)'); // Reset the scale of the image
                image.removeClass('zoomed'); // Remove the 'zoomed' class from the image
            }
        },
        afterLoad: function(anchorLink, index){
            // afterLoadCallback();
            // Check if the current index is 1 (Home section)
            // if (index === 1) {
            //   homeContainer.css('display', 'flex');
            //   container.css('z-index', '6');
            // } else {
            //   homeContainer.css('display', 'none');
            // }

            //  // Check if the current index is 5 (about section)
            // if (index === 2) {
            //   aboutContainer.css('display', 'flex'); // Set the display property of the about element to 'flex'
            //   container.css('z-index', '6');
            // } else {
            //   aboutContainer.css('display', 'none'); // Fade out the about container
            // } 

            //  // Check if the current index is 5 (projects section)
            // if (index === 3) {
            //   projectsContainer.css('display', 'flex'); // Set the display property of the projects element to 'flex'
            //   container.css('z-index', '6');
            // } else {
            //   projectsContainer.css('display', 'none'); // Fade out the projects container
            // } 

            //  // Check if the current index is 5 (testimonials section)
            // if (index === 4) {
            //   testimonialsContainer.css('display', 'flex'); // Set the display property of the testimonials element to 'flex'
            //   container.css('z-index', '6');
            // } else {
            //   testimonialsContainer.css('display', 'none'); // Fade out the testimonials container
            // }           

            // // Check if the current index is 5 (Contact section)
            // if (index === 5) {
            //     contactContainer.css('display', 'flex'); // Set the display property of the contact element to 'flex'
            //     container.css('z-index', '6');
            // } else {
            //   contactContainer.css('display', 'none');
            // }
        
            zoomImage(index); // Call the zoomImage function with the current index
        
            // Remove active class from all sections
            sections.removeClass('active');
        
            // Add the 'active' class to the section with the current index
            var activePage = sections.eq(index - 1).addClass('active');
        
            // Reset the color of all 'a' elements inside '.sf-menu li' to the default color
            menuLinks.forEach(function(link) {
              link.classList.remove('active-menu'); // Remove the "active-menu" class
              link.style.color = '#f5f5f5'; // Set the color to the default color
      
              link.addEventListener('mouseenter', () => {
                  if (!link.classList.contains('active-menu')) {
                      // Change the color on hover only if it's not the active page
                      link.style.color = '#ff8a26'; // Set the hover color
                  }
              });
      
              link.addEventListener('mouseleave', () => {
                  if (!link.classList.contains('active-menu')) {
                      // Revert back to default color when not hovered and not active
                      link.style.color = '#f5f5f5'; // Set the default color
                  }
              });   
            });
        
            // Add the "active-menu" class to the menu item corresponding to the active section
            if (index === activePage.index() + 1) {
                menuLinks[index - 1].classList.add('active-menu'); // Add the "active-menu" class
                menuLinks[index - 1].style.color = '#ff8a26'; // Set the desired color          
            }

        },
    });
    

// Refactored code for handling contact fields
  const contactFields = [
    { input: 'name', placeholder: 'Your Name' },
    { input: 'email', placeholder: 'Your Email' },
    { input: 'message', placeholder: 'Message' }
  ];

  contactFields.forEach(function (field) {
    const input = document.getElementById(field.input);

    input.addEventListener('focus', function () {
      if (this.value === '') {
        this.placeholder = '';
      }
    });

    input.addEventListener('blur', function () {
      if (this.value === '') {
        this.placeholder = field.placeholder;
      }
    });
  });


  const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty("--progress", 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      }
    } 
  });

});
                    