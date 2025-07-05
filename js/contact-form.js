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
                    recaptcha_token: token
                };

                // Send form data to your server
                const response = await fetch('https://payments.aivideo-services.com/api/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (data.captchaValid === true && data.action === 'contact_form') {
                    console.log("Success:", data);
                    setTimeout(() => {
                        window.location.href = "thanks-contact.html";
                    }, 3000);
                } else {
                    alert("Invalid Captcha!");
                }
            } catch (error) {
                console.error("Error:", error);
                window.location.href = "thanks-contact.html";
            } finally {
                setLoading(false);
            }
        });
    }
});
