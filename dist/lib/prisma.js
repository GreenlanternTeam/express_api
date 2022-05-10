"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new client_1.PrismaClient({
        rejectOnNotFound: true
    });
}
else {
    if (!global.prisma) {
        ;
        global.prisma = new client_1.PrismaClient({
            rejectOnNotFound: true
        });
    }
    prisma = global.prisma;
}
exports.default = prisma;
