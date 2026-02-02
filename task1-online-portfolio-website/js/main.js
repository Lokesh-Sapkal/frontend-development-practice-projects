document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

const resumeBtn = document.querySelector(".resume-btn");

if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
        alert("Your resume download will start now.");
    });
}