export interface IConnectionBehavior {
    get<T = any>(url: string,headers?:IRequestHeaders): Promise<T>;
    post<T = any>(url: string, data: any,headers?:IRequestHeaders): Promise<T>;
}

export interface IRequestHeaders {
    [key: string]: string;
}
