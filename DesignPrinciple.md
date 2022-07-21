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