"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./controller/errorController"));
require("./config/firebaseAdmin");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const depositRoutes_1 = __importDefault(require("./routes/depositRoutes"));
const app = (0, express_1.default)();
// app.use('trust proxy');
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 1000,
    message: 'To many requests in a minute'
});
app.use('/api', limiter);
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
//Data sanitize
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, xss_clean_1.default)());
app.get('/', (req, res) => {
    res.send('Welcome to blog app');
});
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/deposits', depositRoutes_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server.`, 404));
});
app.use(errorController_1.default);
exports.default = app;
