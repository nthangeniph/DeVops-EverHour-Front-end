import { IRoleOut } from './role.model';

export interface IUser {
  username?: string;
  email?: string;
  password?: string;
  roles?: Array<string>;
}
export interface IUserOut {
  id?:string;
  username?: string;
  email?: string;
  password?: string;
  roles?: Array<IRoleOut>;
}
