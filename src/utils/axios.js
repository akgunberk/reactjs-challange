import axios from "axios";
import config from "../config";

// To prevent CORS issues
// I serve the access token from an endpoint
// a small node express application deployed on heroku
class _API {
  #instance;
  constructor() {
    this.responsePromise = axios.get(
      "https://shrouded-bastion-93009.herokuapp.com/token"
    );
  }

  async getInstance() {
    if (this.instance === undefined) {
      const { data } = await this.responsePromise;

      this.#instance = axios.create({
        baseURL: config.api.baseUrl,
        timeout: 5000,
        headers: { Authorization: `Bearer ${data.access_token}` },
      });

      this.#instance.interceptors.response.use(
        function (response) {
          return response.data;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
    }
    return this.#instance;
  }
}

const API = new _API();

export default API;
