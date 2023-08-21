import {IConnectionBehavior, IRequestHeaders} from "./types";

class ConnectionService implements IConnectionBehavior {
    private _connectionBehavior?: IConnectionBehavior;

    init(connectionBehavior: IConnectionBehavior) {
        this._connectionBehavior = connectionBehavior;
    }

    get<T = any>(url: string, headers?: IRequestHeaders): Promise<T> {
        return this._connectionBehavior!.get(url, headers);
    }

    post<T = any>(url: string, data: any, headers?: IRequestHeaders): Promise<T> {
        return this._connectionBehavior!.post(url, data, headers);
    }

}

export const connectionService = new ConnectionService();

