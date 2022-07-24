# Creational Design Patterns

Creational Pattern menyediakan berbagai mekanisme dalam pembuatan object, yang mana meningkatkan tingkat flexibility dan penggunaan code yang sudah ada secara berulang

## Factory Method

Factory method merupakan Creational Design Patterns yang menyediakan sebuah interface untuk membuat object di superclass, tapi mengizinkan subclass untuk mengubah Type dari Object yang akan di buat.

<p align="center">
  <img src="./src/3-creational-design-pattern/factory-method/FactoryMethod.png" width="70%" />
</p>

Contoh dalam Typescript:

```ts
interface ISmartphone {
  bikinProduct(): void;
}

class Samsung implements ISmartphone {
  private _tipeProduct: string;

  constructor(tipeProduct: string) {
    this._tipeProduct = tipeProduct
  }

  bikinProduct(): void {
    console.log(`Samsung ${this._tipeProduct}`)
  }
}

class Iphone implements ISmartphone {
  private _tipeProduct: string;
  constructor(tipeProduct: string) {
    this._tipeProduct = tipeProduct
  }

  bikinProduct(): void {
    console.log(`Iphone ${this._tipeProduct}`) 
  }
}

/**************************************************************** */

abstract class AbstractPabrikSmartphone {
  bikinSesuatu(tipeProduct: string): void {
    const hasil: ISmartphone = this.hasilProduct(tipeProduct)
    hasil.bikinProduct()
  }
  abstract hasilProduct(_tipeProduct: string): ISmartphone;
}


class PabrikSamsung extends AbstractPabrikSmartphone {
  hasilProduct(tipeProduct: string): ISmartphone {
    return new Samsung(tipeProduct)
  }
}

class PabrikIphone extends AbstractPabrikSmartphone {
  hasilProduct(tipeProduct: string): ISmartphone {
    return new Iphone(tipeProduct)
  }
}

const pabrikSamsungCikarang: PabrikSamsung = new PabrikSamsung();
pabrikSamsungCikarang.bikinSesuatu('A1')
pabrikSamsungCikarang.bikinSesuatu('J5')

const pabrikIphoneUS: PabrikIphone = new PabrikIphone();
pabrikIphoneUS.bikinSesuatu('13 Pro');
pabrikIphoneUS.bikinSesuatu('12 Mini');
```

## Abstract Factory
Abstract Factory merupakan Creational Design Patterns yang bisa membuat families dari sebuah object tanpa men-spesifikasikan concrete class.

<p align="center">
  <img src="./src/3-creational-design-pattern/abstract-factory/AbstractFactory.png" width="70%" />
</p>

```ts
interface IKursi {
  adaKaki(): boolean;
}

class KursiLama implements IKursi {
  adaKaki(): boolean {
    return true
  }
}

class KursiModern implements IKursi {
  adaKaki(): boolean {
    return false
  }
}


interface ISofa {
  menggunakanBusa(): boolean;
}

class SofaLama implements ISofa {
  menggunakanBusa(): boolean {
    return false
  }
}

class SofaModern implements ISofa {
  menggunakanBusa(): boolean {
    return true
  }
}

abstract class AbstractPabrikProperti {
  abstract buatKursi(): IKursi
  abstract buatSofa(): ISofa
}

class PabrikPropertiLama extends AbstractPabrikProperti {
  buatKursi(): IKursi {
    return new KursiLama()
  }
  buatSofa(): ISofa {
    return new SofaLama()
  }
}

class PabrikPropertiModern extends AbstractPabrikProperti {
  buatKursi(): IKursi {
    return new KursiModern()
  }
  buatSofa(): ISofa {
    return new SofaModern()
  }
}

class PabrikPropertiMix extends AbstractPabrikProperti {
  buatKursi(): IKursi {
    return new KursiLama()
  }
  buatSofa(): ISofa {
    return new SofaModern()
  }
}

class Ruangan {
  factory: AbstractPabrikProperti;
  constructor(f: AbstractPabrikProperti) {
    this.factory = f;
  }
  buatKursiDalamRuangan(): IKursi {
    return this.factory.buatKursi()
  }
}

const pabrik1: Ruangan = new Ruangan(new PabrikPropertiModern())
console.log(pabrik1.buatKursiDalamRuangan())
```