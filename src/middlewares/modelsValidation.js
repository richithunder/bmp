const path = require('path');
const { body } = require('express-validator');
const validations = [
    body('name').notEmpty().withMessage('debes asignar un nombre').bail().isLength({ min: 5 }).withMessage('minimo 5 caracteres'),
    body('description').notEmpty().withMessage('agregar descripcion del modelo').bail().
    isLength({ min: 5 }).withMessage('minimo 5 caracteres'),
    body('brand_id').notEmpty().withMessage('agregue un modelo al producto')
]


module.exports = validations;