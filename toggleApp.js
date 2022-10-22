let toggleApp = ""

const onToggleApp = (app) => {
    // Older element!
    let contentOld = document.getElementById(toggleApp + "-content") 
    // Getting element!
    let content = document.getElementById(app + "-content") 

    // On closed
    if (toggleApp !== app && toggleApp !== "") {

        contentOld.style.visibility = "hidden"
        contentOld.style.opacity = "0"

        console.log("Closed " + app)
    }
    
    // On opened
    toggleApp = app

    content.style.visibility = "visible"
    content.style.opacity = "1"

    console.log("Opened " + app)
    return;
}