let leftSide = ``;
let rightSide = ``;
let type = 0;

const leftSideElement = document.getElementById("left-side-show");
const rightSideElement = document.getElementById("right-side-show");
const typeElement = document.getElementById("type-i-land-show");

const onChangeValue = () => {
    leftSideElement.innerText = leftSide;
    rightSideElement.innerText = rightSide;
    typeElement.innerText = type;
}