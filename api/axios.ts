import axios from "axios";

// let db_url = (process.env.ENVIRONMENT === "development") ? process.env.DEV_URL : process.env.PROD_URL;
let db_url = process.env.NEXT_PUBLIC_API_URL;

// console.log("db_url", db_url);
export default axios.create({
  baseURL: db_url,
})