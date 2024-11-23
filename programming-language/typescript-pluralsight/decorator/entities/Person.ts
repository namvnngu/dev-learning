import BaseEntity from './BaseEntity';
import { required, length, isEmail, isInteger, isPhone, entity, persist, id } from '../decorators'

@entity("people")
export default class Person extends BaseEntity {
  @id
  id: string;

  @persist
  @required
  @length(3, 100)
  firstName: string;

  @persist
  @required
  @length(3, 100)
  lastName: string;

  @persist
  @required
  @isEmail
  email: string;

  @persist
  department: string;

  @persist
  @required
  @isPhone
  mobileNumber: string;

  @persist
  @required
  @isInteger(1, 120)
  age: number;

}
