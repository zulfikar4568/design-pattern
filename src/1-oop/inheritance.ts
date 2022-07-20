class Hewan {
  public kaki: number;
  public nama: string;
  private rahasia: string = 'rahasia';
  protected category: string = 'Hewan';
  constructor(kaki: number, nama: string) {
    this.kaki = kaki;
    this.nama = nama;
  }
  suara() {}
 }

// Kucing "is a" Hewan
// Hewan mewariskan ke Kucing
class Kucing extends Hewan {
  // Private tidak akan diturunkan ke subclass
  // private rahasia: string = 'rahasia'; // TS[2415] Error

  // Protected akan di turunkan ke subclass nya, tetapi protected tidak akan bisa di akses dari luar
  protected category: string = 'Mamalia';
  
  constructor(kaki: number, nama: string) {
    super(kaki, nama)
  }
  // Overriding Method
  suara(): void {
    console.log('Meowww')
  }
 }

 const kucing1: Kucing = new Kucing(4, 'Ojan');
//  kucing1.category // Protected hanya bisa di akses oleh subclass
kucing1.kaki // Bisa di akses karena public

/******************************************** ABSTRACT CLASS ************************************* */

abstract class Hewan2 {
  public kaki: number;
  public nama: string;
  private rahasia: string = 'rahasia';
  protected category: string = 'Hewan';
  constructor(kaki: number, nama: string) {
    this.kaki = kaki;
    this.nama = nama;
  }
  abstract suara(): void
}

class Kucing2 extends Hewan2 {
  constructor(kaki: number, nama: string) {
    super(kaki, nama)
  }
  suara(): void {
    console.log('Meowww')
  }
}