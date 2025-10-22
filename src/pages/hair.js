const left = document.getElementById("left");
const right = document.getElementById("right");
const hair = document.getElementById("hair");
const couleurParent = document.getElementById("couleur");
const adress = "../../public/assets/hair/";
let text = "hair-";
let textTotal = "";
let couleur = "black-";
let indexHair = +hair.src[hair.src.length - 5];

function checkIndex() {
    indexHair = +hair.src[hair.src.length - 5];
    if (indexHair == 1) {
        left.style.opacity = 0.5;
    } else {
        left.style.opacity = 1;
    }
    if (indexHair == 3) {
        right.style.opacity = 0.5;
    } else {
        right.style.opacity = 1;
    }
}

left.addEventListener("click", function () {
    checkIndex();
    if (indexHair != 1) {
        indexHair--;
        textTotal = adress + text + couleur + (+indexHair) + ".png";
        hair.src = textTotal;
    }
    checkIndex();
});

right.addEventListener("click", function () {
    if (indexHair != 3) {
        indexHair++;
        textTotal = adress + text + couleur + (+indexHair) + ".png";
        hair.src = textTotal;
    }
    checkIndex();
});

couleurParent.childNodes.forEach((element) => {
    element.addEventListener("click", function () {
        couleur = element.id + "-";
        textTotal = adress + text + couleur + (+indexHair) + ".png";
        hair.src = textTotal;
    })
})
checkIndex();