import { SessionProps } from "./Session.model";

export interface UserProps {
    _id ?: string
    login : string
    password : string
    subscription: string;
    student: boolean;
    session?: SessionProps[] | string[]
}

export class User implements UserProps {
    _id ?: string
    login : string
    password : string
    subscription: string;
    student: boolean;
    session?: SessionProps[] | string[]

    constructor(user: UserProps){
        this.login = user.login;
        this.password = user.password;
        this.student = user.student;
        this.subscription = user.subscription;
        this.session = user.session;
    }
}