import {Result} from '../model/common.model'

export interface AuthUser{
    email: string;
    password: string;
}
export interface AuthUserResponse{
    userId: number;
    userNick: string;
    token: string;
    result: Result;
}
