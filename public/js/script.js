(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);

  // Copy Code Button Logic
  document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Logic
    var toggleBtns = document.querySelectorAll('#theme-toggle, #header-theme-toggle');
    
    toggleBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var currentTheme = document.documentElement.getAttribute('data-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    });

    // Select all code blocks (adjust selectors based on your Jekyll theme's output)
    var codeBlocks = document.querySelectorAll('div.highlight');
    
    codeBlocks.forEach(function(wrapper) {
      if (wrapper.querySelector('.copy-btn')) return;
      
      var button = document.createElement('button');
      button.className = 'copy-btn';
      button.textContent = 'Copy';
      
      // Ensure wrapper is positioned relatively for absolute positioning of button
      if (getComputedStyle(wrapper).position === 'static') {
        wrapper.style.position = 'relative';
      }
      
      wrapper.appendChild(button);
      
      button.addEventListener('click', function() {
        // Find the code element
        var codeElement = wrapper.querySelector('code');
        if (!codeElement) return;
        
        var code = codeElement.innerText;
        
        navigator.clipboard.writeText(code).then(function() {
          button.textContent = 'Copied!';
          button.classList.add('copied');
          
          setTimeout(function() {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy: ', err);
          button.textContent = 'Error';
        });
      });
    });
  });
})(document);
