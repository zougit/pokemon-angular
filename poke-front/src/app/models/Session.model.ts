import { UserProps } from "./User.model";

export interface SessionProps {
    token: string;
    user: string | UserProps;
    platform: string;
    expiration?: Date;
}

export class Session implements SessionProps {
    token: string;
    user: string | UserProps;
    platform: string;
    expiration?: Date;

    constructor(session: SessionProps){
        this.token = session.token;
        this.user = session.user;
        this.platform = session.platform;
        this.expiration = session.expiration;
    }
}