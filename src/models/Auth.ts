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

export interface IReportRequest {
	nid: string;
	location: string;
	productName: string;
	price: string;
	message: string;
}

export interface IGovtPanelRequest {
	productName: string;
	setPrice: string;
	marketPrice: string;
}
