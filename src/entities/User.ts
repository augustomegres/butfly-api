import { Email } from "./Email";
import { Name } from "./Name";
import { Password } from "./Password";

export class User {
  uid: string;
  name: string;
  email: string;
  password: string;
  updatedAt?: Date;
  createdAt?: Date;

  constructor({
    uid,
    name,
    email,
    password,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: User) {
    const { value: nameValue } = new Name(name);
    const { value: emailValue } = new Email(email);
    const { value: passwordValue } = new Password(password);
    this.uid = uid;
    this.name = nameValue;
    this.email = emailValue;
    this.password = passwordValue;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
