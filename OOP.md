# OOP
Object Oriented Programming (OOP) adalah paradigma dasar pada konsep membungkus sekumpulan state dan behavior pada suatu data kedalam spesial bundles yang dipanggil **objects**. Yang mana di konstruksi dari set **Blueprints** yang di definisikan oleh `Programmers` di sebut dengan **Class**


# Pilar OOP
OOP mempunyai 4 pilar yaitu:
- Abstraction
- Encapsulation
- Inheritance
- Polymorpishm

## Abstraction
- Abstraction hanya menampilkan attribute yang relavant dari sebuah object dan sembunyikan attribute yang tidak relavant
- Abstraction mengurangi efforts programming dan dengan demikian ke kompleks-an nya, Sehingga End User menggunakan aplikasi hanya sesuai dengan yang dibutuhkan saja, tidak perlu concern ke semua hal.
- Abstraction deals dengan idea, yakni kita sembunyikan details nya dan expose hanya secara fungsional nya saja, jadi User cukup akan tau "What it does" bukan "How it does"

Misalkan kita punya data dari API pesawat seperti ini

```ts
// Tipe data Rest API
interface IPesawatAPI { 
  speed: number, 
  altitude: number, 
  rollAngle: number, 
  pitchAngle: number, 
  yawAngle: number, 
  seats: number, 
  warna: string, 
  ukuran: number 
}

// Data dari Rest API misalkan
const jsonAPI: IPesawatAPI = {
  speed: 1, 
  altitude: 20, 
  rollAngle: 180, 
  pitchAngle: 90, 
  yawAngle: 270, 
  seats: 90, 
  warna: 'red', 
  ukuran: 30 
}
```

Lalu kita mempunyai class Pesawat untuk menampung data API tersebut:
```ts
class Pesawat {
  warna: string;
  ukuran: number;
  speed: number;
  altitude: number;
  rollAngle: number;
  pitchAngle: number;
  yawAngle: number;
  seats: number;
  
  constructor(data: IPesawatAPI) {
    this.warna = data.warna;
    this.ukuran = data.ukuran;
    this.speed = data.speed;
    this.altitude = data.altitude;
    this.rollAngle = data.rollAngle;
    this.pitchAngle = data.pitchAngle;
    this.yawAngle = data.yawAngle;
    this.seats = data.seats;
  }

  fly(): void {
    console.log(`Aku terbang!, dengan speed: ${this.speed}, altitude: ${this.altitude}, rollAngle: ${this.rollAngle}, pitchAngle: ${this.pitchAngle}, yawAngle: ${this.yawAngle}`)
  }

  calculatingSeats(seats: number, consume: number): number {
    return seats - consume;
  }

  reverseSeats(n: number): void {
    console.log(`Anda memesan kursi sebanyak ${n} dan sisa kursi sebanyak ${this.calculatingSeats(this.seats, n)}`)
  }
}
```

Lalu kita bisa instantiate class tersebut menjadi object, oke seperti ini tidak ada masalah ya kan?
```ts
const boeing: Pesawat = new Pesawat(jsonAPI);
console.log(boeing.seats)
console.log(boeing.speed)
boeing.fly()
boeing.reverseSeats(10)
```

Sekarang andai kata kita mempunyai dua buah Aplikasi Booking Pesawat dan Aplikasi Simulator Pesawat.
1. Aplikasi Booking Pesawat tidak butuh data teknik seperti speed, altitude, rollPitch, pitchAngle, yawAngle. dan tidak butuh behaviour atau method reverseSeats
2. Aplikasi Simulator Pesawat tidak butuh data seperti seats. dan tidak butuh behaviour atau method fly.

Jika kita implementasi langsung Pesawat maka kita akan bisa mengakses semua method dan state nya, bagaimana cara kita mengambil yang di perlukan saja?
Kita bisa gunakan interface seperti berikut:

```ts
interface IPesawatSimulatorApp {
  speed: number;
  altitude: number;
  rollAngle: number;
  pitchAngle: number;
  yawAngle: number;

  fly(): void;
}

interface IPesawatBookingApp {
  seats: number;

  reverseSeats(n: number): void;
}

const boeingSimulator: IPesawatSimulatorApp = new Pesawat(jsonAPI);
const boeingReverse: IPesawatBookingApp = new Pesawat(jsonAPI);

boeingSimulator.fly()
// boeingSimulator.seats // Simulator tidak akan mempunyai seats

// Contoh dibawah Kita bisa dapatkan sisa kursi tanpa mengetahui proses perhitungannya seperti apa
boeingReverse.reverseSeats(10)
```

