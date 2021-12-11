"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const depostiSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        requied: [true, 'Deposit must belong to a member']
    },
    amount: {
        type: Number,
        required: [true, 'Deposit amount required'],
        min: 1,
        max: 10000
    },
    depositedAt: {
        type: Date,
        default: new Date()
    },
    forMonth: {
        type: Date,
        requied: [true, 'Deposit for a specific month is required']
    },
    issuedBy: { type: String, required: [true, 'Deposit must done by a issuer'] }
});
const Deposit = (0, mongoose_1.model)('Deposit', depostiSchema);
exports.default = Deposit;
