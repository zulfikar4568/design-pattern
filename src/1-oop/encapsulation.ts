const userApp: string = 'zulfikar'
const passwordApp: string = 'password_real123'

class Configurator {
  private _username: string;
  private _password: string;

  constructor(username: string, passwordHash: string) {
    this._username = username
    this._password = Decrytor.decrypSomeString(passwordHash)
  }

  // Setter
  set passwordHash(pass: string) {
    this._password = Decrytor.decrypSomeString(pass)
  }

  // Getter
  get username(): string {
    return this._username
  }


  // Setter
  set username(user: string) {
    this._username = user;
  }

  connect(): string {
    if (this._password === passwordApp && this._username === userApp) return "Connected !"
    else return "Disconnected!";
  }
}

// Class Decryptor
class Decrytor {
  static decrypSomeString(val: string): string {
    if (val === "asjdh123oiuh3umbc3gy2392") return "password_real123";
    else return "oiasdbwubdspowe0231hy491"
  }
}

const config: Configurator = new Configurator("zulfikar", "asjdh123oiuh3umbc3gy2392");
console.log(config.connect())