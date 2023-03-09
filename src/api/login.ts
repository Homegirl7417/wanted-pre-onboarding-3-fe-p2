import { BASE_URL } from './const';
import { getAccessTokenFromLocalStorage, saveAccessTokenToLocalStorage } from '../utils/accessTokenHandler';
import { UserInfo } from '../types/user';

type LoginResult = 'success' | 'fail';

export type LoginResultWithToken =
  | {
      result: 'success';
      access_token: string;
    }
  | {
      result: 'fail';
      access_token: null;
    };

export interface LoginRequest {
  username: string;
  password: string;
}

/*********
 *  실습 2-1
 * */

export const loginWithToken = async (args: LoginRequest): Promise<LoginResultWithToken> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    }).then((response) => response.json());
    if (response) {
      return {
        result: 'success',
        access_token: response.access_token,
      };
    } else {
      return {
        result: 'fail',
        access_token: null,
      };
    }
  } catch (e) {
    return {
      result: 'fail',
      access_token: null,
    };
  }
};

export const getCurrentUserInfoWithToken = async (token: string): Promise<UserInfo | null> => {
  try {
    const response = await fetch(`${BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
    return response.userInfo;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/*********
 *  실습 2-2
 * */

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    }).then((response) => response.json());
    if (response) {
      saveAccessTokenToLocalStorage(response.access_token);
      return 'success';
    } else {
      return 'fail';
    }
  } catch (e) {
    return 'fail';
  }
};

export const getCurrentUserInfo = async (): Promise<UserInfo | null> => {
  const accessToken = getAccessTokenFromLocalStorage();
  try {
    const response = await fetch(`${BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json());
    return response.userInfo;
  } catch (e) {
    console.error(e);
    return null;
  }
};
