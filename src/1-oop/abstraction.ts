// Tipe data Rest API
interface IPesawatAPI { 
  speed: number, 
  altitude: number, 
  rollAngle: number, 
  pitchAngle: number, 
  yawAngle: number, 
  seats: number, 
  warna: string, 
  ukuran: number 
}

// Data dari Rest API misalkan
const jsonAPI: IPesawatAPI = {
  speed: 1, 
  altitude: 20, 
  rollAngle: 180, 
  pitchAngle: 90, 
  yawAngle: 270, 
  seats: 90, 
  warna: 'red', 
  ukuran: 30 
}

interface IPesawatSimulatorApp {
  speed: number;
  altitude: number;
  rollAngle: number;
  pitchAngle: number;
  yawAngle: number;

  fly(): void;
}

interface IPesawatBookingApp {
  seats: number;

  reverseSeats(n: number): void;
}

class Pesawat {
  warna: string;
  ukuran: number;
  speed: number;
  altitude: number;
  rollAngle: number;
  pitchAngle: number;
  yawAngle: number;
  seats: number;

  constructor(data: IPesawatAPI) {
    this.warna = data.warna;
    this.ukuran = data.ukuran;
    this.speed = data.speed;
    this.altitude = data.altitude;
    this.rollAngle = data.rollAngle;
    this.pitchAngle = data.pitchAngle;
    this.yawAngle = data.yawAngle;
    this.seats = data.seats;
  }

  fly(): void {
    console.log(`Aku terbang!, dengan speed: ${this.speed}, altitude: ${this.altitude}, rollAngle: ${this.rollAngle}, pitchAngle: ${this.pitchAngle}, yawAngle: ${this.yawAngle}`)
  }

  calculatingSeats(seats: number, consume: number): number {
    return seats - consume;
  }

  reverseSeats(n: number): void {
    console.log(`Anda memesan kursi sebanyak ${n} dan sisa kursi sebanyak ${this.calculatingSeats(this.seats, n)}`)
  }
}

const boeing: Pesawat = new Pesawat(jsonAPI);
console.log(boeing.seats)
console.log(boeing.speed)
boeing.fly()
boeing.reverseSeats(10)

const boeingSimulator: IPesawatSimulatorApp = new Pesawat(jsonAPI);
const boeingReverse: IPesawatBookingApp = new Pesawat(jsonAPI);

boeingSimulator.fly()
// Kita bisa dapatkan sisa kursi tanpa mengetahui proses perhitungannya seperti apa
boeingReverse.reverseSeats(10)