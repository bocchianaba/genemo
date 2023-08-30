export interface UserPaginate {
    users: User[];
    pagination: Pagination;
  }
  
  export interface Pagination {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    roles: Role[];
    idTownAuthorise: Town[];
    accessToken: string;
  }
  
  export interface Role {
    id?: string;
    _id: string;
    name: string;
  }
  
  export interface Town {
    id?: any;
    _id?: string;
    name?: string;
  }
  export interface Roles {
    data: Datum[];
    pagination: Pagination;
  }
  export interface Cities {
    data: Datum[];
    pagination: Pagination;
  }
  
  export interface Datum {
    id: string;
    name: string;
  }