document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute("href");

            if (targetUrl) {
                document.body.classList.add("fade-out");
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 1000); // Match this duration with the CSS transition duration
            }
        });
    });
});
