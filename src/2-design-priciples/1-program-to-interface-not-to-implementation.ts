class Kucing1 {
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

/************************************************************/
interface Makanan{
  getNutrisi(): number;
}

class Kucing3 {
  energi: number & 100;
  constructor(energi: number & 100) {
    this.energi = energi
  }

  makan(s: Makanan) {
    this.energi += s.getNutrisi();
  }
}

class Sosis2 implements Makanan {
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