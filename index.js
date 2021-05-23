const TelegramApi = require('node-telegram-bot-api')
const {
    gameOptions,
    againOptions,
    lifeOptions
} = require('./options')
// const sequelize = require('./db');
// const UserModel = require('./models/models');
const PLAN8 = "./img/Ekaterinburg_8floor.jpg";
const token = '1253154776:AAHRF2QNN6VN06BasE4uE1chlbFZ_lzBULk'

const bot = new TelegramApi(token, {
    polling: true
})

const chats = {}
let itGame = false;
//--

const URL = {
    // POST: `https://sheets.googleapis.com/v4/spreadsheets/AIzaSyACvURZ36YS0q1lcePVxO13mLWuu02uq6g/values:batchUpdate`,
    POST: `https://script.google.com/macros/s/AKfycby_hcQQ99DAAm1y7E8pZyKHc_OBu0spx94LPorq3m60qhrdPtcR/exec`,
    GET801: `https://script.google.com/macros/s/AKfycby_hcQQ99DAAm1y7E8pZyKHc_OBu0spx94LPorq3m60qhrdPtcR/exec`,
    GET901: `https://script.google.com/macros/s/AKfycbxlU4-ran0HBA9kFVPT0uh_xxZgHJU2PipOHWVZhcEJEJThaZuK/exec`
};
// картинки для бота лежащие на Yandex Object Sнtorage; опционально
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
const idAdmin = 592775497;

//--

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber; //  в обьект по ключу добавляем значение загаданой цифры
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
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, в игре у тебя правильных ответов ${user.right}, неправильных ${user.wrong}`);
            }
            if (text === '/game') {
                itGame = true;
                return startGame(chatId);
            }
            if (text === "/command") {
                return bot.sendMessage(chatId, 'выбери тут', lifeOptions);
            }
            console.log(`---message------` + JSON.stringify(text))

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