const times = document.querySelectorAll(".time");
let i = 0;
let interval = setInterval(() => {
    times[i].style.opacity = 1;
    times[i].style.transform = "translateY(0)";
    i++;
    if (i === times.length) {
        clearInterval(interval);
    }
}, 500);

const text = document.querySelector(".text");
const myText = "You know where to find me :)";
const herText = "And I know where to look >.<";

const me = document.querySelector(".me");
const her = document.querySelector(".her");

let hasStarted = false;

function typeText(element, text, delay = 60) {
    return new Promise((resolve) => {
        if (!element) return resolve();

        let index = 0;
        let interval = setInterval(() => {
            element.textContent += text[index];
            index++;

            if (index === text.length) {
                clearInterval(interval);
                resolve();
            }
        }, delay);
    });
}

function showText() {
    if (!me || !her) return;

    typeText(me, myText)
        .then(() => new Promise((resolve) => setTimeout(resolve, 500)))
        .then(() => typeText(her, herText));
}

const isMobile = window.matchMedia("(max-width: 768px)").matches;

window.addEventListener("scroll", () => {
    let textThreshold = isMobile ? 200 : 300;
    let startThreshold = isMobile ? 2137 : 1490;
    console.log(window.scrollY);

    if (text && window.scrollY >= textThreshold) {
        text.style.opacity = 1;
        text.style.transform = "translateY(0)";
    }

    if (window.scrollY >= startThreshold && !hasStarted) {
        hasStarted = true;
        showText();
    }
});
