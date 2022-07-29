const boardBg = document.getElementById("board");
const reset_btn = document.getElementById("reset_btn");
const modal = document.getElementById("modal_box");
const btn = document.getElementById("opt_color");
const span = document.getElementsByClassName("close")[0];
const selectBg = document.getElementById("bgCustom");
const selectPlayer1 = document.getElementById("player1Custom");
const selectPlayer2 = document.getElementById("player2Custom")

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function customColor(colorParam) {
    let colorBg = colorParam.value.toLowerCase();
    boardBg.style.backgroundColor = colorBg;
}

function customPlayer1(colorParam) {
    let colorBg = colorParam.value.toLowerCase();
    tile.classList.replace("red-piece", colorBg);
}

function customPlayer2(colorParam) {
    let colorBg = colorParam.value.toLowerCase();
    tile.classList.replace("yellow-piece", colorBg);
}
