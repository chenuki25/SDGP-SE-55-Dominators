const body = document.querySelector("body");
const class1 = document.querySelector("class1");
const toggle = document.querySelector("#toggle");
const sun = document.querySelector(".toggle .bxs-sun");
const moon = document.querySelector(".toggle .bx-moon");

toggle.addEventListener("change", () => {
    
    body.classList.toggle("dark");
    sun.className = sun.className == "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun";
    moon.className = moon.className == "bx bxs-moon" ? "bx bx-moon" : "bx bxs-moon";

});