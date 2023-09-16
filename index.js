const root = document.getElementById("root");
const body = document.body

const state = {
    active: false,
}

const menu = document.createElement("a");
menu.textContent = "Клик";
menu.classList.add("Click");

root.appendChild(menu);

menu.addEventListener('click', () => {
    renderModuleMenu();
    state.active = !state.active;
})

document.addEventListener('click', (e) => {
    const click = document.querySelector('.Click')

    if (state.active === true) {
        const moduleMenu = document.querySelector('.ModuleMenu');
        const array = Array.from(moduleMenu.childNodes)
        if (e.target !== click &&  e.target !== moduleMenu) {
            moduleMenu.remove()
            state.active = !state.active;
        }
    }
})

function renderModuleMenu() {
    if (state.active === false) {
        const moduleMenu = document.createElement("div");
        moduleMenu.classList.add("ModuleMenu");
        root.appendChild(moduleMenu);

        const text = document.createElement("span")
        text.textContent = "Какой-то текст в модальном окне"
        moduleMenu.appendChild(text)

        text.addEventListener('click', (event) => {
            event.stopPropagation();
        })

    } else {
        const moduleMenu = document.querySelector('.ModuleMenu');
        moduleMenu.remove();
    }
}