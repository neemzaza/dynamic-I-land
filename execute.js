let leftSide = ``;
let rightSide = ``;
let type = 0;
let duration = 0;

const leftSideInput = document.getElementById("left-side");
const rightSideInput = document.getElementById("right-side");
const typeInput = document.getElementById("type-i-land");
const durationInput = document.getElementById("duration");

const leftSideElement = document.getElementById("left-side-show");
const rightSideElement = document.getElementById("right-side-show");
const typeElement = document.getElementById("type-i-land-show");
const durationElement = document.getElementById("duration-show");

const onChangeValue = () => {
    leftSide = leftSideInput.value;
    rightSide = rightSideInput.value;
    type = typeInput.value;
    duration = parseInt(durationInput.value);

    leftSideElement.innerText = leftSideInput.value;
    rightSideElement.innerText = rightSideInput.value;
    typeElement.innerText = typeInput.value;
    durationElement.innerText = parseInt(durationInput.value) + " seconds";
}

const onExecuteDynamicILand = () => {
    if (leftSide === `` || rightSide === `` || type === `` || duration <= 0) {
        return;
    }

    let typeString = "";
    if (type == 1) {
        typeString = "battery";
    } else {
        typeString = "normal";
    }
    onDynamicIslandStateChange(leftSide, rightSide, typeString, (duration * 1000))
}