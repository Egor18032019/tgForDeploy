module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
          text: '1',
          callback_data: '1'
        }, {
          text: '2',
          callback_data: '2'
        }, {
          text: '3',
          callback_data: '3'
        }],
        [{
          text: '4',
          callback_data: '4'
        }, {
          text: '5',
          callback_data: '5'
        }, {
          text: '6',
          callback_data: '6'
        }],
        [{
          text: '7',
          callback_data: '7'
        }, {
          text: '8',
          callback_data: '8'
        }, {
          text: '9',
          callback_data: '9'
        }],
        [{
          text: '0',
          callback_data: '0'
        }],
      ]
    })
  },

  againOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
          text: 'Играть еще раз',
          callback_data: '/again'
        }],
      ]
    })
  },
  funOptions: {
    reply_markup: JSON.stringify({
      keyboard: [
        [{
          text: 'Музыка',
          callback_data: 'musik'
        }],
        [{
          text: 'Как дела у Бильбо ?',
          callback_data: 'textB'
        }],
      ]
    })
  },
  mailOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
          text: 'Эл.почта',
          callback_data: 'mail'
        }],
        [{
          text: 'Телеграмм',
          url: 'https://t.me/Egor_from_Ekaterinburg'
        }],
      ]
    })
  },

  lifeOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{
          // text: `План 8 этажа ${emoji.get('ru')}`,
          text: 'План 8 этажа',
          callback_data: 'plan8' // данные для обработчика событий
        }, {
          text: 'План 9 этажа', // текст на кнопке
          callback_data: 'plan9' // данные для обработчика событий
        }],
        [{
          // text: `План 8 этажа ${emoji.get('ru')}`,
          text: 'План новых помещений на 8 этаже',
          callback_data: 'plan8new' // данные для обработчика событий
        }, {
          text: 'План новых помещений на 9 этаже', // текст на кнопке
          callback_data: 'plan9new' // данные для обработчика событий
        }],
        [{
          // text: `План 8 этажа ${emoji.get('ru')}`,
          text: 'План 3 этажа',
          callback_data: 'plan3' // данные для обработчика событий
        }, {
          text: 'План 5 этажа', // текст на кнопке
          callback_data: 'plan5' // данные для обработчика событий
        }],
        [{
          text: 'свободные р.м. на 8 этаже(old)',
          callback_data: '8floorSpace'
        }, {
          text: 'свободные р.м. на 9 этаже(old)',
          callback_data: '9floorSpace'
        }],
      ]
    })
  },
}