gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    let cards = Array.from(document.querySelectorAll(".cardz"));
    let productImg = document.querySelector(".product-slider-product-img");
    let contentContainer = document.querySelector(".product-slider-content");
    let currentIndex = 0;

    let backgroundGradients = [
        "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
    ];
    let data = [
        { title: "Montage", subtitle: "High-Quality Adhesives" },
        { title: "Auto", subtitle: "Automobile Sealants" },
        { title: "Marine", subtitle: "Waterproof Solutions" }
    ];
    let images = ["assets/montage.png", "assets/auto.png", "assets/marine.png"];

    function swapCards(position) {
        let topCard = document.querySelector(".topz");
        let centerCard = document.querySelector(".centerz");
        let bottomCard = document.querySelector(".bottomz");

        if (position === "top") {
            topCard.style.transform = "translateY(0) translateX(0)";
            centerCard.style.transform = "translateY(100px) translateX(50px)";
            bottomCard.style.transform = "translateY(-100px) translateX(50px)";
            currentIndex = (currentIndex + 1) % images.length;
        } else if (position === "bottom") {
            bottomCard.style.transform = "translateY(0) translateX(0)";
            centerCard.style.transform = "translateY(-100px) translateX(50px)";
            topCard.style.transform = "translateY(100px) translateX(50px)";
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }

        updateProductImage();
        updateContent();

        document.querySelector(".product-slider").style.backgroundImage = backgroundGradients[currentIndex];

        setTimeout(() => {
            if (position === "top") {
                topCard.classList.replace("topz", "centerz");
                centerCard.classList.replace("centerz", "bottomz");
                bottomCard.classList.replace("bottomz", "topz");
            } else if (position === "bottom") {
                bottomCard.classList.replace("bottomz", "centerz");
                centerCard.classList.replace("centerz", "topz");
                topCard.classList.replace("topz", "bottomz");
            }
            updateClickHandlers();
        }, 500);
    }

    function updateProductImage() {
        productImg.style.transition = "0.7s ease-in-out";
        productImg.style.transform = "scale(1.5) rotate(-15deg)";
        productImg.style.setProperty("--left", "-710px");

        setTimeout(() => {
            productImg.style.setProperty("--url", `url('${images[currentIndex]}')`);

            gsap.to(productImg, {
                "--left": "-12px",
                duration: 0.7,
                ease: "power2.out"
            });

            productImg.style.transform = "scale(1.5) rotate(0deg)";
        }, 700);
    }

    function updateContent() {
        gsap.to(contentContainer, {
            opacity: 0,
            y: -10,
            duration: 0.5,
            onComplete: () => {
                contentContainer.innerHTML = `
                <h1 style="color: white;">${data[currentIndex].title}</h1>
                <h2 style="color: white;">${data[currentIndex].subtitle}</h2>
            `;

                gsap.fromTo(contentContainer,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );
            }
        });
    }


    function updateClickHandlers() {
        cards.forEach(card => card.replaceWith(card.cloneNode(true)));
        cards = Array.from(document.querySelectorAll(".cardz"));

        cards.forEach(card => {
            card.classList.remove("clickable");
            if (card.classList.contains("topz")) {
                card.addEventListener("click", () => swapCards("top"));
                card.classList.add("clickable");
            } else if (card.classList.contains("bottomz")) {
                card.addEventListener("click", () => swapCards("bottom"));
                card.classList.add("clickable");
            }
        });
    }

    gsap.to(".product-slider-product", {
        scrollTrigger: {
            trigger: ".product-slider",
            start: "bottom 130%",
            toggleActions: "play none none reverse",
        },
        rotate: -70,
        x: 100,
        y: 875,
        "--left": "-710px",
        scale: 0.70,
        scrub: true,
        ease: "power2.out"
    });

    updateClickHandlers();
});