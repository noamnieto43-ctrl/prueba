document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONTROL DEL NAVBAR (SCROLL) ---
    const nav = document.querySelector('.navbar-premium');
    
    function checkScroll() {
        if (window.scrollY > 20) {
            nav.classList.add('navbar-scrolled');
        } else {
            nav.classList.remove('navbar-scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    checkScroll();

    // --- 2. MODO OSCURO (UNIFICADO) ---
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && toggleSwitch) {
            toggleSwitch.checked = true;
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function(e) {
            const theme = e.target.checked ? 'dark' : 'light';
            document.body.style.transition = "background-color 0.8s ease, color 0.8s ease";
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

    // --- 3. CARRUSEL PREMIUM Y ANIMACIONES DE TEXTO ---
    const myCarouselEl = document.querySelector('#team-carousel');
    
    if (myCarouselEl) {
        // Inicialización única
        const carousel = new bootstrap.Carousel(myCarouselEl, {
            interval: 6000,
            pause: false,
            ride: 'carousel'
        });

        // Función para disparar el "salto" de las letras
        const triggerTextAnimations = () => {
            const activeTexts = myCarouselEl.querySelectorAll('.active .reveal-text');
            activeTexts.forEach((t) => {
                t.style.animation = 'none';
                t.offsetHeight; // Truco de reflow para reiniciar animación
                t.style.animation = ''; 
            });
        };

        // Disparar al cargar la página
        triggerTextAnimations();

        // Disparar cada vez que el slide termine de cambiar
        myCarouselEl.addEventListener('slid.bs.carousel', triggerTextAnimations);
    }

    // --- 4. OPTIMIZACIÓN DE VIDEOS ---
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('ended', function () {
            this.play();
        }, false);
    });

});