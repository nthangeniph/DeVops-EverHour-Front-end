import { IUser, IUserOut } from "./user.model";

export interface IAccount {
    xApiKey?: string;
    devOpsDisplayName?: string;
    pat?: string;
    devOpsUsername?: string;
    userId?:string
  }
  export interface IAccountOut {
    xApiKey?: string;
    devOpsDisplayName?: string;
    pat?: string;
    devOpsUsername?: string;
    user: IUser;
  }
  export interface IActiveUserInfo{
     user?:IUserOut;
     xApiKey?: string;
    devOpsDisplayName?: string;
    pat?: string;
    devOpsUsername?: string;
    accessToken?: string;
  }