"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./../controller/userController");
const express_1 = __importDefault(require("express"));
const userController_2 = require("../controller/userController");
const router = express_1.default.Router();
router.get('/', userController_2.getUsers);
router.post('/signup', userController_2.postSignup);
router.post('/login', userController_1.postLogin);
exports.default = router;
