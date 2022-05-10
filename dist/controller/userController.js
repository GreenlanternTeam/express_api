"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.postSignup = exports.postLogin = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany({});
    return res.json({ success: true, users });
});
exports.getUsers = getUsers;
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { userId, password } } = req;
    const user = yield prisma_1.default.user.findUnique({ where: { userId } });
    if (!user) {
        return res.status(400).json({ success: false, message: '아이디가 존재하지 않습니다.' });
    }
    const ok = yield bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).json({ success: false, message: '비밀번호가 일치하지 않습니다. ' });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.status(200).json({ success: true, user });
});
exports.postLogin = postLogin;
const postSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { userId, email, password } } = req;
    try {
        const existEmail = yield prisma_1.default.user.findUnique({ where: { email }, rejectOnNotFound: false });
        const existUserId = yield prisma_1.default.user.findFirst({ where: { userId }, rejectOnNotFound: false });
        if (existEmail) {
            return res.status(500).json({ success: false, message: '존재하는 이메일 입니다.' });
        }
        if (existUserId) {
            return res.status(500).json({ success: false, message: '존재하는 아이디 입니다.' });
        }
        const hashedPassword = yield bcrypt.hash(password, +process.env.SALT);
        const query = { userId, email, password: hashedPassword };
        const user = yield prisma_1.default.user.create({ data: Object.assign({}, query) });
        return res.json({ success: true, user });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: '알수없는 오류.' });
    }
});
exports.postSignup = postSignup;
