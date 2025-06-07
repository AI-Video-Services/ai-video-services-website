// Function to convert FormData to a plain object
function formDataToObject(formData) {
    const object = {};
    formData.forEach((value, key) => {
        // Handle checkbox values
        if (key in object) {
            if (!Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            object[key].push(value);
        } else {
            object[key] = value;
        }
    });
    return object;
}

// Function to set loading state
function setLoading(isLoading) {
    const button = document.getElementById('submit-button') || document.querySelector('button[type="submit"]');
    if (!button) return;
    const buttonText = button.querySelector('.button-text') || button;
    const spinner = button.querySelector('svg');

    if (isLoading) {
        button.disabled = true;
        buttonText.textContent = 'SUBMITTING...';
        if (spinner) spinner.classList.remove('hidden');
    } else {
        button.disabled = false;
        buttonText.textContent = 'SUBMIT';
        if (spinner) spinner.classList.add('hidden');
    }
}

// Function to show success message
function showSuccessMessage() {
    const formContainer = document.querySelector('.bg-white.rounded-xl.shadow-md.overflow-hidden');
    const successMessage = document.getElementById('thanks-message');

    if (formContainer && successMessage) {
        // Hide form with fade out
        formContainer.style.transition = 'opacity 0.3s ease-out';
        formContainer.style.opacity = '0';

        setTimeout(() => {
            formContainer.classList.add('hidden');
            // Show success message with fade in
            successMessage.classList.remove('hidden');
            successMessage.style.opacity = '0';
            successMessage.style.transition = 'opacity 0.3s ease-in';

            // Force reflow
            successMessage.offsetHeight;

            successMessage.style.opacity = '1';
        }, 300);
    }
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            try {
                setLoading(true);

                // Generate reCAPTCHA token
                const token = await window.generateRecaptchaToken();

                // Get form data
                const formData = new FormData(form);

                // Convert FormData to object and add recaptcha token
                const payload = {
                    ...formDataToObject(formData),
                    recaptchaToken: token
                };

                // Send form data to your server
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    // Option 1: Show animated message (if present)
                    showSuccessMessage();
                    // Option 2: Or redirect
                    // window.location.href = 'thanks-contact.html';
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again.');
                setLoading(false);
            }
        });
    }
});