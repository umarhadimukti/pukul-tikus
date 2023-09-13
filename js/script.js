const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const papanSkor = document.querySelector(".skor");
const audio = document.querySelector("#audio");
let tanahBefore;
let finish;
let skor;

function randomTanah(tanahParam) {
    const random = Math.floor(Math.random() * tanah.length);
    const tRandom = tanahParam[random]; //bug
    if (tRandom == tanahBefore) {
        randomTanah(tanahParam)
    }
    tanahBefore = tRandom;
    return tRandom;
}

function randomTime(max, min) {
    return Math.round(Math.random() * (max-min) + min);
}

function getTikus() {
    const tanahRandom = randomTanah(tanah);
    const time = randomTime(700, 400);
    tanahRandom.classList.add("muncul");
    setTimeout(() => {
        tanahRandom.classList.remove("muncul");
        if (!finish) {
            getTikus();
        }
    }, time);
}

// ------------------------------------------------------

function start() {
    skor = 0;
    finish = false;
    papanSkor.textContent = 0; 
    getTikus();
    setTimeout(() => {
        finish = true;
    }, 20000);
}

function pukul() {
    skor++;
    papanSkor.textContent = skor;
    audio.play();
    this.parentNode.classList.remove("muncul");
}

tikus.forEach(t => {
    t.addEventListener("click", pukul);
});