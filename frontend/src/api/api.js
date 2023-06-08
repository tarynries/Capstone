import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class EvolutionApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${EvolutionApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get the current user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }


    // /** Get recipes (filtered by title if not undefined) */

    static async getRecipes(title) {
        try {
            const response = await this.request("/recipes", { title });
            return response.data.recipes;
        } catch (error) {
            console.error("Error fetching recipes:", error);
            throw error;
        }
    }


    // /** Get companies (filtered by name if not undefined) */

    // static async getCompanies(name) {
    //   let res = await this.request("companies", { name });
    //   return res.companies;
    // }

    // /** Get details on a company by handle. */

    // static async getCompany(handle) {
    //   let res = await this.request(`companies/${handle}`);
    //   return res.company;
    // }

    // /** Get list of jobs (filtered by title if not undefined) */

    // static async getRecipes(title) {
    //   let res = await this.request("recipes", { title });
    //   return res.recipes;
    // }


    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Signup for site. */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res;
    }

}


export default EvolutionApi;
