import { LOCAL_STORAGE_KEYS } from "../constants/Global";

export const getAuthToken = (): string => {
	return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN) ?? "";
};

export const getAuthName = (): string => {
	return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_NAME) ?? "";
};

export const getAuthEmail = (): string => {
	return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_EMAIL) ?? "";
};

export const setToStorage = (key: LOCAL_STORAGE_KEYS, token: string): void => {
	localStorage.setItem(key, token);
};

export const getFromStorage = (key: LOCAL_STORAGE_KEYS): string => {
	return localStorage.getItem(key) ?? "";
};

export const clearStorage = (key: LOCAL_STORAGE_KEYS): void => {
	localStorage.removeItem(key);
};
