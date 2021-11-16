import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generator = require('password-generator');
const cryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  GeneratePassword() {
    let password = generator(8, false)
    return password;
  }

  EncryptPassword(password: string) {
    let encryptedPassword = cryptoJS.MD5(password).toString();
    return encryptedPassword;
  }
}
