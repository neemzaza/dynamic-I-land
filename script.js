let dynamicIsland = document.getElementById("dynamic-island");

let statusLeft = document.getElementById("status-left");
let statusRight = document.getElementById("status-right");

const problem = document.getElementById("problem")

let dynamicIslandStateToggle = false;

const largeILand = ["battery"]

let allProblem = []

const onDynamicIslandStateChange = (leftData, rightData, app, duration) => {
    if (dynamicIslandStateToggle) return;

    if (app.includes(largeILand)) {
        

        statusLeft.style.animation = "none";
        statusRight.style.animation = "none";

        statusLeft.style.animation = "state-appear-reverse 0.25s forwards";
        statusRight.style.animation = "state-appear-reverse 0.25s forwards";

        statusLeft.style.visibility = "hidden";
        statusRight.style.visibility = "hidden";

        statusLeft.style.opacity = "0";
        statusRight.style.opacity = "0";

        setTimeout(() => {
            dynamicIsland.classList.add("on-state-lg");
            dynamicIsland.style.position = "absolute"
        }, 250);
    } else {
        dynamicIsland.classList.add("on-state");

        if (app === "normal") {
            // statusRight.children[1].style.animation = "state-appear-reverse 0.25s forwards";

            // setTimeout(() => {
                statusRight.children[0].style.animation = "bouncing 1s forwards";
                statusRight.children[1].style.animation = "status-icon-disappear 1s forwards";
                statusRight.children[2].style.animation = "bouncing 1s forwards";
            // }, 250);
        }
    }


    if (app === "")
        document.getElementById(app).classList.add("active");


    setTimeout(() => {
    dynamicIsland.innerHTML = `
      <div class="left-data" id="left-data">
        <p>${leftData}</p>
      </div>
      <div class="right-data" id="right-data">
        <p>${rightData}</p>
      </div>
      `;
    }, 250)

    dynamicIslandStateToggle = true;


    // On time out!
    if (dynamicIslandStateToggle) {
        setTimeout(() => {
            

            if (app.includes(largeILand)) {
                statusLeft.style.animation = "none";
                statusRight.style.animation = "none";

                dynamicIsland.style.position = "relative"

                statusLeft.style.animation = "state-appear 0.25s";
                statusRight.style.animation = "state-appear 0.25s";

                statusLeft.style.visibility = "visible";
                statusRight.style.visibility = "visible";

                statusLeft.style.opacity = "1";
                statusRight.style.opacity = "1";
            } else {
                if (app === "normal") {
                    // statusRight.children[1].style.animation = "state-appear 0.25s forwards";

                    // setTimeout(() => {
                        statusRight.children[1].style.animation = "status-icon-appear .5s forwards";
                    // }, 250);
                }
            }

            document.getElementById("left-data").classList.add("exit");
            document.getElementById("right-data").classList.add("exit");

            statusLeft.style.animation = "bouncing 1s forwards";
            statusRight.children[0].style.animation = "bouncing 1s forwards";
            statusRight.children[2].style.animation = "bouncing 1s forwards";

            setTimeout(() => {
                dynamicIsland.innerHTML = `
            `;
                statusLeft.style.animation = "none";
                statusRight.style.animation = "none";

                statusRight.children[0].style.animation = "none";
                statusRight.children[1].style.animation = "none";
                statusRight.children[2].style.animation = "none";
            }, 1000);

            dynamicIsland.classList.remove("on-state");
            dynamicIsland.classList.remove("on-state-lg");

            if (app === "") document.getElementById(app).classList.remove("active");

            // document.getElementById("left-data").classList.remove("exit");
            // document.getElementById("right-data").classList.remove("exit");

            dynamicIslandStateToggle = false;
        }, duration);
    }
};

let time = document.getElementById("time")

const executeTime = () => {
    let date = new Date();
    time.innerText = date.getHours() + ":" + (date.getMinutes().toString().length === 1 ? "0" + date.getMinutes() : date.getMinutes())
}

executeTime()

setInterval(() => executeTime(), 1000)

let batteryLevel = 0;

const batteryNumber = document.getElementById("battery-number");

window.onload = () => {
    if (!navigator.getBattery) {
        allProblem.push("Battery detect status not supported in your browser");

        if (allProblem.length > 0) {
            problem.style.visibility = "visible"
            problem.children.item(1).innerHTML += `<li>${allProblem[0]}</li>`
        }

        return false;
    }
}



// Battery Worker

navigator.getBattery().then(battery => {
    const updateBatteryLevel = () => {
        batteryLevel = battery.level * 100;

        if (!battery.charging) batteryNumber.innerText = batteryLevel;
        else batteryNumber.innerHTML = batteryLevel + `<i class="bi bi-lightning-charge-fill"></i>`
        
    }
    updateBatteryLevel()

    // When charging level changed
    battery.addEventListener("levelchange", () => {
        updateBatteryLevel()
    })

    const chargingState = () => {
        if (battery.charging) {
            console.log("charging...")
            batteryNumber.classList.add("charging")
            onDynamicIslandStateChange('Charging', `<div class='green'><i class='bi bi-battery-half'></i> ${batteryLevel}%</div>`, 'battery', 3000)
        } else {
            console.log("not charging...")
            batteryNumber.classList.remove("charging")
        }
    }

    chargingState();

    battery.addEventListener("chargingchange", () => {
        chargingState()
        updateBatteryLevel()
    })

    console.log(battery)
})

