"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const kebabcase_1 = __importDefault(require("lodash/kebabcase"));
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title required'],
        trim: true
    },
    body: {
        type: String,
        required: [true, 'Body required'],
        trim: true
    },
    slug: String,
    publishedAt: {
        type: Date,
        default: new Date()
    }
});
postSchema.pre('save', function (next) {
    this.slug = (0, kebabcase_1.default)(this.title + this.publishedAt.getUTCMilliseconds());
    next();
});
const Post = (0, mongoose_1.model)('Post', postSchema);
exports.default = Post;
