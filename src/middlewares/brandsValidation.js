const path = require('path');
const { body } = require('express-validator');
const validations = [
    body('name').isLength({ min: 5 }).withMessage('minimo 5 caracteres'),
]


module.exports = validations;