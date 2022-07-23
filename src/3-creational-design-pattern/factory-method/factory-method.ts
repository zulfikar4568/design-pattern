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