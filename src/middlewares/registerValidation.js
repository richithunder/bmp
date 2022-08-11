const path = require('path');
const { body } = require('express-validator');

const validations = [
    body('userName').notEmpty().withMessage('No debe estar vacio').bail()
        .isLength({ min: 5 }).withMessage('Minimo 5 caracteres'),

    body('firstName').notEmpty().withMessage('No debe estar vacio').bail()
        .isLength({ min: 2 }).withMessage('Minimo 2 caracteres'),

    body('lastName').notEmpty().withMessage('No debe estar vacio').bail()
        .isLength({ min: 2 }).withMessage('Minimo 2 caracteres'),

    body('companyName').notEmpty().withMessage('No debe estar vacio'),

    body('cuit').notEmpty().withMessage('No debe estar vacio').bail()
        .isNumeric().withMessage('Ingrese un numero'),

    body('email').notEmpty().withMessage('No debe estar vacio').bail()
        .isEmail().withMessage('Debe ser un formato de correo valido'),

    body('password').notEmpty().withMessage('No debe estar vacio').bail()
        .isLength({ min: 8 }).withMessage('Minimo 8 caracteres'),

    body('contact').notEmpty().withMessage('No debe estar vacio').bail()
        .isNumeric().withMessage('Ingrese un numero'),

    body('img').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', 'gif'];
        if (!file) {
            throw new Error('Suba una imagen');
        } else {
            let fileExtensions = path.extname(file.originalname);
            if (acceptedExtensions.includes(fileExtensions) === false) {
                throw new Error('Los archivos permitidos son ' + acceptedExtensions.join(', '))
            }
        };
        return true;
    }),
]

module.exports = validations;
