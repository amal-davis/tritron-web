gsap.registerPlugin(ScrollTrigger);

const cardinit = document.querySelector(".cardinit");
const auto = document.querySelector(".cardextra.auto");
const marine = document.querySelector(".cardextra.marine");
const w70 = document.querySelector(".cardextra.w70");
const extraContent = document.querySelector(".extra-content");

gsap.to(cardinit, {
    "--left": "-710px",
    translate: () => {
        let screenWidth = window.innerWidth;
        if (screenWidth <= 1200) {
            return "130px 40px";
        } else if (screenWidth > 1600) {
            return "410px -50px";
        } else {
            return "335px -50px";
        }
    },
    duration: 0.5,
    opacity: 1,
    scale: () => {
        let screenWidth = window.innerWidth;
        if (screenWidth <= 1200) {
            return 0.5;
        } else {
            return 0.68;
        }
    },
    onComplete: () => {
        gsap.to([auto, marine, w70], {
            x: (index) => {
                let screenWidth = window.innerWidth;
                if (screenWidth <= 1200) {
                    switch (index) {
                        case 0:
                            return -170;
                        case 1:
                            return 35;
                        case 2:
                            return -65;
                    }
                } else if (screenWidth > 1600) {
                    switch (index) {
                        case 0:
                            return 20;
                        case 1:
                            return 600;
                        case 2:
                            return 230;
                    }
                } else {
                    switch (index) {
                        case 0:
                            return 20;
                        case 1:
                            return 480;
                        case 2:
                            return 180;
                    }
                }
            },
            y: () => {
                let screenWidth = window.innerWidth;
                if (screenWidth <= 1200) {
                    return 40;
                } else {
                    return -50;
                }
            },
            "--left": "-710px",
            opacity: 1,
            scale: () => {
                let screenWidth = window.innerWidth;
                if (screenWidth <= 1200) {
                    return 0.5;
                } else {
                    return 0.68;
                }
            },
            duration: 0.7,
            stagger: 0.2,
            onComplete: () => {
                gsap.to([cardinit, auto, w70], {
                    opacity: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: cardinit,
                        start: "middle",
                        end: "bottom center",
                        scrub: true
                    }
                });

                gsap.to([marine], {
                    "--left": "0px",
                    y: () => {
                        let screenWidth = window.innerWidth;
                        if (screenWidth <= 1200) {
                            return 500;
                        } else {
                            return 600;
                        }
                    },
                    x: "-40vw",
                    duration: 1,
                    scrollTrigger: {
                        trigger: marine,
                        start: "middle",
                        end: "bottom center",
                        scale: 0.1,
                        scrub: true
                    },
                    onComplete: () => {
                        gsap.fromTo(extraContent,
                            { opacity: 0, x: -300 },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 0.5,
                                ease: "fade",
                                delay: 0.2
                            }
                        );
                    }
                });
            }
        });
    },
});



document.addEventListener("DOMContentLoaded", function () {
    let title = document.querySelector("h1");
    let splitTitle = new SplitText(title, { type: "chars" });

    let tl = gsap.timeline({ delay: 0.05 });

    tl.from(splitTitle.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out"
    });

});

gsap.registerPlugin(ScrollTrigger);

const scrollSection = document.querySelectorAll(".scroll-section");

scrollSection.forEach((section) => {
    const wrapper = section.querySelector(".wrapper");
    const items = wrapper.querySelectorAll(".item");

    let direction = null;

    if (section.classList.contains("vertical-section")) {
        direction = "vertical";
    } else if (section.classList.contains("horizontal-section")) {
        direction = "horizontal";
    }

    initScroll(section, items, direction);
});

function initScroll(section, items, direction) {
    items.forEach((item, index) => {
        if (index !== 0) {
            direction == "horizontal"
                ? gsap.set(item, { xPercent: 100 })
                : gsap.set(item, { yPercent: 100 });
        }
    });

    const cards2 = document.querySelectorAll(".card2");

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top 13%",
            end: () => `+=${items.length * 100}%`,
            scrub: 1,
            invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
    });
    items.forEach((item, index) => {
        timeline.to([item], {
            scale: 0.9,
            borderRadius: "10px",
        });

        direction == "horizontal"
            ? timeline.to(
                items[index + 1],
                {
                    xPercent: 0,
                },
                "<"
            )
            : timeline.to(
                items[index + 1],
                {
                    yPercent: 0,
                },
                "<"
            );
    });
}