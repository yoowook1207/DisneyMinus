
export class AppUserRegister {
    username: string = '';
    pwd: string = '';
    email: string = '';
    role: string = '';
    tmdb_key: string = '';
  }
  export interface UserInfo {
    email?: string;
    pwd?: string;
  
    username?: string;
    tmdb_key?: string;
  }