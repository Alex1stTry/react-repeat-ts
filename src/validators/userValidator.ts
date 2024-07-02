import Joi from "joi";

export const userValidator = Joi.object({
    username: Joi.string().required().pattern(/^[a-zA-Z]\w{1,19}$/).messages({
        'string.pattern.base': 'First must be letter, next 19 symbols ( letters, symbols or underscore )'
    }),
    password: Joi.string().required().pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])[^\s]{8,20}$/).messages({
        'string.pattern.base':  'Строка должна содержать хотя бы одну цифру, Строка должна содержать хотя бы одну заглавную букву, Строка должна содержать хотя бы одну строчную букву, Строка должна содержать хотя бы один специальный символ (не букву, не цифру и не пробел), Строка должна состоять из 8-20 '
    })
})