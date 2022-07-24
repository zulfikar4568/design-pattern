interface Builder {
  reset(): void;
  buatKursi(jumlah: number): void;
  buatEngine(engine: string): void;
  buatGPS(): void;
  buatRem(): void;
}

class MobilBuilder implements Builder {
  private mobil: Mobil;
  constructor() {
    this.mobil = new Mobil()
  }
  buatKursi(jumlah: number): void {
    this.mobil.parts.push(`Jumlah kursi sebanyak ${jumlah}`)
  }
  buatEngine(engine: string): void {
    this.mobil.parts.push(`Menggunakan jenis engine ${engine}`)
  }
  buatGPS(): void {
    this.mobil.parts.push(`GPS Aktif`)
  }
  buatRem(): void {
    this.mobil.parts.push(`Rem Aktif`)
  }
  reset(): void {
    this.mobil = new Mobil();
  }
  public getProductResult(): Mobil {
    const result = this.mobil
    this.reset()
    return result
  }
}

class Mobil {
  public parts: string[] = [];
  public listPart (): void {
    console.log(`Product parts: ${this.parts.join(', ')}\n`)
  }
}

class Director {
  private builder: Builder;
  constructor(builder: Builder) {
    this.builder = builder;
  }
  public bikinMobilBiasa(): void {
    this.builder.buatEngine('Engine Z100X')
    this.builder.buatKursi(2)
    this.builder.buatRem()
  }

  public bikinMobilCanggih(): void {
    this.builder.buatEngine('Engine T400F')
    this.builder.buatKursi(4)
    this.builder.buatRem()
    this.builder.buatGPS()
  }
}

const builder: MobilBuilder = new MobilBuilder()
const director: Director = new Director(builder)

console.log('Bikin mobil Biasa: ')
director.bikinMobilBiasa()
builder.getProductResult().listPart()

console.log('Bikin mobil Canggih: ')
director.bikinMobilCanggih()
builder.getProductResult().listPart()