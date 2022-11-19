import { IRoleOut } from './role.model';

export interface IUser {
  username?: String;
  email?: String;
  password?: String;
  roles?: Array<string>;
}
export interface IUserOut {
  _id?: String;
  username?: String;
  email?: String;
  password?: String;
  roles?: Array<IRoleOut>;
}
