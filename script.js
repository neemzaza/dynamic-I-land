let dynamicIsland = document.getElementById("dynamic-island");

let statusLeft = document.getElementById("status-left");
let statusRight = document.getElementById("status-right");

let dynamicIslandStateToggle = false;

const largeILand = ["battery"]

const onDynamicIslandStateChange = (leftData, rightData, app) => {
    if (dynamicIslandStateToggle) return;

    if (app.includes(largeILand)) {
        

        statusLeft.style.animation = "none";
        statusRight.style.animation = "none";

        statusLeft.style.animation = "state-appear 0.25s reverse";
        statusRight.style.animation = "state-appear 0.25s reverse";

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
    }
    document.getElementById("battery").classList.add("active");

    setTimeout(() => {
    dynamicIsland.innerHTML = `
      <div class="left-data" id="left-data">
        <p>${leftData}</p>
      </div>
      <div class="right-data" id="right-data">
        <p>${rightData}</p>
      </div>
      `;
    }, 500)

    dynamicIslandStateToggle = true;


    // On time out!
    if (dynamicIslandStateToggle) {
        setTimeout(() => {
            if (app.includes(largeILand)) {
                dynamicIsland.style.position = "relative"

                statusLeft.style.animation = "none";
                statusRight.style.animation = "none";

                statusLeft.style.animation = "state-appear 0.25s";
                statusRight.style.animation = "state-appear 0.25s";

                statusLeft.style.visibility = "visible";
                statusRight.style.visibility = "visible";

                statusLeft.style.opacity = "1";
                statusRight.style.opacity = "1";
            }

            document.getElementById("left-data").classList.add("exit");
            document.getElementById("right-data").classList.add("exit");
            setTimeout(() => {
                dynamicIsland.innerHTML = `
            `;
                statusLeft.style.animation = "none";
                statusRight.style.animation = "none";
            }, 500);

            dynamicIsland.classList.remove("on-state");
            dynamicIsland.classList.remove("on-state-lg");

            document.getElementById("battery").classList.remove("active");

            // document.getElementById("left-data").classList.remove("exit");
            // document.getElementById("right-data").classList.remove("exit");

            dynamicIslandStateToggle = false;
        }, 3000);
    }
};

let date = new Date();
let time = document.getElementById("time")

setInterval(() => {
    time.innerText = date.getHours() + ":" + (date.getMinutes().toString().length === 1 ? "0" + date.getMinutes() : date.getMinutes())
}, 1000)

let batteryLevel = 0;

const batteryNumber = document.getElementById("battery-number");

window.onload = () => {
    if (!navigator.getBattery) {
        alert("Battery detect status not supported in your browser, Sorry!");
        return false;
    }
}

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
            onDynamicIslandStateChange('Charging', `<div class='green'><i class='bi bi-battery-half'></i> ${batteryLevel}%</div>`, 'battery')
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

