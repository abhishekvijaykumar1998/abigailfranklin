'use strict';

// Copyright (c) 2022 codewithsadee
// Copyright (c) 2026 Abhishek Vijaykumar
// MIT License

// element toggle function
var elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
var sidebar = document.querySelector("[data-sidebar]");
var sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
var testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
var modalContainer = document.querySelector("[data-modal-container]");
var modalCloseBtn = document.querySelector("[data-modal-close-btn]");
var overlay = document.querySelector("[data-overlay]");

// modal variable
var modalImg = document.querySelector("[data-modal-img]");
var modalTitle = document.querySelector("[data-modal-title]");
var modalText = document.querySelector("[data-modal-text]");

// modal toggle function
var testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (var i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    // Try to get avatar - if it doesn't exist, use a placeholder
    var avatarElement = this.querySelector("[data-testimonials-avatar]");
    if (avatarElement) {
      modalImg.src = avatarElement.src;
      modalImg.alt = avatarElement.alt;
    } else {
      // Use a placeholder or default image if avatar not found
      modalImg.src = "./assets/images/avatar-placeholder.png";
      modalImg.alt = "Testimonial Author";
    }
    
    // Get title and subtitle
    var titleElement = this.querySelector("[data-testimonials-title]");
    var subtitleElement = this.querySelector("[data-testimonials-subtitle]");
    
    // Build the modal title HTML with both name and subtitle
    var modalTitleHTML = '';
    if (titleElement) {
      modalTitleHTML += '<h4 class="h3">' + titleElement.innerHTML + '</h4>';
    }
    if (subtitleElement) {
      modalTitleHTML += '<h5 class="h5" style="color: var(--light-gray-70); margin-top: 5px;">' + subtitleElement.innerHTML + '</h5>';
    }
    modalTitle.innerHTML = modalTitleHTML;
    
    // Get testimonial text
    var textElement = this.querySelector("[data-testimonials-text]");
    if (textElement) {
      modalText.innerHTML = textElement.innerHTML;
    }

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// ----
// SIMPLIFIED PORTFOLIO FILTER - Safari Compatible Version
// ----

function initPortfolioFilters() {
  // Get ALL select buttons (one for Articles, one for Podcast)
  var allSelectButtons = document.querySelectorAll("[data-select]");
  
  console.log('Found ' + allSelectButtons.length + ' dropdown buttons');
  
  // Add click handler to each select button
  for (var i = 0; i < allSelectButtons.length; i++) {
    (function(selectBtn, index) {
      selectBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        
        // Close all other dropdowns
        for (var j = 0; j < allSelectButtons.length; j++) {
          if (allSelectButtons[j] !== selectBtn) {
            allSelectButtons[j].classList.remove("active");
          }
        }
        
        // Toggle this dropdown
        this.classList.toggle("active");
        console.log('Dropdown ' + index + ' toggled to: ' + this.classList.contains("active"));
      });
    })(allSelectButtons[i], i);
  }
  
  // Get ALL select items (from both dropdowns)
  var allSelectItems = document.querySelectorAll("[data-select-item]");
  
  console.log('Found ' + allSelectItems.length + ' dropdown items');
  
  // Add click handler to each select item
  for (var i = 0; i < allSelectItems.length; i++) {
    allSelectItems[i].addEventListener("click", function(e) {
      e.stopPropagation();
      
      // Find the parent portfolio page
      var portfolioPage = findClosest(this, ".portfolio");
      if (!portfolioPage) return;
      
      // Find elements within this specific portfolio page
      var selectValue = portfolioPage.querySelector("[data-select-value]");
      var select = portfolioPage.querySelector("[data-select]");
      var filterItems = portfolioPage.querySelectorAll("[data-filter-item]");
      
      var selectedText = this.innerText;
      var selectedValue = selectedText.toLowerCase();
      
      console.log('Selected: ' + selectedText + ' on page: ' + portfolioPage.dataset.page);
      
      // Update display
      if (selectValue) {
        selectValue.innerText = selectedText;
      }
      
      // Close dropdown
      if (select) {
        select.classList.remove("active");
      }
      
      // Filter items
      for (var j = 0; j < filterItems.length; j++) {
        if (selectedValue === "all" || filterItems[j].dataset.category === selectedValue) {
          filterItems[j].classList.add("active");
        } else {
          filterItems[j].classList.remove("active");
        }
      }
    });
  }
  
  // Get ALL filter buttons (desktop view)
  var allFilterBtns = document.querySelectorAll("[data-filter-btn]");
  
  console.log('Found ' + allFilterBtns.length + ' filter buttons');
  
  for (var i = 0; i < allFilterBtns.length; i++) {
    allFilterBtns[i].addEventListener("click", function() {
      // Find the parent portfolio page
      var portfolioPage = findClosest(this, ".portfolio");
      if (!portfolioPage) return;
      
      // Find elements within this specific portfolio page
      var selectValue = portfolioPage.querySelector("[data-select-value]");
      var filterItems = portfolioPage.querySelectorAll("[data-filter-item]");
      var siblingBtns = portfolioPage.querySelectorAll("[data-filter-btn]");
      
      var selectedText = this.innerText;
      var selectedValue = selectedText.toLowerCase();
      
      console.log('Filter button clicked: ' + selectedText);
      
      // Update display
      if (selectValue) {
        selectValue.innerText = selectedText;
      }
      
      // Filter items
      for (var j = 0; j < filterItems.length; j++) {
        if (selectedValue === "all" || filterItems[j].dataset.category === selectedValue) {
          filterItems[j].classList.add("active");
        } else {
          filterItems[j].classList.remove("active");
        }
      }
      
      // Update button states
      for (var j = 0; j < siblingBtns.length; j++) {
        siblingBtns[j].classList.remove("active");
      }
      this.classList.add("active");
    });
  }
  
  // Close all dropdowns when clicking outside
  document.addEventListener("click", function(e) {
    // Check if click is outside any filter-select-box
    var clickedInsideDropdown = findClosest(e.target, ".filter-select-box");
    
    if (!clickedInsideDropdown) {
      for (var i = 0; i < allSelectButtons.length; i++) {
        allSelectButtons[i].classList.remove("active");
      }
    }
  });
}

// Helper function for Safari (replaces .closest())
function findClosest(element, selector) {
  // If browser supports closest, use it
  if (element.closest) {
    return element.closest(selector);
  }
  
  // Fallback for older Safari versions
  var current = element;
  while (current && current !== document) {
    if (current.matches && current.matches(selector)) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

// Initialize filters when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolioFilters);
} else {
  initPortfolioFilters();
}

// -----



// contact form variables
var form = document.querySelector("[data-form]");
var formInputs = document.querySelectorAll("[data-form-input]");
var formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (var i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
var navigationLinks = document.querySelectorAll("[data-nav-link]");
var pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (var i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (var i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}