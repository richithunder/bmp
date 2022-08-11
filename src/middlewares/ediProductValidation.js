const path = require('path');
const { body } = require('express-validator');

const validations = [
    body('productName').notEmpty().withMessage('Escriba un nombre').bail()
    .isLength({ min: 5 }).withMessage('minimo 5 caracteres'),
    body('description').notEmpty().isLength({ min: 20 }).withMessage('agregue una descripcion').bail()
    .isLength({ min: 20 }).withMessage('La descripcion debe ser superior a los 20 caracteres'),
    body('price').notEmpty().withMessage('Escriba el precio del producto').bail()
    .isNumeric().withMessage('Ingrese un numero'),
    body('minBuy').notEmpty().withMessage('Escriba el minimo de compra').bail()
    .isNumeric().withMessage('Ingrese un numero'),
    body('productImages').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', 'gif'];
        if (file) {
            let fileExtensions = path.extname(file.originalname);
            if (acceptedExtensions.includes(fileExtensions) === false) {
                throw new Error('Los archivos permitidos son ' + acceptedExtensions.join(', '))
            }
        };
        return true;
    }),
]


module.exports = validations;