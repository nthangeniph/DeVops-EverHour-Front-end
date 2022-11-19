import { LOGIN_URL } from "../routes";
import jwt from 'jsonwebtoken';
import { ILogin } from "../providers/auth/contexts";
import { ACCESS_TOKEN_NAME } from "../app-constants";
import dotenv from 'dotenv';
import jwt_decode from "jwt-decode";
import { IActiveUserInfo } from "../models/account.model";



dotenv.config();

const config=process.env.SECRET_KEY;
// Fields to remove from the AuthContext
interface IAccessToken extends ILogin {
  encryptedAccessToken?: string | null;
  expireInSeconds?: number;
  expireOn?: string;
}

export interface IDecodedToken {
  readonly id?: string;
  readonly username?: string;
  readonly pat?: string;
  readonly devOpsDisplayName?: string;
  readonly devOpsUsername?: string;
  readonly xApiKey?: string;
  readonly roles?: Array<any>;
  readonly exp?: number;
}




export const saveUserToken = (
  token: string,
  removeCreditials: boolean = true
) => {
  try {
    if (removeCreditials) {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_NAME, token);
    
    }
  } catch (error) {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }
};


export const getToken = () => {
  try {
    if (typeof window == "object") {
      const token =localStorage.getItem(ACCESS_TOKEN_NAME);
      if (!!token) {
        var decoded = jwt_decode(token) as IDecodedToken;

        const isTokenValid =
          Math.floor(new Date().getTime() / 1000) <= decoded?.exp;

        if (isTokenValid) {
          const { id, roles, username } = decoded;
          const accDetails: IActiveUserInfo = {
            ...decoded,
            user: {
              _id: id,
              username,
              roles,
            },
            accessToken: token,
          };
          return accDetails;
        } else {
          localStorage.removeItem(ACCESS_TOKEN_NAME);
          return null;
        }
      }
    }
  } catch (error) {
    console.log("decoded token001 error: ", error);
    return null;
  }

  return null;
};

export const removeAccessToken = () => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      window.location.href = LOGIN_URL;
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const refreshAccessToken = () => {
  const tokenObj = getToken();

  if(!!tokenObj){
    const {devOpsDisplayName,devOpsUsername,pat,user:{ _id,email,roles,username},xApiKey}=tokenObj;

    console.log("jbjbj",config)
   
    var token = jwt.sign({
      id:_id,
      username,
      email,
      pat,
      devOpsDisplayName,
      devOpsUsername,
      xApiKey,
      roles,
    }, config, {
      expiresIn: 72000,
    });


    saveUserToken(token);
  }

};

// if (window.performance) {
//   console.info('window.performance works fine on this browser');
// }
// const entries =window.performance.getEntriesByType('reload');

export const hasTokenExpired = (date: string): boolean => {
  return new Date(date) < new Date();
};

/**
 * Check if the password is valid and strong.
 *  A strong password must
 *    - contain at least 1 lowercase alphabetical character
 *    - contain at least 1 uppercase alphabetical character
 *    - contain at least 1 numeric character
 *    - contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
 *    - be eight characters or longer
 * @param password - the password to validate
 */
export const isStrongPassword = (password: string) => {
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  return passwordRegex.test(password);
};

/**
 *
 * @param password
 */

export const isSamePassword = (
  initialPassword: string,
  confirmPassword: string
) => {
  if (initialPassword) {
    if (isStrongPassword(initialPassword)) {
      if (initialPassword === confirmPassword) {
        return true;
      }
    }
  }

  return false;
};
// App Local Storage
