import { ContactType, Status } from "../enums/guest.enum";

export interface IGuest {
  contactType: ContactType,
  contact: string,
  name: string,
  cname: string,
  school: string,
  cos?: string,
}

export interface IGuestUpdate {
  status?: Status,
  contactType?: ContactType,
  contact?: string,
  name?: string,
  cname?: string,
  school?: string,
  cos?: string,
}

export interface Guest extends IGuest {
  id: number,
  status: Status,
}
