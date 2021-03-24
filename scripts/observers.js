const heroImg = document.querySelector('.hero img');
const navbar = document.querySelector('nav');


const imgObserverOptions = {
    rootMargin: "-150px 0px 0px 0px"
};

const imgObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            navbar.classList.remove('nav-alter');
        } else {
            navbar.classList.add('nav-alter');
        }
    })
}, imgObserverOptions);

imgObserver.observe(heroImg);

