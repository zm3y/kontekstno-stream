async function getData() {
    const url = "https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/random-challenge";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
}

function renderChallenge(data) {
    const bestMatchDiv = document.querySelector('.best-match');
    const lastWordsDiv = document.querySelector('.last-words');

    console.log(data);

    // Проверяем структуру и рисуем 
    if (data && data.id) {
        // output challenge data
        bestMatchDiv.innerHTML = JSON.stringify(data);
    } else {
        bestMatchDiv.innerText = "Пришли странные данные";
    }
}

// menu click handlers
function initMenu() {
    const menuItems = document.querySelectorAll('.menu ul li span');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Menu clicked:', item.textContent);
        });
    });
}

// basic app init
async function app() {
    try {
        initMenu();
        const data = await getData();
        renderChallenge(data);
    } catch (error) {
        console.error(error);
    }
}

app();
