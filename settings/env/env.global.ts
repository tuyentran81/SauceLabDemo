import dotenv from "dotenv";

dotenv.config({
    path: process.env.ENV ? `settings/env/env.${process.env.ENV}` : "settings/env/env.local",
});

export default class Env {
    static get BASE_URL(): string {
        return process.env.BASE_URL || "";
    }

    static get USERNAME(): string {
        return process.env.USER_NAME || "";
    }

    static get PASSWORD(): string {
        return process.env.PASSWORD || "";
    }
};