/* =========================================================
   CARRUSEL POR HOVER
   Requisitos:
   - No rota automáticamente al cargar.
   - No tiene botones visibles.
   - Solo cambia de imagen mientras el puntero está encima.
   - Al quitar el mouse, se detiene en la imagen actual.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Contenedor principal del carrusel
    const carousel = document.getElementById("hoverCarousel");

    // Todas las imágenes del carrusel
    const images = document.querySelectorAll(".carousel__image");

    // Validación básica por si el carrusel o las imágenes no existen
    if (!carousel || images.length === 0) {
        return;
    }

    // Índice de la imagen actual
    let currentIndex = 0;

    // Guarda el intervalo que se activa al hacer hover
    let hoverInterval = null;

    // Velocidad de rotación mientras el mouse está encima
    const hoverSpeed = 900;

    /*
        Muestra una imagen específica:
        - Quita la clase active de todas.
        - Activa únicamente la imagen correspondiente.
    */
    function showImage(index) {
        images.forEach((image) => {
            image.classList.remove("active");
        });

        images[index].classList.add("active");
        currentIndex = index;
    }

    /*
        Avanza a la siguiente imagen.
        Si llega al final, vuelve a la primera.
    */
    function nextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    /*
        Inicia la rotación únicamente cuando el mouse
        entra en el área del carrusel.
    */
    function startHoverRotation() {
        // Evita crear múltiples intervalos si el evento se dispara varias veces
        if (hoverInterval !== null) {
            return;
        }

        hoverInterval = setInterval(() => {
            nextImage();
        }, hoverSpeed);
    }

    /*
        Detiene la rotación cuando el mouse sale.
        La imagen actual permanece visible.
    */
    function stopHoverRotation() {
        clearInterval(hoverInterval);
        hoverInterval = null;
    }

    // Eventos principales solicitados
    carousel.addEventListener("mouseenter", startHoverRotation);
    carousel.addEventListener("mouseleave", stopHoverRotation);

    /*
        Accesibilidad extra:
        Si el usuario navega con teclado y enfoca el carrusel,
        también se activa la rotación. Al perder foco, se detiene.
    */
    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("focus", startHoverRotation);
    carousel.addEventListener("blur", stopHoverRotation);
});