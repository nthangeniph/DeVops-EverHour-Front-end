import { createContext } from "react";
import { IFlagsState } from "../../interfaces/flagsState";
import { IAccount, IAccountOut, IActiveUserInfo } from "../../models/account.model";
import { IRoleOut } from "../../models/role.model";
import { IUser } from "../../models/user.model";


export type IFlagProgressFlags =
  | 'signUpUSer'
  | 'loginUSer'
  | 'logoutUSer'
 /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags =
  | 'signUpUSer'
  | 'loginUSer'
  | 'logoutUSer'
 /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags =
  | 'signUpUSer'
  | 'loginUSer'
  | 'logoutUSer'
   /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags =
  | 'signUpUSer'
  | 'loginUSer'
  | 'logoutUSer'
 /* NEW_ACTIONED_FLAG_GOES_HERE */;
export interface ISignUp extends IAccount,IUser {}
export interface ILogin{
    _id?: String;
    username?: String;
    email?: String;
    password?: String;
    roles?: Array<IRoleOut>;
    xApiKey?: String;
    devOpsDisplayName?: String;
    pat?: String;
    devOpsUsername?: String;
}
export interface ILoginOut extends ILogin{
  accessToken?: string;
}
export interface IAuthStateContext
extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  readonly accountDetails?:IAccountOut;
  readonly activeUserInfo?:IActiveUserInfo;
  readonly errorMessage?:string;

}

export interface IAuthActionsContext
extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  signUpUser?:(payload:ISignUp)=>void;
  loginUser?:(payload:ILogin)=>void;
  logoutUser?:() => void;
  checkAuth?:(payload:IActiveUserInfo) => void;
}

export const AuthStateContext = createContext<IAuthStateContext>({});

export const AuthActionsContext = createContext<IAuthActionsContext | undefined>(undefined);