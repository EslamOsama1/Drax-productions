/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

history.scrollRestoration = "manual";

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#mainNav .nav-link");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                navLinks.forEach(link => link.classList.remove("active"));

                const activeLink = document.querySelector(
                    `#mainNav .nav-link[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    },
    {
        threshold: 0.7
    }
);

sections.forEach(section => sectionObserver.observe(section));

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


window.addEventListener("load", () => {

    const nav = document.querySelector("#mainNav .navbar-nav");
    const indicator = document.querySelector(".nav-indicator");

    function updateIndicator() {

        const active = document.querySelector("#mainNav .nav-link.active");

        if (!active) return;

        const navRect = nav.getBoundingClientRect();
        const linkRect = active.getBoundingClientRect();

        indicator.style.left = (linkRect.left - navRect.left) + "px";
        indicator.style.width = linkRect.width + "px";

    }

    updateIndicator();

    window.addEventListener("resize", updateIndicator);

    const observer = new MutationObserver(updateIndicator);

    document.querySelectorAll("#mainNav .nav-link").forEach(link => {

        observer.observe(link, {
            attributes: true,
            attributeFilter: ["class"]
        });

    });

});

const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }

        });
    },
    {
        threshold: 0.35
    }
);

cards.forEach(card => observer.observe(card));


