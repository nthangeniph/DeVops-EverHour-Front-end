import { createContext } from "react";
import { IFlagsState } from "../../interfaces/flagsState";
import { IAccount, IAccountOut, IActiveUserInfo } from "../../models/account.model";
import { IRoleOut } from "../../models/role.model";
import { IUser } from "../../models/user.model";


export type IFlagProgressFlags =
  | 'signUpUser'
  | 'loginUser'
  | 'logoutUser'
 /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags =
  | 'signUpUser'
  | 'loginUser'
  | 'logoutUser'
 /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags =
  | 'signUpUser'
  | 'loginUser'
  | 'logoutUser'
   /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags =
  | 'signUpUser'
  | 'loginUser'
  | 'logoutUser'
 /* NEW_ACTIONED_FLAG_GOES_HERE */;
export interface ISignUp extends IAccount, IUser { }
export interface ILogin {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  roles?: Array<IRoleOut>;
  xApiKey?: string;
  devOpsDisplayName?: string;
  pat?: string;
  devOpsUsername?: string;
}
export interface ILoginOut extends ILogin {
  accessToken?: string;
}
export interface IAuthStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  readonly accountDetails?: IAccountOut;
  readonly activeUserInfo?: IActiveUserInfo;
  readonly errorMessage?: string;

}

export interface IAuthActionsContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  signUpUser?: (payload: ISignUp) => void;
  loginUser?: (payload: ILogin) => void;
  logoutUser?: () => void;
  checkAuth?: (payload: IActiveUserInfo) => void;
}

export const AuthStateContext = createContext<IAuthStateContext>({});

export const AuthActionsContext = createContext<IAuthActionsContext | undefined>(undefined);