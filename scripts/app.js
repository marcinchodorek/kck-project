var rootElement = document.documentElement;

const removeElement = (element) => {
    const parent = element.parentElement;
    parent.remove();
}

const goToTop = () => {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}