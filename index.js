const TelegramApi = require('node-telegram-bot-api')
const fetch = require('node-fetch');

const {
    gameOptions,
    againOptions,
    lifeOptions,
    mailOptions,
    funOptions
} = require('./options')
// const sequelize = require('./db');
// const UserModel = require('./models/models');
const token = '1253154776:AAHRF2QNN6VN06BasE4uE1chlbFZ_lzBULk'

const bot = new TelegramApi(token, {
    polling: true
})

const chats = {}
let itGame = false;
//--

const URL = {
    GET801: `https://script.google.com/macros/s/AKfycby_hcQQ99DAAm1y7E8pZyKHc_OBu0spx94LPorq3m60qhrdPtcR/exec`,
    GET901: `https://script.google.com/macros/s/AKfycbxlU4-ran0HBA9kFVPT0uh_xxZgHJU2PipOHWVZhcEJEJThaZuK/exec`
};
const PICTURE = {
    PLAN3: "./img/Ekaterinburg_3floor.jpg",
    PLAN5: "./img/Ekaterinburg_5floor.jpg",
    PLAN8: "./img/Ekaterinburg_8floor.jpg",
    PLAN8NEW: "./img/Ekaterinburg_8floor_new.jpg",
    PLAN9: './img/Ekaterinburg_9floor.jpg',
}
const pageEkbUrl = 'https://yandex.ru/maps/geo/yekaterinburg/53166537/?ll=60.601571%2C56.788751&source=wizgeo&utm_medium=maps-desktop&utm_source=serp&z=10';

const AUDIO = [
    "https://storage.yandexcloud.net/img-bot-bucket/tg-bot-audio/Defend Castle.mp3",
    "https://storage.yandexcloud.net/img-bot-bucket/tg-bot-audio/Win Battle.mp3",
    "https://storage.yandexcloud.net/img-bot-bucket/tg-bot-audio/LoseCombat.mp3",
    "https://storage.yandexcloud.net/img-bot-bucket/tg-bot-audio/Surrender Battle.mp3",
]
const randArr = (arr) => {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand]
}

function getTrigger(str) {
    const triggerWords = ['дурак', 'дура', 'тупой', 'умри', 'глупый', 'глуп', `дурой`];
    for (let item of triggerWords) {
        if (str.includes(item)) {
            return true;
        }
    }
    return false;
}

// Определение функции получения данных и возврат отфильтрованных данных:
const forTitleFilter = async (url, filter) => {
    let arrSpace = await getData(url)
    return arrSpace.filter((place) => {
        // return place.titlle.toLowerCase() === filter;
        return place.titlle === filter;
    });
};

const idAdmin = 592775497;

// Определение функции получения данных c гугл таблицы:
async function getData(url) {
    try {
        const data = await fetch(url);
        const json = await data.json();
        const answer = adapter(json);
        return answer;
    } catch (err) {
        console.error('Fail to fetch data: ' + err);
        return 'Мысль потеряна! Попробуй ещё раз.';
    }
}
const adapter = function (data) {
    var result = []
    var dataArray = data.result
    for (var i = 0; i < dataArray.length; i++) {
        var nextArray = dataArray[i]
        var adapterArray = {
            id: nextArray[0],
            titlle: nextArray[1],
            company: nextArray[2],
            departmens: nextArray[3],
            otdel: nextArray[4],
            gender: nextArray[5],
            coordinateX: nextArray[6],
            coordinateY: nextArray[7],
            avatar: nextArray[8],
            timein: nextArray[9],
            timeout: nextArray[10],
            description: nextArray[11],
            photo: nextArray[12],
            notebook: nextArray[13],
            apllebook: nextArray[14],
            sistemnik: nextArray[15],
            telephone: nextArray[16],
        }

        result.push(adapterArray)

    }
    return result;
}
/**
 * Определение функции получения данных с гугл таб и возврат длины массива
 * @param {string} url адрес где брать
 * @returns {number} кол-во р.м.
 */
