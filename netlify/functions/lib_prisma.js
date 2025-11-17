// Prisma client helper for serverless
const { PrismaClient } = require('@prisma/client');
let prisma;
if (!globalThis.prisma) { globalThis.prisma = new PrismaClient(); }
prisma = globalThis.prisma;
module.exports = prisma;
