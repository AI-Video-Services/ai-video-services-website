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
    const submitButton = document.querySelector('button[type="submit"]');
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.textContent = 'SUBMITTING...';
    } else {
        submitButton.disabled = false;
        submitButton.textContent = 'SUBMIT';
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
                
                const token = await window.generateRecaptchaToken();
            
                // Get form data
                const formData = new FormData(form);
                
                // Convert FormData to object and add recaptcha token
                const payload = {
                    ...formDataToObject(formData),
                    recaptchaToken: token
                };
                
                
                // Send form data to Formspree
                // const response = await fetch(form.action, {
                //     method: 'POST',
                //     body: JSON.stringify(payload),
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     }
                // });
                
                if (true) {
                    window.location.href = 'contact-thank-you.html'; // Redirect to thank you page
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