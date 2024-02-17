import { SESSION_STATUS } from "../constants/Global";
export interface ISession {
	session: { email: string } | null;
	status: SESSION_STATUS;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ISignupRequest {
	name: string;
	email: string;
	password: string;
}

export interface ICreateStationRequest {
	station_id: string;
	station_name: string;
	longitude: number;
	latitude: number;
}
