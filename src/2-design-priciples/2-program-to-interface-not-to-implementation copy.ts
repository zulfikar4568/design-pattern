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

/************************************************************/
interface Employee {
  doWork(): void
}

class Company2 {
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

class Designer2 implements Employee {
  doWork(): void {
    console.log('Membuat Design Architecture');
  }
}

class Programmer2 implements Employee {
  doWork(): void {
    console.log('Membuat Code');
  }
}

class Tester2 implements Employee {
  doWork(): void {
    console.log('Testing Software');
  }
}

/************************************************************/

abstract class Company3 {
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

class GameDevCompany extends Company3 {
  getEmployees(): Employee[] {
    return this.employees;
  }
}

class OutsourcingCompany extends Company3 {
  getEmployees(): Employee[] {
    return this.employees;
  }
}

const jack = new Designer2();
const alex = new Programmer2();
const zul = new Tester2();
const akib = new Designer2();

const gameTech = new GameDevCompany([jack, alex]);
const outsourcing = new OutsourcingCompany([zul, akib]);
gameTech.createSoftware()