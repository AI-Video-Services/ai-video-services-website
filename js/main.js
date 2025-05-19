
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

    if(document.getElementById('hours') && document.getElementById('mins')) {
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

    if(target) {
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
        annualPlanBtn.attr("data-state","inactive");
        annualBill.addClass("hidden");
        $(this).attr("data-state","active");
        monthBill.removeClass("hidden");
    })

    annualPlanBtn.on("click", function () {
        monthPlanBtn.attr("data-state","inactive");
        monthBill.addClass("hidden");
        $(this).attr("data-state","active");
        annualBill.removeClass("hidden");
    })


    if(document.querySelector("#contact-form")) {
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

            $("#contact-form button[type='submit']").text("Sending...").attr("disabled","");
            


            setTimeout(() => {
                window.location.href = "purchase-thank-you.html"
            }, 5000)





        }
    });
    }


     


    $("#video-overlay").on("click", function () {
       
        $(this).parent().children().toggleClass("hidden");
        $(this).parent().children("video")[0].play();
    })

})