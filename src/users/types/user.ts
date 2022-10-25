export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: number ;
  birthDate: string ;
  address : string;
  phone : string;
  role: string;
  enable? : number;
}
