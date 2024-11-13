import brcypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

export class Encrypt {
    static async encryptPassword(password: string) {
        return brcypt.hashSync(password, 10);
    }

    static comparePassword(hashPassword: string, password: string) {
        return brcypt.compareSync(password, hashPassword)
    }

    static generateToken(payload: {
        id: number
    }) {
        return jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: "2d" });
    }
    
}