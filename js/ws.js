// Настройки клиента


function create_chat_connection(channel_name = '') {

    const client = new tmi.Client({
        channels: [channel_name] // Впиши сюда нужный канал
    });

    // Подключаемся
    client.connect();

    // Слушаем сообщения
    // tags — это объект со всей инфой (цвет ника, бейджи, id сообщения и т.д.)
    client.on('message', (channel, tags, message, self) => {

        // console.log(channel, tags, message);

        // Достаем данные. tmi.js сам обрабатывает, есть ли у юзера цвет
        // Если цвета нет, ставим дефолтный неоновый
        const color = tags['color'] || '#00FF00';
        const name = tags['display-name'];

        // console.log(message);


        // если в сообщении больше двух слов то игнорируем
        if (message.split(' ').length > 2) return;

        // prevent xss attack from message
        message = message.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, '');

        process_message(name, color, message);

        // Выводим на экран
        // addMessage(name, color, message);
    });

}

function addMessage(name, color, text) {
    const container = document.getElementById('chat-container');
    const div = document.createElement('div');
    div.className = 'msg-row';

    // Формируем HTML с цветом ника
    div.innerHTML = `<span class="username" style="color: ${color}">${name}:</span> ${text}`;

    container.appendChild(div);
    container.scrollTop = container.scrollHeight; // Скролл вниз
}


const checked_words = new Set();

async function process_message(name, color, word) {

    // Проверяем, есть ли слово в списке
    if (checked_words.has(word)) {
        console.log(`Слово "${word}" уже было проверено.`);
        // добавить слово в колонку .guessing .last-words в верх списка
        const last_words_container = document.querySelector('.guessing .last-words');
        const html = `<div class="msg">${word} уже было использовано</div>`;
        last_words_container.insertAdjacentHTML('afterbegin', html);
        return
    }

    // Если слова нет — выполняем логик0у
    console.log(`Новое слово: ${word}. Обрабатываю...`);

    $word_check = await kontekstno_query('score', word, secret_word_id);

    if (!$word_check.distance) {
        console.log(`Слово "${word}" не имеет дистанци.`);
        return
    }

    // добавить слово в колонку .guessing .best-match в верх списка
    const best_match_container = document.querySelector('.guessing .best-match');

    const html = `
        <div class="msg" data-distance="${$word_check.distance}">

            <div class="bg" style="width: 50%"></div>

            <div class="word-and-distance">
                <div class="word">${word}</div>
                <div class="distance">${$word_check.distance}</div>
            </div>

        </div>
    `;

    console.log($word_check);

    // И добавляем в список
    checked_words.add(word);


батон 30
хлеб 40

    //

    // добавить сообщение в .guessing .last-words в верх списка

    // добавить сообщение в отсортированный список по дистанции

}