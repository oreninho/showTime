import axios, {AxiosRequestConfig} from "axios";
import {IConnectionBehavior, IRequestHeaders} from "./types";

export class ConnectionBehaviorAxios implements IConnectionBehavior {

    constructor() {
    }

    private getRequestConfig(headers?:IRequestHeaders): AxiosRequestConfig {
        const options: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...headers
            }
        }
        return options;
    }
    async get<T = any>(url: string, headers?:IRequestHeaders): Promise<T> { //todo: define headers type
        return this.fetchJson<T>(url, "GET", this.getRequestConfig(headers));
    }

    async post<T = any>(url: string, data: any, headers?:IRequestHeaders): Promise<T> {
        return this.fetchJson<T>(url, "POST", {...this.getRequestConfig(headers), data});
    }

    private async fetchJson<T = any>(
        url: string,
        method: "GET" | "POST",
        options?: AxiosRequestConfig
    ): Promise<T> {
        const headers = options?.headers;

        try {
            const response = await axios({
                url,
                method,
                headers,
                ...options,
            });
            return response.data as T;
        } catch (error) {
            throw new Error("An error occurred");
        }
    }
}
