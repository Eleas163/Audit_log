"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeposit = exports.updateDeposit = exports.createDeposit = exports.getDeposit = exports.getAllDeposit = void 0;
const handlerFactory_1 = require("./handlerFactory");
const depositModel_1 = __importDefault(require("../model/depositModel"));
exports.getAllDeposit = (0, handlerFactory_1.getAll)(depositModel_1.default);
exports.getDeposit = (0, handlerFactory_1.getOne)(depositModel_1.default);
exports.createDeposit = (0, handlerFactory_1.createOne)(depositModel_1.default);
exports.updateDeposit = (0, handlerFactory_1.updateOne)(depositModel_1.default);
exports.deleteDeposit = (0, handlerFactory_1.deleteOne)(depositModel_1.default);
