import * as dotenv from "dotenv";

dotenv.config();


export const BASEURL = "https://vecinoo.herokuapp.com";//"http://localhost:4000";
export const APIVERSION ="/v1/api";// process.env.APIVERSION;
export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const APPLICATION_NAME = process.env.APPLICATION_NAME;
