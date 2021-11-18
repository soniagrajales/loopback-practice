import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Keys} from '../config/keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
const generator = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository

  ) { }

  /*
   * Add service methods here
   */

  GeneratePassword() {
    let password = generator(8, false)
    //console.log("Password generated " + password);
    return password;
  }

  EncryptPassword(password: string) {
    let encryptedPassword = cryptoJS.MD5(password).toString();
    return encryptedPassword;
  }

  IdentifyUser(user: string, password: string) {
    try {
      let u = this.userRepository.findOne({where: {email: user, password: password}});
      if (u) {
        return u;
      }
      return false;
    } catch {
      return false;
    }
  }

  // generate token
  GenerateTokenJWT(user: User) {
    let token = jwt.sign({
      data: {
        id: user.id,
        email: user.email,
        name: user.name + " " + user.last_name
      }
    },
      Keys.keyJWT);
    return token;
  }

  ValidateTokenJWT(token: string) {
    try {
      let data = jwt.verify(token, Keys.keyJWT);
      return data;
    } catch {
      return false;
    }
  }

}
