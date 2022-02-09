import axios from "axios";

export default axios.create({
  baseURL: "https://akademija.teltonika.lt/countries_api/api",
  headers: {
    "Content-type": "application/json"
  }
});
