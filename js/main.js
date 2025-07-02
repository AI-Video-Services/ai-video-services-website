if (typeof AOS !== 'undefined') {
    AOS.init();
}

$(document).ready(function () {



    var faqBtns = $("#faq button");
    var faqBody = $("#faq .faq-response > div");

    faqBtns.on("click", function () {

        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(this).parent().next().slideUp(500);
        } else {
            faqBtns.removeClass("open");
            //faqBody.addClass("hidden");
            faqBody.slideUp(500);
            $(this).addClass("open");
            // $(this).parent().next().removeClass("hidden");
            $(this).parent().next().slideDown(500);
        }

    })


    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('#fixed-scroll-top').removeClass("hidden");
        } else {
            $('#fixed-scroll-top').addClass("hidden");
        }
    });

    // Smooth scroll to top on click
    $('#fixed-scroll-top,#bottom-scroll-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });


    function start24hCountdown() {
        let duration = 24 * 60 * 60;

        const hourElement = document.getElementById('hours');
        const minElement = document.getElementById('mins');
        const secElement = document.getElementById('seconds');


        const interval = setInterval(() => {
            let hours = Math.floor(duration / 3600);
            let minutes = Math.floor((duration % 3600) / 60);
            let seconds = duration % 60;

            // Pad with leading zeros
            hours = String(hours).padStart(2, '0');
            minutes = String(minutes).padStart(2, '0');
            seconds = String(seconds).padStart(2, '0');

            hourElement.textContent = `${hours}`;
            minElement.textContent = `${minutes}`;
            secElement.textContent = `${seconds}`;

            if (duration === 0) {
                clearInterval(interval);
                // Optional: Do something when the timer ends
            } else {
                duration--;
            }
        }, 1000);
    }

    if (document.getElementById('hours') && document.getElementById('mins')) {
        start24hCountdown();
    }




    var toggleBtnMenu = $("#open-menu");
    var mobileMenu = $("#mobile-menu");

    toggleBtnMenu.click(function () {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            mobileMenu.slideUp();
        } else {
            $(this).addClass("open");
            mobileMenu.slideDown();
        }


    });

    var dropDownBtns = $(".drop-down-btn");
    // var dropDownMenu = $(".drop-down");

    dropDownBtns.click(function () {


        $(this).children().toggleClass("rotate-180");
        $(this).next().slideToggle();

    });



    const target = document.querySelector('#fade-section');

    function onScroll() {
        const rect = target.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = rect.top;
        const end = rect.bottom + 20;

        if (end <= 0 || start >= windowHeight) {
            target.style.opacity = 0;
        } else {
            const visible = 1 - (start / (end - start));
            target.style.opacity = Math.max(0, Math.min(1, visible));
        }
    }

    if (target) {
        window.addEventListener('scroll', onScroll);
        onScroll();
    }






    $(document).on('click', 'button[data-attr]', function (e) {

        toggleBtnMenu.removeClass("open");
        mobileMenu.slideUp();
        $('html, body').stop().animate({
            scrollTop: $("#" + $(this).attr('data-attr')).offset().top
        }, 600, 'linear');
    });


    var monthBill = $(".monthly-billing"),
        annualBill = $(".annual-billing"),
        monthPlanBtn = $("#monthly-btn"),
        annualPlanBtn = $("#annual-btn");

    monthPlanBtn.on("click", function () {
        annualPlanBtn.attr("data-state", "inactive");
        annualBill.addClass("hidden");
        $(this).attr("data-state", "active");
        monthBill.removeClass("hidden");
    })

    annualPlanBtn.on("click", function () {
        monthPlanBtn.attr("data-state", "inactive");
        monthBill.addClass("hidden");
        $(this).attr("data-state", "active");
        annualBill.removeClass("hidden");
    })


    if (document.querySelector("#contact-form")) {
        $('#contact-form').validate({


            errorElement: "p",
            errorClass: "text-sm font-medium text-destructive",
            rules: {
                fullName: { required: true, minlength: 3, maxlength: 35 },
                enquiry: { required: true, minlength: 3, maxlength: 300 },
                email: { required: true, email: true, minlength: 8, maxlength: 40 },
                phoneNumber: { required: true, minlength: 10, maxlength: 12 },
                company: { required: true, minlength: 2, maxlength: 40 },
                jobTitle: { required: true, minlength: 2, maxlength: 40 },
                country: { required: true },




            },
            messages: {
                fullName: { required: "Name must be at least 2 characters." },
                enquiry: { required: "Message must be at least 10 characters." },
                email: { required: "Please enter a valid email address." },
                phoneNumber: { required: "Please enter a valid phone number." },
                company: { required: "Please enter your company name." },
                jobTitle: { required: "Please enter your job title." },
                country: { required: "Please select your country." },



            },

            errorPlacement: function (error, element) {
                if (element.attr('name') == "phoneNumber") {
                    element.parent().after(error);
                } else {
                    element.after(error);
                }

            },
            submitHandler: function (form, event) {
                event.preventDefault();

                $("#contact-form button[type='submit']").text("Sending...").attr("disabled", "");



                setTimeout(() => {
                    window.location.href = "contact-thank-you.html"
                }, 5000)





            }
        });
    }


    if (document.querySelector("#checkout-form")) {
    $('#checkout-form').validate({
        errorElement: "p",
        errorClass: "text-sm font-medium text-destructive",
        rules: {
            firstName: { required: true, minlength: 2, maxlength: 35 },
            lastName: { required: true, minlength: 2, maxlength: 35 },
            email: { required: true, email: true, minlength: 8, maxlength: 40 },
        },
        messages: {
            firstName: { required: "First Name must be at least 2 characters" },
            lastName: { required: "Last Name must be at least 2 characters" },
            email: { required: "Please enter a valid email address" },
        },
        errorPlacement: function (error, element) {
            element.after(error);
        },
        submitHandler: async function (form, event) {
            event.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            const amountInUSD = urlParams.get('planPrice')?.replace(/^\$/, '');

            // Get form data
            const formData = {
                firstName: $("#checkout-form [name='firstName']").val(),
                lastName: $("#checkout-form [name='lastName']").val(),
                email: $("#checkout-form [name='email']").val(),
                amountInUSD: amountInUSD
             
            };

            // Update button state
            $("#checkout-form button[type='submit']")
                .text("Processing payment...")
                .attr("disabled", "");

            const paymentEndpoint = `https://payments.aivideo-services.com/payment-link`;

            try {
                const response = await fetch(paymentEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.paymentLink) {
                    // Redirect to payment link
                    window.open(result.paymentLink, '_self');
                } else {
                    // Show error if no link
                    $("#checkout-error")
                        .text("Payment processing failed. Please try again.")
                        .removeClass("hidden");
                    $("#checkout-form button[type='submit']")
                        .text("Proceed to Payment")
                        .removeAttr("disabled");
                }
            } catch (error) {
                console.error("Payment request failed:", error);
                $("#checkout-error")
                    .text("Payment processing failed. Please try again.")
                    .removeClass("hidden");
                $("#checkout-form button[type='submit']")
                    .text("Proceed to Payment")
                    .removeAttr("disabled");
            }
        }
    });
}






    $("#video-overlay").on("click", function () {

        $(this).parent().children().toggleClass("hidden");
        $(this).parent().children("video")[0].play();
    })



    if (document.querySelector("#affiliate-form")) {

        const spinnerHTML = `
  <span class="flex items-center">
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Submitting Application...
  </span>
`;


        $('#affiliate-form').validate({


            errorElement: "p",
            errorClass: "text-red-500 text-sm",
            rules: {
                name: { required: true, minlength: 2, maxlength: 35 },
                email: { required: true, email: true, minlength: 8, maxlength: 40 },
                trafficType: { required: true }




            },
            messages: {
                firstName: { required: "Name must be at least 2 characters" },
                email: { required: "Please enter a valid email address" },
                trafficType: { required: "Please select your traffic type." }


            },

            errorPlacement: function (error, element) {
                element.after(error);

            },
            submitHandler: function (form, event) {
                event.preventDefault();

                $("#affiliate-form button[type='submit']").html(spinnerHTML).attr("disabled", "");


                $("#affiliate-form").closest("main").addClass("hidden").next().removeClass("hidden")






            }
        });


    }



    if (document.querySelector("#newsletter-form")) {
        // Newsletter Form Handling
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            const formContainer = newsletterForm.closest('.max-w-2xl.mx-auto.text-center:not(.hidden)');
            // The thankYouContainer is the one that is initially hidden and has the #return-newsletter button
            const thankYouContainer = document.querySelector('#return-newsletter') ? document.querySelector('#return-newsletter').closest('.max-w-2xl.mx-auto.text-center.hidden') : null;

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const returnButton = document.getElementById('return-newsletter');

            function setNewsletterLoading(isLoading) {
                if (!submitButton) return;
                if (isLoading) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Subscribing...';
                } else {
                    submitButton.disabled = false; // Will be re-evaluated by input listener
                    submitButton.textContent = 'Subscribe';
                }
            }

            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            if (emailInput && submitButton) {
                emailInput.addEventListener('input', function() {
                    if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) {
                        submitButton.disabled = false;
                    } else {
                        submitButton.disabled = true;
                    }
                });
                // Initial state based on HTML (already disabled)
                 if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
                    submitButton.disabled = true;
                }
            }

            newsletterForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                if (!emailInput || !isValidEmail(emailInput.value.trim())) {
                    // Optionally, display an inline error message for invalid email.
                    // For now, the button should remain disabled if email is invalid.
                    return;
                }

                setNewsletterLoading(true);
                const email = emailInput.value.trim();
                let recaptchaToken = null;

                try {
                    if (typeof window.generateRecaptchaToken === 'function') {
                        recaptchaToken = await window.generateRecaptchaToken();
                    } else {
                        console.warn('generateRecaptchaToken function not found. Proceeding with null reCAPTCHA token for newsletter.');
                        recaptchaToken = null; // Ensure it's defined as null if function not found
                    }

                    const payload = {
                        email: email,
                        newsletterSubscription: true, // Specific flag for this type of submission
                        recaptchaToken: recaptchaToken // Always include the key, defaulting to null
                    };

                    const response = await fetch('https://payments.aivideo-services.com/api/email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        const errorData = await response.text();
                        console.error('Newsletter API Error:', response.status, errorData);
                        // UI still shows success as requested
                    } else {
                        const result = await response.json();
                        console.log('Newsletter subscription successful:', result);
                    }

                } catch (error) {
                    console.error('Error during newsletter form submission (client-side):', error);
                    // UI still shows success as requested
                } finally {
                    setNewsletterLoading(false); // Reset button text before hiding

                    if (formContainer && thankYouContainer) {
                        formContainer.classList.add('hidden');
                        thankYouContainer.classList.remove('hidden');
                        if (window.AOS) {
                            window.AOS.refreshHard(); // Refresh AOS for new elements
                        }
                    }
                }
            });

            if (returnButton && formContainer && thankYouContainer && emailInput && submitButton) {
                returnButton.addEventListener('click', function() {
                    if(thankYouContainer) thankYouContainer.classList.add('hidden');
                    if(formContainer) formContainer.classList.remove('hidden');
                    
                    emailInput.value = '';
                    submitButton.textContent = 'Subscribe';
                    submitButton.disabled = true; // Email is now empty
                    if (window.AOS) {
                        window.AOS.refreshHard();
                    }
                });
            }
        }
    }
})
