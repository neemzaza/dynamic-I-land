let backgroundInput = document.getElementById("background-input");
let screenElement = document.getElementById("screen");

let urlDetect = ["http://", "https://"]
 
const onChangeBackground = () => {
    if (backgroundInput.value === "") return;

    if (backgroundInput.value.includes("https://")) {
        screenElement.style.background = `url("${backgroundInput.value}")`;
        screenElement.style.backgroundSize = "cover";
        screenElement.style.backgroundRepeat = "no-repeat";
    }

    screenElement.style.background = backgroundInput.value;
}