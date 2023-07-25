$(document).ready(function () {
    // Cache jQuery selectors
    var sections = $('.section'); // Select all elements with the class 'section'
    var contactContainer = $('.contact-container'); // Select the element with the class 'contact-container'
    var menuLinks = document.querySelectorAll('.sf-menu li a'); // Select all 'a' elements inside '.sf-menu li'

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
        image = currentSection.find('img'); // Find the 'img' element within the current section
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
        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: false,

        // Event callbacks
        afterRender: function() {},
        onLeave: function (index, nextIndex, direction) {
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
            // Check if the current index is 5 (Contact section)
            if (index === 5) {
                contactContainer.fadeIn(); // Fade in the contact container
                document.querySelector('.contact').style.display = 'flex'; // Set the display property of the contact element to 'flex'
            } else {
                contactContainer.fadeOut(); // Fade out the contact container
            }  
        
            zoomImage(index); // Call the zoomImage function with the current index
        
            // Remove active class from all sections
            sections.removeClass('active');
        
            // Add the 'active' class to the section with the current index
            var activePage = sections.eq(index - 1).addClass('active');
        
            // Find all 'a' elements inside '.sf-menu li'
            var menuLinks = document.querySelectorAll('.sf-menu li a');
        
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
        }
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
});
                    