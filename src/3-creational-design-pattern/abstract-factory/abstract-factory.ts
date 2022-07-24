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