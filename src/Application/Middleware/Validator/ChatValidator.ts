import {body, param} from 'express-validator';

const validateCreateChat = [
    body('senderUserId').isString().withMessage('Sender User ID debe ser un string'),
    body('receiverUserId').isString().withMessage('Receiver User ID debe ser un string'),
]

const validateReadMessage = [
    body('messageId').isString().withMessage('MessageId debe ser un string'),
    body('chatId').isString().withMessage('ChatId debe ser un string'),
]

const validateDeleteChat = [
    param('chatId').isString().withMessage('ChatId debe ser un string'),
]

export {validateCreateChat, validateReadMessage, validateDeleteChat};