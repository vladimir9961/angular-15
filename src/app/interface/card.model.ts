export interface Genres {
    name: string,
    id: number
}
export interface Icard {
    title?: string,
    id?: number,
    img?: any,
    year?: number,
    vote?: number
}
export interface Ifilters {
    sort_by?: string,
    genres?: string,
    date_from?: string,
    date_to?: string,
    user_score?: number,
    user_vote?: number,
    runtime?: number
}
export interface Movie {
    name: string;
    img: any;
    id: string;
}