const { body } = require('express-validator');


const validations = [

    body('username').notEmpty().withMessage('No debe estar vacio').bail()
        .isEmail().withMessage('Debe completar con un formato de e-mail valido'),

    body('password').notEmpty().withMessage('No debe estar vacio').bail()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        
]

module.exports = validations;