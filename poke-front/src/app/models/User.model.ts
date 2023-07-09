
export interface UserProps {
    _id ?: string
    login : string
    password : string
}

export class User implements UserProps {
    _id ?: string
    login : string
    password : string

    constructor(user: UserProps){
        this.login = user.login;
        this.password = user.password;
    }
}