const sendQuantity = async (url) => {
    let arrSpace = await getData(url)
    let arrFreeSpace = arrSpace.filter(
        (place) => {
            return place.titlle === "";
        }
    )
    return arrFreeSpace.length;
}
//--

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber; //  в обьект по ключу добавляем значение загаданой цифры
     console.log(`---chats------` + JSON.stringify(chats))
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = async () => {

    // try {
    //     await sequelize.authenticate()
    //     await sequelize.sync()
    // } catch (e) {
    //     console.log('Подключение к бд сломалось', e)
    // }
    // команды в командной строке
    bot.setMyCommands([{
            command: '/start',
            description: 'Начальное приветствие'
        },
        {
            command: '/info',
            description: 'Получить информацию о пользователе'
        },
        {
            command: '/game',
            description: 'Игра угадай цифру'
        },
        {
            command: '/command',
            description: 'Где кто сидит и т.п.'
        },
        {
            command: '/fun',
            description: 'музыка и т.п.'
        },
        {
            command: '/mail',
            description: 'Написать мне.'
        },

    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        try {
            if (text === '/start') {
                // await UserModel.create({
                //     chatId
                // })
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
                return bot.sendMessage(chatId, `Добро пожаловать в мой телеграм бот.`);
            }
            if (text === '/info') {
                // const user = await UserModel.findOne({
                //     chatId
                // })
                // return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}, в игре у тебя правильных ответов ${user.right}, неправильных ${user.wrong}`);
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
            }
            if (text === '/game') {
                itGame = true;
                return startGame(chatId);
            }
            if (text === "/command") {
                return bot.sendMessage(chatId, 'выбери тут', lifeOptions);
            }
            if (text === "/fun") {
                return bot.sendMessage(chatId, 'выбери тут', funOptions);
            }
            if (text === "/mail") {
                return bot.sendMessage(chatId, 'выбери тут', mailOptions);
            }
            if (getTrigger(text)) {
                let botMsg = msg.from.first_name + ', не ругайся, а то забаню!'
                return bot.sendMessage(chatId, botMsg);
            }
            if (text === "/help") {
                let botMsg = 'Если нужнно знать номер рабочего места сотрудника набери "Поиск {номер этажа} {Имя} + {первая буква фамилии}"'
                return bot.sendMessage(chatId, botMsg);

            }
            if (text.includes(`Поиск 8 `)) {
                let botMsg;
                const index = text.slice(8)
                console.log(`---index------` + JSON.stringify(index))
                const arrayWorkedSpace9 = await forTitleFilter(URL.GET801, index)
                // выдавать первое найденое совпадение или все ?
                // а если будут совпадения ? маловероятно но...
                console.log(arrayWorkedSpace9.length)
                if (arrayWorkedSpace9.length > 0) {
                    botMsg = `Рабочее место №` + arrayWorkedSpace9[0].id + ` на 8 этаже`;
                } else {
                    botMsg = `Не можем найти сотрудника`;
                }
                return bot.sendMessage(chatId, botMsg);
            }
            console.log(`---message------` + JSON.stringify(text))
            console.log(`---message------` + text.includes(`Поиск 8 `))
            return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибочка!)');
        }

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            itGame = true
            return startGame(chatId)
        }
        if (data === "plan8") {
            return bot.sendPhoto(chatId, PICTURE.PLAN8);
        }
        if (data === "plan9") {
            return bot.sendPhoto(chatId, PICTURE.PLAN9);
        }
        if (data === "plan3") {
            return bot.sendPhoto(chatId, PICTURE.PLAN3);
        }
        if (data === "plan5") {
            return bot.sendPhoto(chatId, PICTURE.PLAN5);
        }
        if (data === "plan8new") {
            return bot.sendPhoto(chatId, PICTURE.PLAN8NEW);
        }
        if (data === "plan9new") {
            return bot.sendMessage(chatId, "Не сделали еще...");
        }
        if (data === "8floorSpace") {
            let botMsg = await sendQuantity(URL.GET801) + ` р.м. свободно на 8 этаже(Но это не точно...)`;
            return bot.sendMessage(chatId, botMsg);
        }
        if (data === "9floorSpace") {
            let botMsg = await sendQuantity(URL.GET901) + ` р.м. свободно на 9этаже(Но это не точно...)`;
            return bot.sendMessage(chatId, botMsg);
        }

        console.log(`---callback_query------` + JSON.stringify(data))
        if (itGame === true) {
            // const user = await UserModel.findOne({
            //     chatId
            // })

            if (data == chats[chatId]) {
                // user.right += 1;
                itGame = false
                await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
            } else {
                // user.wrong += 1;
                itGame = false
                await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
            }
            // await user.save();
        }
    })
}

start()