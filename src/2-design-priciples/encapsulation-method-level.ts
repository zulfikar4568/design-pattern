interface ILineItems {price: number, quantity: number}
interface IOrder {
  lineItems: ILineItems[];
  country: string;
}

/************************************************************/

function getOrderTotal(order: IOrder) {
  let total = 0;
  order.lineItems.forEach((item) => {
    total += item.price * item.quantity
  })

  if (order.country === "US") total += total * 0.07
  else if (order.country === "EU") total += total * 0.20

  return total;
}

/************************************************************/

function getOrderTotal2(order: IOrder) {
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

/************************************************************/

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

/************************************************************/

class Order2 {
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