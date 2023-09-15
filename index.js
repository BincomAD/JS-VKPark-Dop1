const root = document.getElementById("root")

const menu = document.createElement("a")
menu.textContent = "Клик"

root.appendChild(menu)

menu.onclick = function() {
    renderModuleMenu()
}

function renderModuleMenu() {
    const moduleMenu = document.CreateElement("div")
    
}