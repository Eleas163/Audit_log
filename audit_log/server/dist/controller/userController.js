"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRoles = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth_1 = require("firebase-admin/auth");
const validator_1 = __importDefault(require("validator"));
const userModel_1 = __importDefault(require("../model/userModel"));
const validateUser = (info, isUpdating = false) => {
    const { email, phoneNumber } = info;
    let errorMessage = '';
    //Requirement
    if (!isUpdating) {
        if (!email)
            errorMessage = 'Email address required';
        if (!phoneNumber)
            errorMessage = 'Phone number required';
    }
    // validator
    if (email && !validator_1.default.isEmail(email))
        errorMessage = 'Please Provide a valid email address';
    if (phoneNumber && !validator_1.default.isMobilePhone(phoneNumber, 'bn-BD'))
        errorMessage = 'Please provide a valid mobile phone number';
    // correction
    if (phoneNumber && !phoneNumber.startsWith('+880'))
        info.phoneNumber = `+8801${phoneNumber.slice(-9)}`;
    return { userInfo: info, errorMessage };
};
exports.getAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (yield (0, auth_1.getAuth)().listUsers()).users;
    // const usersExt = await User.find();
    // let finalList: Array<any> = [...users];
    // users.forEach(user => {
    //   for (const userExt of usersExt) {
    //     if (userExt.uid === user.uid) {
    //       const indexOfUser = finalList.findIndex(el => el!.uid === user.uid);
    //       finalList.splice(indexOfUser, 1);
    //       finalList.push({ ...user, ...userExt });
    //     }
    //   }
    // });
    res.status(200).json({
        status: 'success',
        result: users.length,
        data: { data: users }
    });
}));
exports.getUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    const user = yield (0, auth_1.getAuth)().getUser(uid);
    let userExt;
    if (user.uid)
        userExt = yield userModel_1.default.findOne({ uid: user.uid });
    res.status(200).json({
        status: 'success',
        data: { data: user, additionalData: userExt }
    });
}));
exports.createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, emailVerified, phoneNumber, password, displayName, photoURL, disabled, department, session, district, isMessMember } = req.body;
    const userData = {
        email,
        emailVerified,
        phoneNumber,
        password,
        displayName,
        photoURL,
        disabled
    };
    const { userInfo, errorMessage } = validateUser(userData);
    if (errorMessage)
        return next(new appError_1.default(errorMessage, 400));
    const firebaseUser = yield (0, auth_1.getAuth)().createUser(userInfo);
    let userExt;
    if (firebaseUser.uid) {
        const additionalData = {
            department,
            session,
            district,
            isMessMember,
            uid: firebaseUser.uid
        };
        userExt = yield userModel_1.default.create(additionalData);
    }
    res.status(201).json({
        status: 'success',
        data: { data: firebaseUser, additionalData: userExt }
    });
}));
exports.updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userInfo, errorMessage } = validateUser(req.body, true);
    if (errorMessage)
        return next(new appError_1.default(errorMessage, 400));
    const updatedUser = yield (0, auth_1.getAuth)().updateUser(req.params.uid, userInfo);
    let userExtUpdated;
    if (updatedUser) {
        userExtUpdated = yield userModel_1.default.findOneAndUpdate({ uid: updatedUser.uid }, userInfo);
    }
    res.status(200).json({
        status: 'success',
        data: { data: updatedUser, additionalData: userExtUpdated }
    });
}));
exports.deleteUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_1.getAuth)().deleteUser(req.params.uid);
    const userExt = yield userModel_1.default.findOneAndDelete({ uid: req.params.uid });
    res
        .status(204)
        .json({
        status: 'success',
        data: { data: user, additionalData: userExt }
    });
}));
exports.setUserRoles = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRole = yield (0, auth_1.getAuth)().setCustomUserClaims(req.params.uid, {
        role: req.body.role
    });
    res.status(200).json({ status: 'success', data: { data: updatedRole } });
}));
