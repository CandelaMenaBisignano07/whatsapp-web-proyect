import dotenv from "dotenv"

dotenv.config()

export const configs = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
}
