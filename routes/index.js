const express = require("express");
const config = require('../config/marusia')

const tempUserData = {}

const router = express.Router();

router.use((req, res, next) => {
    req.command = req.body.request.command.toLowerCase()
    next()
})

router.post('/', async (req, res) => {
    switch(req.command) {
        case `${config.ourCommandName} вездеход`:
            res.json({
                response: {
                    text: 'Привет вездекодерам! Чтобы начать тест, произнесите команду "начать тест" или нажмите на кнопку ниже',
                    tts: 'Привет везде кодерам! Чтобы начать тест, произнесите команду "начать тест" или нажмите на кнопку ниже',
                    buttons: [{
                        title: 'Начать тест'
                    }],
                    end_session: false
                },
                session: req.body.session,
                version: req.body.version
            })
            break;
        case 'начать тест':
            tempUserData[req.body.session.user_id] = {
                questionIndex: 0,
                questionsAnswers: []
            }

            res.json({
                response: {
                    text: `Начинаем тест! Для ответов используйте "да"/"нет" или кнопки ниже \n \n Первый вопрос: ${config.questions[0]}`,
                    tts:  `Начинаем тест! Для ответов используйте "да"/"нет" или кнопки ниже. Первый вопрос: ${config.questions[0]}`,
                    buttons: [{
                        title: 'Да'
                    }, {
                        title: 'Нет'
                    }],
                    end_session: false
                },
                session: req.body.session,
                version: req.body.version
            })
            break;

        case 'да':
            if (tempUserData[req.body.session.user_id].questionIndex == 7) {
                let categories = ''
                for (i in tempUserData[req.body.session.user_id].questionsAnswers) {
                    if (i == 0 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Gamedev, `
                    }
                    if (i == 1 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `VK Mini Apps, `
                    }
                    if (i == 2 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Web, `
                    }
                    if (i == 3 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Computer Vision, `
                    }
                    if (i == 4 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Маруся, `
                    }
                    if (i == 5 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Дизайн интерфейсов, `
                    }
                    if (i == 6 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Backend, `
                    }
                    if (i == 7 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Анализ данных`
                    }
                }
                if (categories !== '') {
                    res.json({
                        response: {
                            text: `Вам подойдут следующие категории: ${categories}`,
                            tts:  `<speaker audio=marusia-sounds/game-win-1>Вам подойдут следующие категории: ${categories}`,
                            buttons: [{
                                title: "Регистрация на вездекод",
                                url: "https://vk.com/app7543093"
                            }],
                            end_session: false
                        },
                        session: req.body.session,
                        version: req.body.version
                    })
                } else {
                    res.json({
                        response: {
                            text: `К сожалению, вам не подойдут никакие категории`,
                            tts: `<speaker audio=marusia-sounds/game-loss-1>К сожалению, вам не подойдут никакие категории`,
                            buttons: [],
                            end_session: false
                        },
                        session: req.body.session,
                        version: req.body.version
                    })
                }
                break;
            }
            tempUserData[req.body.session.user_id].questionIndex += 1
            tempUserData[req.body.session.user_id].questionsAnswers.push(1)

            res.json({
                response: {
                    text: `${config.questions[tempUserData[req.body.session.user_id].questionIndex]}`,
                    tts:  `<speaker audio=marusia-sounds/game-8-bit-coin-1> ${config.questions[tempUserData[req.body.session.user_id].questionIndex]}`,
                    buttons: [{
                        title: 'Да'
                    }, {
                        title: 'Нет'
                    }],
                    end_session: false
                },
                session: req.body.session,
                version: req.body.version
            })
            break;
        case 'нет':
            if (tempUserData[req.body.session.user_id].questionIndex == 1) {
                let categories = ''
                for (i in tempUserData[req.body.session.user_id].questionsAnswers) {
                    if (i == 0 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Gamedev, `
                    }
                    if (i == 1 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `VK Mini Apps, `
                    }
                    if (i == 2 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Web, `
                    }
                    if (i == 3 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Computer Vision, `
                    }
                    if (i == 4 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Маруся, `
                    }
                    if (i == 5 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Дизайн интерфейсов, `
                    }
                    if (i == 6 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Backend, `
                    }
                    if (i == 7 && tempUserData[req.body.session.user_id].questionsAnswers[i] == 1) {
                        categories += `Анализ данных`
                    }
                }
                if (categories !== '') {
                    res.json({
                        response: {
                            text: `Вам подойдут следующие категории: ${categories}`,
                            tts:  `<speaker audio=marusia-sounds/game-win-1>Вам подойдут следующие категории: ${categories}`,
                            commands: [{
                                type: "Регистрация на вездекод",
                                url: "https://vk.com/app7543093",
                            }],
                            end_session: false
                        },
                        session: req.body.session,
                        version: req.body.version
                    })
                } else {
                    res.json({
                        response: {
                            text: `К сожалению, вам не подойдут никакие категории`,
                            tts: `<speaker audio=marusia-sounds/game-loss-1>К сожалению, вам не подойдут никакие категории`,
                            buttons: [],
                            end_session: false
                        },
                        session: req.body.session,
                        version: req.body.version
                    })
                }
                break;
            }
            tempUserData[req.body.session.user_id].questionIndex += 1
            tempUserData[req.body.session.user_id].questionsAnswers.push(0)
    
            res.json({
                response: {
                    text: `${config.questions[tempUserData[req.body.session.user_id].questionIndex]}`,
                    tts:  `<speaker audio=marusia-sounds/game-8-bit-coin-1> ${config.questions[tempUserData[req.body.session.user_id].questionIndex]}`,
                    buttons: [{
                        title: 'Да'
                    }, {
                        title: 'Нет'
                    }],
                    end_session: false
                },
                session: req.body.session,
                version: req.body.version
            })
            break;
        default:
            res.json({
                response: {
                    text: 'Я не знаю такой команды',
                    tts: 'Я не знаю такой команды',
                    buttons: [],
                    end_session: false
                },
                session: req.body.session,
                version: req.body.version
            })
    }
})

module.exports = router;