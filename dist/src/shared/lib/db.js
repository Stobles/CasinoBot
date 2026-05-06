import { PrismaClient } from "@generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { variables } from "../config/variables.js";
import { Pool } from "pg";
const connectionString = variables.DATABASE_URL;
export const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
//# sourceMappingURL=db.js.map