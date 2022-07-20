class Anjing {
  nama: string;
  constructor(nama: string) {
    this.nama = nama
  }

  display(): void{
    console.log(`Nama: ${this.nama}`)
  }
}

class AnjingBuldog extends Anjing{
  type: string = "AnjingBuldog";
  constructor(nama: string) {
    super(nama)
  }

  display(): void {
    super.display()
    console.log(`Type: ${this.type} \n`)
  }
}

class AnjingPitbull extends Anjing {
  type: string = "AnjingPitbull";
  constructor(nama: string) {
    super(nama)
  }

  display(): void {
    super.display()
    console.log(`Type: ${this.type} \n`)
  }
}

class AnjingCihuwa extends Anjing {
  type: string = "AnjingCihuwa";
  constructor(nama: string) {
    super(nama)
  }

  display(): void {
    super.display()
    console.log(`Type: ${this.type} \n`)
  }

  showOff() {
    console.log(`Aku adalah ${this.type}`)
  }

}

const anjing1: Anjing = new Anjing("jack")
const anjing2: AnjingPitbull = new AnjingPitbull("ucup")
anjing1.display()
anjing2.display()

//Polymorphic
const anjing3: AnjingCihuwa = new AnjingCihuwa("alex")
anjing3.display()
anjing3.showOff()

// const anjing4: AnjingCihuwa = new AnjingBuldog("abah") // Akan Error karena Anjing Cihuwa bukan Anjing Pitbull
// const anjing4: AnjingBuldog = new Anjing("opang") // Error

const anjing4: AnjingBuldog = new AnjingBuldog("Abah")
anjing4.display()

const kumpulanAnjing: Anjing[] = [anjing1, anjing2, anjing3, anjing4]

// display
kumpulanAnjing[0].display()
kumpulanAnjing[1].display()
kumpulanAnjing[2].display()
kumpulanAnjing[3].display()

// show off
// kumpulanAnjing[3].showOff() // Ini akan error karena type nya bukan lagi AnjingCihuwa