Dengan demikian aplikasi simulator tidak akan mempunyai seats, dan sebaliknya aplikasi booking.

## Encapsulation
Encapsulation adalah proses pembungkusan code dan data secara bersama menjadi kesatuan unit, seperti sebuah kapsul tablet yang isinya bisa banyak beberapa bahan obat. Terkadang konsep ini juga digunakan untuk menyembunyikan informasi atau state sebuah object dari luar, yang biasa di panggil **Information Hidding**

Berikut contoh, bayangkan jika kita mempunyai class Configurator yang berfungsi untuk mengkoneksikan ke sebuah Sistem. Di class ini kita harus set username dan password, tetapi kita ingin password kita aman, maka contoh sederhana kita pakai sebuah Decryptor. Decryptor ini akan mengubah sandi rahasia ke dalam real password.

Andaikata kita punya sistem dengan user dan pass seperti ini
```ts
const userApp: string = 'zulfikar'
const passwordApp: string = 'password_real123'
```

Lalu kita ingin konekan sistem tersebut dengan aman menggunakan class Configurator, yang mana password nya tidak boleh bocor
```ts
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
```

Disini kita ingin password nya bocor, maka state profile tidak akan sampai bocor karena dia private. object `config` hanya bisa set dan get username dan password hanya bisa di set, tidak bisa di get dengan begitu password kita akan tetap aman.

## Inheritance

Inheritance adalah kemampuan untuk membuat class baru di atas class yang sudah ada, Tujuan inheritance adalah code dapat di reuse (digunakan kembali). Jika kita ingin membuat class yang sama state dan behaviour nya dengan sedikit tambahan, maka kita tidak perlu membuatnya dari nol, kita bisa buat dari class yang sudah ada dan kita menambahkan state dan behaviour nya (baru) atau bahkan kita bisa me replace yang sudah ada.

Konsekuensi menggunakan inheritance adalah subclass akan mempunyai state dan behaviour yang sama. Kita tidak bisa menghilangkan state dan behavior yang ada subclass yang berasal dari parent classnya.

Subclass hanya bisa 1 mempunyai parent class, sedangkan class dapat mengimplementasi banyak interface.

```ts
class Hewan {
  public kaki: number;
  public nama: string;
  private rahasia: string = 'rahasia';
  protected category: string = 'Hewan';
  constructor(kaki: number, nama: string) {
    this.kaki = kaki;
    this.nama = nama;
  }
  suara() {}
 }


// Kucing "is a" Hewan
// Hewan mewariskan ke Kucing
class Kucing extends Hewan {
  // Private tidak akan diturunkan ke subclass
  // private rahasia: string = 'rahasia'; // TS[2415] Error

  // Protected akan di turunkan ke subclass nya, tetapi protected tidak akan bisa di akses dari luar
  protected category: string = 'Mamalia';
  
  constructor(kaki: number, nama: string) {
    super(kaki, nama)
  }
  // Overriding Method
  suara(): void {
    console.log('Meowww')
  }
 }

 const kucing1: Kucing = new Kucing(4, 'Ojan');
//  kucing1.category // Protected hanya bisa di akses oleh subclass
kucing1.kaki // Bisa di akses karena public
```

- public = bisa di akses di semua class / dari luar class
- protected = hanya bisa di akses dari class tersebut, dan kelas turunannya
- private = hanya bisa di akses dari class itu sendiri

Pada class Hewan di atas class tersebut bisa dibuat instance nya, secara real world Hewan seharusnya tidak perlu dibuat instance nya.
Dan jika dibuat instance pada class Hewan terdapat method suara() maka isinya akan kosong, untuk mengatasi ini kita bisa gunakan **abstract class**


```ts
// Abstract class tidak bisa di instantiate
abstract class Hewan2 {
  public kaki: number;
  public nama: string;
  private rahasia: string = 'rahasia';
  protected category: string = 'Hewan';
  constructor(kaki: number, nama: string) {
    this.kaki = kaki;
    this.nama = nama;
  }
  // Jika kita mengimplementasi abstract method maka di subclass nya harus mengimplementasi method suara(), dan jika tidak akan error TS[2515]
  abstract suara(): void
}

class Kucing2 extends Hewan2 {
  constructor(kaki: number, nama: string) {
    super(kaki, nama)
  }

  // Method yang wajib
  suara(): void {
    console.log('Meowww')
  }
}
```