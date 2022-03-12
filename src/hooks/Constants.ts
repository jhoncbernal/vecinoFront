import english from "../utils/translations/en.json";
import spanish from "../utils/translations/span.json";
const userLanguage: string = window.navigator.language || "en-CA";
export const constants: any=userLanguage.includes("en")?english:spanish;
