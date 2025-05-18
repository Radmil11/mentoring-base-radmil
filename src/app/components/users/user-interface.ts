export interface IUser {
    companyName: string;
    id: number;
    name: string;
    username?: string;
    email: string;
    adress?: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchphrase?: string;
      bs?: string;
    };
  }

  export interface ICreateUser {
    phone: string;
    id: number;
    name: string;
    email: string;
    website: string;
    companyName: string;
  }

  export interface User {
    phone: string;
    id: number;
    name: string;
    email: string;
    website: string;
    company: {
      name: string;
    }
  }

