- [Design Principle](#design-principle)
  - [Encapsulation What Varies](#encapsulation-what-varies)
    - [Enkapsulasi pada level method](#enkapsulasi-pada-level-method)
    - [Enkapsulasi pada Level Class](#enkapsulasi-pada-level-class)
  - [Program to an Interface, not an Implementation](#program-to-an-interface-not-an-implementation)
  - [SOLID Principle](#solid-principle)
    - [[S]ingle Responsibility Principle](#single-responsibility-principle)
    - [[O]pen / Closed Principle](#open--closed-principle)
# Design Principle
Desain software yang baik seperti apa? Bagaimana cara mengukurnya? Practices apa yang dibutuhkan untuk hal tersebut? Bagaimana cara membuat arsitektur sistem kita flexible, stabil dan mudah di mengerti?

## Encapsulation What Varies
`"Identifikasi aspek yang bervariasi dari aplikasi kita dan pisahkan sesuai dengan jenis nya."`

Tujuan principle ini adalah untuk meminimalisir efek yang disebabkan oleh perubahan.

### Enkapsulasi pada level method

Misalkan kita punya ecommerce, dan mempunyai method `getOrderTotal` untuk menghitung total order beserta pajak nya.
Jika pajak bergantung pada negara, wilayah, atau kota dimana customer tinggal maka rumus mungkin akan selalu berubah. Jadinya method `getOrderTotal` mungkin akan sering berubah karna mungkin country akan banyak memiliki jenis.

```ts
interface IOrder {
  lineItems: {price: number, quantity: number}[];
  country: string;
}

function getOrderTotal(order: IOrder) {
  let total = 0;
  order.lineItems.forEach((item) => {
    total += item.price * item.quantity
  })

  if (order.country === "US") total += total * 0.07 // Pajak US
  else if (order.country === "EU") total += total * 0.20 // Pajak EU

  return total;
}
```

Oke kita bisa coba pisahkan logic Pajak seperti berikut
```ts
function getOrderTotal(order: IOrder) {
  let total = 0;
  order.lineItems.forEach((item) => {
    total += item.price * item.quantity
  })
  
  total += total * getTaxRate(order.country);

  return total
}

function getTaxRate(country: string): number {
  if (country === "US") return 0.07
  else if (country === "EU") return 0.20
  return 0
}
```

Jadi jika kita ingin menambah jenis Tax maka kita tidak perlu mengubah juga `getOrderTotal`.

### Enkapsulasi pada Level Class
Misalkan sama kasus nya seperti diatas, kita mempunyai class
```ts
class Order {
  lineItems: ILineItems[];
  country: string;
  constructor(lineItems: ILineItems[], country: string) {
    this.lineItems = lineItems;
    this.country = country
  }

  getOrderTotal(): number {
    let total = 0;
    this.lineItems.forEach((item) => {
      total += item.price * item.quantity
    })
    
    total += total * this.getTaxRate(this.country);

    return total
  }

  getTaxRate(country: string): number {
    if (country === "US") return 0.07
    else if (country === "EU") return 0.20
    return 0
  }
}
```

Kita bisa pisahkan seperti berikut

```ts
class Order {
  lineItems: ILineItems[];
  country: string;
  constructor(lineItems: ILineItems[], country: string) {
    this.lineItems = lineItems;
    this.country = country
  }

  getOrderTotal(): number {
    let total = 0;
    this.lineItems.forEach((item) => {
      total += item.price * item.quantity
    })
    
    total += total * TaxCalculator.getTaxRate(this.country);

    return total
  }
}

class TaxCalculator {
  static getTaxRate(country: string): number {
    if (country === "US") return 0.07
    else if (country === "EU") return 0.20
    return 0
  }

  static getUSTax(state: string) {}
  static getEUTax(country: string) {}
  static getChineseTax(product: string) {} 
}
```

## Program to an Interface, not an Implementation
`"Program ke sebuah interface, bukan ke sebuah implementasi."`

* Contoh 1:

Misalkan contoh kita punya class Kucing yang makan nya Sosis, tetapi kita ingin Kucing tersebut tidak hanya makan sosis tapi bisa makan yang lainnya seperti kasus dibawah ini:

```ts
class Kucing {
  energi: number & 100;
  constructor(energi: number & 100) {
    this.energi = energi
  }

  makan(s: Sosis) {
    this.energi += s.getNutrisi();
  }
}

class Sosis {
  nutrisi: number = 10;
  warna: string = "merah";
  kadaluarsa: string = "20/07/2022"
  getNutrisi(): number {return this.nutrisi}
  getWarna(): string {return this.warna}
  GetKadaluarsa(): string {return this.kadaluarsa}
}
```

Pada program diatas Kucing hanya bisa di isi oleh sosis. Jika kita ingin agar Kucing bisa di isi oleh makanan lain maka kita implement interface:

```ts
interface Makanan{
  getNutrisi(): number;
}

class Kucing {
  energi: number & 100;
  constructor(energi: number & 100) {
    this.energi = energi
  }

  makan(s: Makanan) {
    this.energi += s.getNutrisi();
  }
}

class Sosis implements Makanan {
  nutrisi: number = 10;
  warna: string = "merah";
  kadaluarsa: string = "20/07/2022"
  getNutrisi(): number {return this.nutrisi}
  getWarna(): string {return this.warna}
  GetKadaluarsa(): string {return this.kadaluarsa}
}

class Ikan implements Makanan {
  nutrisi: number = 50;
  warna: string = "Coklat";
  kadaluarsa: string = "20/07/2022"
  getNutrisi(): number {return this.nutrisi}
  getWarna(): string {return this.warna}
  GetKadaluarsa(): string {return this.kadaluarsa}
}
```

Kode diatas maka akan lebih fleksibel dibandingkan sebelumnya, namun mungkin aga sedikit kompleks di bandingkan sebelumnya.

* Contoh 2: 

berikut Software Development Company, terdapat class yang mempunyai berbagai jenis type Employee.

```ts
class Company {
  createSoftware(d: Designer, p: Programmer, t: Tester): void {
    d.designArchitecture();
    p.writeCode();
    t.testSoftware();
  }
}

class Designer {
  designArchitecture(): void {
    console.log('Membuat Design Architecture');
  }
}

class Programmer {
  writeCode(): void {
    console.log('Membuat Code');
  }
}

class Tester {
  testSoftware(): void {
    console.log('Testing Software');
  }
}
```

Class di atas semua class saling digabungkan, namun kita hanya memiliki jenis employees yang terbatas, kita bisa menambahkan polymorphism agar kelas bisa menambahkan banyak jenis employee tanpa mengubah class Company

```ts
interface Employee {
  doWork(): void
}

class Company {
  employees: Employee[];
  constructor(employees: Employee[]) {
    this.employees = employees;
  }
  createSoftware(): void {
    this.employees.forEach((item) => {
      item.doWork()
    })    
  }
}

class Designer implements Employee {
  doWork(): void {
    console.log('Membuat Design Architecture');
  }
}

class Programmer implements Employee {
  doWork(): void {
    console.log('Membuat Code');
  }
}

class Tester implements Employee {
  doWork(): void {
    console.log('Testing Software');
  }
}
```

Code di atas kita bisa menambahkan banyak employee tanpa mengubah class Company, tetapi class Company masih bergantung pada concrete class Company, dan jika kita ingin menambahkan jenis Company maka kita bisa gunakan class Company sebagai abstract.

```ts
interface Employee {
  doWork(): void
}

class Designer implements Employee {
  doWork(): void {
    console.log('Membuat Design Architecture');
  }
}

class Programmer implements Employee {
  doWork(): void {
    console.log('Membuat Code');
  }
}

class Tester implements Employee {
  doWork(): void {
    console.log('Testing Software');
  }
}

abstract class Company {
  employees: Employee[];
  constructor(employees: Employee[]) {
    this.employees = employees;
  }
  createSoftware(): void {
    this.employees.forEach((item) => {
      item.doWork()
    })    
  }

  abstract getEmployees(): Employee[];
}

class GameDevCompany extends Company {
  getEmployees(): Employee[] {
    return this.employees;
  }
}

class OutsourcingCompany extends Company {
  getEmployees(): Employee[] {
    return this.employees;
  }
}

const jack = new Designer();
const alex = new Programmer();
const zul = new Tester();
const akib = new Designer();

const gameTech = new GameDevCompany([jack, alex]);
const outsourcing = new OutsourcingCompany([zul, akib]);
gameTech.createSoftware()
```


## SOLID Principle

SOLID merupakan singkatan dari lima design principle untuk membuat software lebih mudah dimengerti, fleksibel, dan mudah di manage.

Tapi jika kita salah menggunakan prinsip ini bisa membuat tambah rumit dari pada bagus, dan mungkin cost juga bisa meningkat dari pada seharusnya


### [S]ingle Responsibility Principle
`A class should have one reason to change`

Tujuan prinple ini adalah untuk mengurangi ke kompleks-an. Namun jika hanya menulis sedikit baris code misal di bawah 200, kita tidak perlu mengimplementasi kan ini, kita cukup membuat nya dengan rapih aja sudah cukup.

Masalah ini muncul pada saat jika program kita secara konstan berubah dan berkembang, pada titik tertentu class menjadi sangat besar, dan kita tidak bisa lagi mengingatnya, dan kita harus banyak scroll panjang class untuk mencari seluruh program atau butuh mencari hal tertentu saja. Dan kita tidak bisa lagi meng kontrol class ini karena terlalu besar.

Jika class nya terlalu banyak mengerjakan hal, maka kita harus mengubah nya setiap kali ada salah satu yang berubah, dan saat kita mengubah akan menjadi riskan karena bisa saja malah merusak yang sudah ada.

Jika saat kita menemukan kesulitan saat memfokuskan kepada satu aspek, mungkin kita bisa menentukan kapan kita harus membagi-bagi class tersebut dengan SRP.

Contoh masalah:
```ts
// One class have many responsibility
class Vehicle {
   getType() {}
   getEngineOil() {}
   getTypeRims() {}
   getBody() {}
}
```

Solusi:
```ts
// One class Have one responsibility
class Vehicle {
 ambilJenisKendaraan() {}
}
 
class Engine {
 getEngineOil() {}
}
 
class Rims {
 getTypeRims() {}
}
 
class Body {
 getBody() {}
}
```

### [O]pen / Closed Principle
`Classes should be open for extension but closed for modification.` 

Tujuan dari prinsip ini adalah untuk menjaga kode yang sudah ada dari kerusakan ketika kita menambahkan kode baru.

Open disini adalah maksudnya bahwa sebuah class bisa di extend dengan membuat subclass apakah itu akan di tambah method baru, state, atau override method. Closed di sini maksudnya ketika kita ingin meng-extend atau menambah sesuatu kita seharusnya tidak memodifikasi yang sudah ada.

Jika sebuah class sudah di develop, di test, di review, dan sudah di pakai di aplikasi, mencoba untuh mengubah - ubah nya akan menjadi beresiko, dari pada kita mengubah code langsung pada class tersebut lebih baik kita membuat subclass dengan behaviour yang berbeda.

Jika ada bug pada class langsung solve kan dan perbaiki, jangan bikin subclass, karena subclass tidak seharusnya bertanggung jawab atas issue di parent class.

Contoh masalah:
```ts
class Rectangle {
 width: number;
 height: number;
 constructor(_width: number, _height: number) {
   this.width = _width;
   this.height = _height;
 }
}
class Circle {
 radius: number;
 phi: 3.14;
 constructor(_radius: number) {
   this.radius = _radius;
 }
}
 
function AreaTotal(shape: (Rectangle | Circle)[]): number {
 let area: number = 0;
 shape.forEach(element => {
   if (element instanceof Rectangle) {
     area += element.height * element.height;
   } else if (element instanceof Circle) {
     area += element.phi * element.radius * element.radius;
   }
 });
 return area;
}
```

Pada masalah ini Rectangle dan Circle di hardcode pada function Area Total. Pertanyaan nya jika kita ingin menambah katakanlah Square, kita harus mengubah function AreaTotal.

Solusi:
```ts
abstract class Shape {
 abstract area(): number;
}
 
class Rectangle extends Shape {
 width: number;
 height: number;
 constructor(_width: number, _height: number) {
   super()
   this.width = _width;
   this.height = _height;
 }
 area(): number {
   return this.width * this.height;
 }
}
 
class Circle extends Shape {
 radius: number;
 phi: 3.14;
 constructor(_radius: number) {
   super()
   this.radius = _radius;
 }
 area(): number {
   return this.radius^2 * this.phi;
 }
}
 
// if we want to add shape we shouldn't to modify this function (close for modification), instead we extended shape(open for modification)
function AreaTotal(shapes: Shape[]) {
 let area: number = 0;
 shapes.forEach(element => {
   area += element.area();
 });
 return area;
}
```

sekarang solusinya kita bisa menambahkan polymorpishm sehingga kita tidak harus mengubah function AreaTotal, cukup dengan meng-extends class Shape, maka kita akan mendapatkan behaviour yang sama.