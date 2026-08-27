/* =====================================================
   YANGI AVLOD — PREMIUM SCHOOL WEBSITE
   SCRIPT.JS
===================================================== */


/* =====================================================
   01. LOADING
===================================================== */

window.addEventListener("load", () => {

    const loading = document.getElementById("loading");

    setTimeout(() => {
        loading.classList.add("hidden");
    }, 800);

});


/* =====================================================
   02. HEADER SCROLL EFFECT
===================================================== */

const header = document.getElementById("header");

function updateHeader() {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =====================================================
   03. MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("active");

    navMenu.classList.toggle("open");

    document.body.classList.toggle("menu-open");

});


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICK
===================================================== */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuBtn.classList.remove("active");

        navMenu.classList.remove("open");

        document.body.classList.remove("menu-open");

    });

});


/* =====================================================
   04. ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink =
                document.querySelector(
                    `.nav-menu a[href="#${sectionId}"]`
                );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* =====================================================
   05. SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(
    ".about-grid, .edu-card, .stat-card, .event-card, .gallery-item, .contact-box"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =====================================================
   06. COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function startCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const duration = 1400;

        const startTime = performance.now();


        function animate(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const eased =
                1 - Math.pow(1 - progress, 3);


            current =
                Math.floor(target * eased);


            counter.textContent =
                current + "+";


            if (progress < 1) {

                requestAnimationFrame(
                    animate
                );

            } else {

                counter.textContent =
                    target + "+";

            }

        }


        requestAnimationFrame(animate);

    });

}


const statsSection =
    document.getElementById("achievements");


const statsObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounters();

                    statsObserver.disconnect();

                }

            });

        },
        {
            threshold: 0.3
        }
    );


statsObserver.observe(statsSection);


/* =====================================================
   07. GALLERY LIGHTBOX
===================================================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");


let currentImage = 0;


const galleryData =
    Array.from(galleryItems).map(item => {

        return {
            image:
                item.dataset.image,

            title:
                item.dataset.title || ""
        };

    });


/* =====================================================
   OPEN LIGHTBOX
===================================================== */

function openLightbox(index) {

    if (!galleryData.length) {
        return;
    }

    currentImage = index;

    updateLightbox();

    lightbox.classList.add("open");

    document.body.classList.add(
        "lightbox-open"
    );

}


/* =====================================================
   UPDATE LIGHTBOX
===================================================== */

function updateLightbox() {

    const data =
        galleryData[currentImage];

    lightboxImage.src =
        data.image;

    lightboxImage.alt =
        data.title;

    lightboxTitle.textContent =
        data.title;

}


/* =====================================================
   GALLERY CLICK
===================================================== */

galleryItems.forEach(
    (item, index) => {

        item.addEventListener(
            "click",
            () => {
                openLightbox(index);
            }
        );

    }
);


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.classList.remove(
        "lightbox-open"
    );

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


/* =====================================================
   NEXT IMAGE
===================================================== */

function nextImage() {

    currentImage++;

    if (
        currentImage >=
        galleryData.length
    ) {
        currentImage = 0;
    }

    updateLightbox();

}


/* =====================================================
   PREVIOUS IMAGE
===================================================== */

function previousImage() {

    currentImage--;

    if (currentImage < 0) {
        currentImage =
            galleryData.length - 1;
    }

    updateLightbox();

}


lightboxNext.addEventListener(
    "click",
    nextImage
);

lightboxPrev.addEventListener(
    "click",
    previousImage
);


/* =====================================================
   LIGHTBOX BACKGROUND CLICK
===================================================== */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "open"
            )
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            nextImage();

        }


        if (event.key === "ArrowLeft") {

            previousImage();

        }

    }
);


/* =====================================================
   08. TOUCH SWIPE FOR GALLERY
===================================================== */

let touchStartX = 0;
let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;


    if (Math.abs(distance) < 50) {
        return;
    }


    if (distance < 0) {

        nextImage();

    } else {

        previousImage();

    }

}


/* =====================================================
   09. CURRENT YEAR
===================================================== */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =====================================================
   10. IMAGE ERROR HANDLING
===================================================== */

const allImages =
    document.querySelectorAll("img");


allImages.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.style.background =
                "#0d1e31";

            image.style.objectFit =
                "contain";

        }
    );

});


/* =====================================================
   11. SMOOTH ANCHOR SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId === "#" ||
                    !targetId
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header.offsetHeight;


                const targetPosition =
                    target.offsetTop -
                    headerHeight;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


/* =====================================================
   12. PREVENT BROKEN PHONE LINKS
===================================================== */

document
    .querySelectorAll(
        'a[href^="tel:"]'
    )
    .forEach(phone => {

        phone.addEventListener(
            "click",
            () => {

                console.log(
                    "Telefon raqamiga qo'ng'iroq qilish:"
                );

                console.log(
                    phone.textContent.trim()
                );

            }
        );

    });


/* =====================================================
   13. PAGE READY
===================================================== */

console.log(
    "YANGI AVLOD website muvaffaqiyatli ishga tushdi."
);