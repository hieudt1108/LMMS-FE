export interface User {
  id: string;
  username: string;
  password : string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: number ;
  birthDate: string ;
  address : string;
  phone : string;
  isTeacher: number;
  roleID: number;
  enable : number;
}
