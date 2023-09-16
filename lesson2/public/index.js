console.log('start');

const rootElement = document.querySelector("#root");
const menuElement = document.createElement("aside");
const pageElement = document.createElement("main");
rootElement.appendChild(menuElement);
rootElement.appendChild(pageElement);


const config = {
    menu: {
        feed: {
            href: '/feed',
            name: 'Лента',
            render: renderFeed,
        },
        login: {
            href: '/login',
            name: 'Авторизироваться',
            render: renderLogin,
        },
        signup: {
            href: '/signup',
            name: 'Зарегистрироваться',
            render: renderSignup,
        },
        profile: {
            href: '/profile',
            name: 'Профиль',
            render: renderProfile,
        }
    }
}

const state = {
    activeMenu: null,
    menuElement: {},
}

function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        callback(xhr.status, xhr.responseText);
    });

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
    }

    xhr.send();
}

function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

function renderLogin() {
    const form = document.createElement('form');

    const emailInput = createInput('email', 'Емайл', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Войти!';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);

    form.addEventListener('submit', (element) => {
        element.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        ajax(
            'POST',
            '/login',
            {password, email},
            (status) => {
                if (status === 200) {
                    goToPage(state.menuElements.profile);
                    return;
                }

                alert('НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            }
        )
    });

    return form;
}

function renderSignup() {
    const form = document.createElement('form');

    const emailInput = createInput('email', 'Емайл', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');
    const ageInput = createInput('number', 'Возраст', 'age');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Зарегистрироваться';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(ageInput);
    form.appendChild(submitBtn);

    return form;
}

function renderFeed() {
    const feedElement = document.createElement('div');

    ajax(
        'GET',
        '/feed',
        null,
        (status, responseString) => {
            let isAuthorized = false;

            if (status === 200) {
                isAuthorized = true;
            }

            if (!isAuthorized) {
                alert('Нет авторизации!');
                goToPage(state.menuElement.login);
                return;
            }

            const images = JSON.parse(responseString);

            if (images && Array.isArray(images)) {
                const div = document.createElement('div');
                feedElement.appendChild(div);

                images.forEach(({stc, likes}) => {
                    div.innerHTML += `<img src="${src}" width="500" /><div>${likes} лайков</div>`;
                });
            }
        }
    );

    return feedElement;
}