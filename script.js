document.addEventListener('DOMContentLoaded', () => {
    class Navigation {
        constructor() {
            this.hamburger = document.querySelector('.hamburger');
            this.navMenu = document.querySelector('.nav-menu');
            this.init();
        }

        init() {
            this.hamburger?.addEventListener('click', () => {
                this.hamburger.classList.toggle('active');
                this.navMenu?.classList.toggle('active');
            });
        }
    }

    class FormHandler {
        constructor() {
            this.form = document.querySelector('.contact-form');
            this.emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            this.init();
        }

        init() {
            this.disableAutocomplete();
            this.setupFormValidation();
        }

        disableAutocomplete() {
            document.querySelectorAll('input').forEach(input => {
                input?.addEventListener('focus', () => {
                    input.setAttribute('autocomplete', 'new-password');
                });
            });
        }

        setupFormValidation() {
            this.form?.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm()) {
                    window.location.href = './thanks.html';
                }
            });
        }

        validateForm() {
            const fields = this.form.querySelectorAll('input, select');
            let isValid = true;

            fields.forEach(field => {
                const errorMessage = field.parentElement.querySelector('.error-message');

                if (!field.value.trim()) {
                    errorMessage.style.display = 'block';
                    isValid = false;
                } else if (field.type === 'email' && !this.emailRegex.test(field.value)) {
                    errorMessage.textContent = 'Please enter a valid email address';
                    errorMessage.style.display = 'block';
                    isValid = false;
                } else {
                    errorMessage.style.display = 'none';
                }
            });

            return isValid;
        }
    }

    class Carousel {
        constructor() {
            this.carousel = document.querySelector('.carousel');
            this.slides = document.querySelectorAll('.slide');
            this.indicators = document.querySelectorAll('.indicator');
            this.prevButton = document.querySelector('.prev');
            this.nextButton = document.querySelector('.next');
            this.currentSlide = 0;
            this.totalSlides = this.slides.length;
            this.autoSlideInterval = null;
            this.slideInterval = 5000;
            this.init();
        }

        init() {
            if (!this.carousel) return;
            this.setupEventListeners();
            this.startAutoSlide();
        }

        updateSlide(index) {
            if (!this.carousel) return;
            this.carousel.style.transform = `translateX(-${index * 100}%)`;
            this.indicators.forEach((indicator, i) => {
                indicator?.classList.toggle('active', i === index);
            });
            this.currentSlide = index;
        }

        nextSlide() {
            this.updateSlide((this.currentSlide + 1) % this.totalSlides);
        }

        prevSlide() {
            this.updateSlide((this.currentSlide - 1 + this.totalSlides) % this.totalSlides);
        }

        setupEventListeners() {
            this.prevButton?.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoSlide();
            });

            this.nextButton?.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoSlide();
            });

            this.indicators.forEach((indicator, index) => {
                indicator?.addEventListener('click', () => {
                    this.updateSlide(index);
                    this.resetAutoSlide();
                });
            });

            this.carousel?.addEventListener('mouseenter', () => this.pauseAutoSlide());
            this.carousel?.addEventListener('mouseleave', () => this.startAutoSlide());
        }

        startAutoSlide() {
            this.autoSlideInterval = setInterval(() => this.nextSlide(), this.slideInterval);
        }

        pauseAutoSlide() {
            clearInterval(this.autoSlideInterval);
        }

        resetAutoSlide() {
            this.pauseAutoSlide();
            this.startAutoSlide();
        }
    }

    class CountrySelector {
        static countries = [
            { name: "United States", code: "US" },
            { name: "United Kingdom", code: "UK" },
            { name: "India", code: "IN" },
            { name: "Canada", code: "CA" },
            { name: "Australia", code: "AU" },
            { name: "Germany", code: "DE" },
            { name: "France", code: "FR" },
            { name: "Japan", code: "JP" },
            { name: "China", code: "CN" },
            { name: "Brazil", code: "BR" }
        ];

        static populate() {
            const selectElement = document.querySelector('select[name="country"]');
            if (!selectElement) return;

            selectElement.innerHTML = '<option value="" disabled selected>Select Country</option>';
            this.countries.forEach(({ code, name }) => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = name;
                selectElement.appendChild(option);
            });
        }
    }

    class VideoPopup {
        constructor() {
            this.popup = document.querySelector('.video-popup');
            this.iframe = document.getElementById('youtube-iframe');
            this.init();
        }

        init() {
            if (!this.popup || !this.iframe) return;
            this.setupEventListeners();
        }

        open(videoId) {
            if (!this.popup || !this.iframe) return;
            this.iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
            this.popup.style.display = 'block';
        }

        close() {
            if (!this.popup || !this.iframe) return;
            this.iframe.src = '';
            this.popup.style.display = 'none';
        }

        setupEventListeners() {
            document.querySelector('.close-btn')?.addEventListener('click', () => this.close());
            document.querySelector('.popup-overlay')?.addEventListener('click', () => this.close());
            document.querySelector('.play-button')?.addEventListener('click', () => {
                this.open('k_MUL49_Fe8?si=KNblURAdmbiSD9Oo');
            });
        }
    }

    new Navigation();
    new FormHandler();
    new Carousel();
    CountrySelector.populate();
    new VideoPopup();
});
