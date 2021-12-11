"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    department: {
        type: String
    },
    session: {
        type: String
    },
    district: {
        type: String
    },
    isMessMember: {
        type: Boolean,
        default: true
    },
    uid: {
        type: String,
        required: true
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
