"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const handleCastErrorDB = (error) => {
    const message = `Invalid ${error.path}: ${error.value}.`;
    return new appError_1.default(message, 400);
};
const handleValidationErrorDB = (error) => {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new appError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (error) => {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new appError_1.default(message, 400);
};
const sendErrorDev = (error, req, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
        stack: error.stack
    });
};
const sendErrorProd = (error, req, res) => {
    if (!error.isOperational) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    });
};
const errorController = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development')
        sendErrorDev(err, req, res);
    else {
        let error = Object.assign({}, err);
        error.message = err.message;
        if (err.name === 'CastError')
            error = handleCastErrorDB(error);
        if (err.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        if (err.code === 11000)
            error = handleDuplicateFieldsDB(error);
        sendErrorProd(error, req, res);
    }
};
exports.default = errorController;
