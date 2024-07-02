import Joi from "joi";


export const carValidator = Joi.object({
    brand: Joi.string().pattern(/^[a-zA-Zа-яА-яёЁіІїЇєЄҐґ]{1,20}$/).required().messages({
        'string.pattern.base': 'Only letters (English alphabet, Cyrillic alphabet, Ukrainian alphabet), min 1 max 20 letters'
    }),
    price: Joi.number().required().min(0).max(1_000_000).messages({
        'number.min': 'minimum 0',
        'number.max': 'maximum 1.000.000'
    }),
    year: Joi.number().required().min(1994).max(new Date().getFullYear()).messages({
        'number.min': 'minimum 1994',
        'number.max': 'maximum current year'
    })
})