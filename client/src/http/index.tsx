import axios from "axios";
import { REACT_APP_API_URL } from "../consts";

const $host = axios.create({
  baseURL: REACT_APP_API_URL
})

export {
  $host
}