import { Game } from "./game.js";

const easyMode = new Game(10, 8, 8);
const mediumMode = new Game(15, 12, 12);
const hardMode = new Game(22, 16, 16);
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#Hard");
const newGame = document.querySelector(".smile");
newGame!.addEventListener("click", () => easyMode.render());
easy!.addEventListener("click", () => easyMode.render());
medium!.addEventListener("click", () => mediumMode.render());
hard!.addEventListener("click", () => hardMode.render());
document.addEventListener("DOMContentLoaded", () => easyMode.render());
