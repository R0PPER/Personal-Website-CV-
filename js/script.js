$(document).ready(function () {
    const container = $('.container');
    const sections = $('.section');
    const homeContainer = $('.home');
    const aboutContainer = $('.about');
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
    
    // // Function to zoom the image
    // function zoomImage(index) {
    //     // Find the image within the current section
    //     var currentSection = sections.eq(index - 1); // Get the current section based on the index
    //     image = currentSection.find('.background-img');
    //     currentSection.css('transition', 'transform 1.4s'); // Set the transition property for the current section

    //     // Toggle the 'zoomed' class to scale the image
    //     image.css('transition', 'transform 7s'); // Set the transition property for the image
    //     image.toggleClass('zoomed'); // Toggle the 'zoomed' class of the image
    //     image.css('transform', image.hasClass('zoomed') ? 'scale(1.1)' : 'scale(1)'); // Scale the image based on the 'zoomed' class
    // }

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
        anchors: ['Home', 'About', 'Testimonials', 'Contact'],
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
        touchSensitivity: 10,
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

            // // Find the image within the current section
            // var image = sections.eq(index - 1).find('.background-img');

            // // Check if the image is already zoomed
            // if (image.hasClass('zoomed')) {
            //     // If it's already zoomed, animate it back to 100%
            //     image.css('transition', 'transform 0.7s'); // Set the transition property for the image
            //     image.css('transform', 'scale(1)'); // Reset the scale of the image
            //     image.removeClass('zoomed'); // Remove the 'zoomed' class from the image
            // }
        },

        afterLoad: function(anchorLink, index){ 
               
            // zoomImage(index); // Call the zoomImage function with the current index
        
            // Remove active class from all sections
            sections.removeClass('active');
        
            // Add the 'active' class to the section with the current index
            var activePage = sections.eq(index - 1).addClass('active');

            // IIFE to hide .container in all sections except the active one
            (() => {
              sections.not(activePage).find('.container').removeClass('container-transition').css({
                opacity: 0,
                visibility: 'hidden'
              });
            })();

            // IIFE to show the .container in the active section
            (() => {
              activePage.find('.container').addClass('container-transition').css({
                opacity: 1,
                visibility: 'visible'
              });
            })();
        
            // Reset the color of all 'a' elements inside '.sf-menu li' to the default color
            // menuLinks.forEach(function(link) {
            //   link.classList.remove('active-menu'); // Remove the "active-menu" class
            //   link.style.color = '#f5f5f5'; // Set the color to the default color
      
              // link.addEventListener('mouseenter', () => {
              //     if (!link.classList.contains('active-menu')) {
              //         // Change the color on hover only if it's not the active page
              //         link.style.color = '#ff8a26'; // Set the hover color
              //     }
              // });
      
              // link.addEventListener('mouseleave', () => {
              //     if (!link.classList.contains('active-menu')) {
              //         // Revert back to default color when not hovered and not active
              //         link.style.color = '#f5f5f5'; // Set the default color
              //     }
              // });   
            // });

            
        
            // Add the "active-menu" class to the menu item corresponding to the active section
            // if (index === activePage.index() + 1) {
            //     menuLinks[index - 1].classList.add('active-menu'); // Add the "active-menu" class
            //     menuLinks[index - 1].style.color = '#ff8a26'; // Set the desired color          
            // }

            
             // Function to handle active menu item highlighting
      function setActiveMenuItem() {
        const currentPageHash = window.location.hash;

        $('.sf-menu li a').removeClass('active'); // Remove 'active' class from all menu items

        $('.sf-menu li a').each(function () {
          const menuItemHash = $(this).attr('href');

          if (menuItemHash === currentPageHash) {
            $(this).addClass('active'); // Add 'active' class to the current menu item
            $(this).css('color', '#ff8a26'); // Set the desired color for the active menu item
          } else {
            $(this).css('color', '#f5f5f5'); // Set the default color for non-active menu items
          }
        });
      }

      // Call the setActiveMenuItem function initially to highlight the active menu item
      setActiveMenuItem();

      // Add event listener to handle menu item click (to update active item if necessary)
      $('.sf-menu li a').click(function () {
        setActiveMenuItem();
      });

      // Add custom hover effect
      $('.sf-menu li a').hover(function () {
        if (!$(this).hasClass('active')) {
          // Change the color on hover only if it's not the active page
          $(this).css('color', '#ff8a26'); // Set the hover color
        }
      }, function () {
        if (!$(this).hasClass('active')) {
          // Revert back to default color when not hovered and not active
          $(this).css('color', '#f5f5f5'); // Set the default color
        }
      });
            
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
//Document Query ends here!!
                    

/**
  Swiper:
  https://swiperjs.com/
**/
const swiper = new Swiper(".swiperCarousel", {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 10,
  keyboard: {
    enabled: true,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slides = document.getElementsByClassName("swiper-slide");
for (const slide of slides) {
  slide.addEventListener("click", () => {
    const { className } = slide;
    if (className.includes("swiper-slide-next")) {
      swiper.slideNext();
    } else if (className.includes("swiper-slide-prev")) {
      swiper.slidePrev();
    }
  });
}

function resizeTextToFit() {
  const quoteEls = document.getElementsByClassName('quote');
  for (const el of quoteEls) {
    el.style.width = el.offsetWidth;
    el.style.height = el.offsetHeight;
  }
  textFit(quoteEls, { maxFontSize: 14 });
}
resizeTextToFit();
addEventListener("resize", (event) => {
  resizeTextToFit();
});
