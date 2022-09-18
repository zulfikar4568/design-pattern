interface Transport {
  deliver(): void
}

class Truck implements Transport {
  jenisBarang: string;
  constructor(jenisBarang: string) {
    this.jenisBarang = jenisBarang
  }
  deliver(): void {
    console.log(`Pengiriman barang ${this.jenisBarang} melalui Truck di kirim via darat`)
  }
}

class Ship implements Transport {
  jenisBarang: string;
  constructor(jenisBarang: string) {
    this.jenisBarang = jenisBarang
  }
  deliver(): void {
    console.log(`Pengiriman barang ${this.jenisBarang} melalui Ship di kirim via laut`)
  }
}

/**############################# */

abstract class Logistics {
  planDelivery(jenisBarang: string): void {
    const transport: Transport = this.createTransport(jenisBarang)
    transport.deliver();
  }
  abstract createTransport(jenisBarang: string): Transport
}

class RoadLogistics extends Logistics {
  createTransport(jenisBarang: string): Transport {
    return new Truck(jenisBarang)
  }
}

class SeaLogistics extends Logistics {
  createTransport(jenisBarang: string): Transport {
    return new Ship(jenisBarang)
  }
}

const pabrikRoadLogistic: Logistics = new RoadLogistics()
const pabrikSeaLogistic: Logistics = new SeaLogistics()
pabrikRoadLogistic.planDelivery("Paket Sepatu")
pabrikRoadLogistic.planDelivery("Paket Baju")
pabrikSeaLogistic.planDelivery("Paket Mobil")
pabrikSeaLogistic.planDelivery("Paket Mobil Mewah")
pabrikSeaLogistic.planDelivery("Paket Mobil Ferari")

const pabrikLogistics: Logistics[] = [pabrikRoadLogistic, pabrikSeaLogistic]