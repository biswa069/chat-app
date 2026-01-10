import express from "express";
import dotenv from "dotenv";
import { startSendeOtpConsumer } from "./consumer.js";
dotenv.config();
startSendeOtpConsumer();
const app = express();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map