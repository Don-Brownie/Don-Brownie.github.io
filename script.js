fetch('sidebar.html')
.then(response => response.text())
.then(html => {
  const sidebarLoadingElement = document.getElementById('sidebar-loading');
  if (sidebarLoadingElement) {
    sidebarLoadingElement.innerHTML = html;
  }

  // Now that sidebar HTML is loaded, handle the dark mode toggle logic
  const checkbox = document.getElementById("checkbox");
  if (checkbox) {
    const storedMode = localStorage.getItem('mode');
    
    // Apply dark mode if stored mode is 'dark' and check the checkbox
    if (storedMode === 'dark') {
        document.body.classList.add('dark-mode');
        checkbox.checked = true;
    }

    // Function to toggle between light and dark modes and store the preference
    function toggleMode() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('mode', 'dark');
        } else {
            localStorage.setItem('mode', 'light');
        }
    }

    // Add event listener to the checkbox
    checkbox.addEventListener('change', toggleMode);
  }

})
.catch(err => console.log('Error loading HTML:', err));

const roles = ["Data Analyst", "Data Engineer", "Project Manager", "Policy Designer", "Political Scientist"];
let roleIndex = 0;
let currentText = '';
let isErasing = false;
let charIndex = 0;
const typingSpeed = 60;
const erasingSpeed = 60;
const pauseTime = 1000;
const roleElement = document.getElementById('role');

// Check if the element with id 'role' exists before running the function
if (roleElement) {
    function typeRole() {
        const currentRole = roles[roleIndex];

        // Typing phase
        if (!isErasing) {
            currentText = currentRole.substring(0, charIndex);
            charIndex++;
        }
        // Erasing phase
        else {
            currentText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        }

        roleElement.textContent = currentText;

        // If typing is complete, start erasing after a delay
        if (!isErasing && charIndex === currentRole.length) {
            setTimeout(() => {
                isErasing = true;
            }, pauseTime);
        }
        // If erasing is complete, move to the next role
        else if (isErasing && charIndex === 0) {
            roleIndex = (roleIndex + 1) % roles.length;
            isErasing = false;
            currentText = ''; // Clear text to prevent the last letter being visible
            setTimeout(typeRole, pauseTime); // Start the typing phase for the next role
            return;
        }

        // Adjust speed based on whether we are typing or erasing
        const speed = isErasing ? erasingSpeed : typingSpeed;
        setTimeout(typeRole, speed);
    }

    // Start typing if the element exists
    typeRole();
}

window.addEventListener('load', function() {
  const photo = document.querySelector('.photo');
  if (photo) {
    photo.classList.add('loaded');
  }
});

function toggleDeployable(deployableId) {
    const deployableOptions = document.querySelector(`#${deployableId}`);
    if (deployableOptions) {
        deployableOptions.classList.toggle('visible');
    }
}

