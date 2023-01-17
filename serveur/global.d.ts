declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_USER: string;
            DB_PASS: string,
            DB_NAME: string,
            ACCESS_SESSION_SECRET: string,
            PORT: string;
            MONGO_URI: string;
        }
    }
}
export { }