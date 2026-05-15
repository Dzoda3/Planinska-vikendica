import { Component, inject } from '@angular/core';
import { KorisnikService } from '../servisi/korisnik.service';
import { Korisnik } from '../modeli/korisnik';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  korisnikServis = inject(KorisnikService)

  korisnik: Korisnik = new Korisnik()
  korisnikAzuriranje: Korisnik = new Korisnik()
  korisnici: Korisnik[] = []
  registracije: Korisnik[] = []

  azuriranje = false

    korisnicko_ime: string = ''
    lozinka: string = ''
    ime: string = ''
    prezime: string = ''
    tip: string = ''
    pol: string = ''
    adresa: string = ''
    telefon: string = ''
    mejl: string = ''
    slika: string = ''
    kartica: string = ''
    greska: string = ''
    greskaLozinka: string = ''
    uspeh: string = ''
    boja: string = ''

  ngOnInit(): void {
    let x = localStorage.getItem("prijavljen")
    if(x != null) {
      this.korisnik = JSON.parse(x)
    }

    this.korisnikServis.dohvatiSve().subscribe(data => {
      this.korisnici = data
    })

    this.korisnikServis.dohvatiRegistracije().subscribe(data => {
      this.registracije = data
    })

    this.greska = ""
    this.greskaLozinka = ""
    this.korisnicko_ime = ''
    this.lozinka = ''
    this.ime = ''
    this.prezime = ''
    this.tip = ''
    this.pol = ''
    this.adresa = ''
    this.telefon = ''
    this.mejl = ''
    this.slika = ''
    this.kartica = ''
    this.greska = ''
    this.greskaLozinka = ''
    this.uspeh = ''
    this.boja= ''
    this.azuriranje = false
  }

  prikazi(korisnik: Korisnik) {
    this.azuriranje = true
    this.korisnikAzuriranje = korisnik
  }

  azuriraj() {
    if((this.validna || this.poruka == "") && this.greskaLozinka == "" && !this.prazno()) {
      if(this.korisnicko_ime == "") this.korisnicko_ime = this.korisnikAzuriranje.korisnicko_ime
      if(this.lozinka == "") this.lozinka = this.korisnikAzuriranje.lozinka
      if(this.ime == "") this.ime = this.korisnikAzuriranje.ime
      if(this.prezime == "") this.prezime = this.korisnikAzuriranje.prezime
      if(this.tip == "") this.tip = this.korisnikAzuriranje.tip
      if(this.pol == "") this.pol = this.korisnikAzuriranje.pol
      if(this.adresa == "") this.adresa = this.korisnikAzuriranje.adresa
      if(this.telefon == '') this.telefon = this.korisnikAzuriranje.telefon
      if(this.mejl == "") this.mejl = this.korisnikAzuriranje.mejl
      if(this.slika == "") this.slika = this.korisnikAzuriranje.slika
      if(this.kartica == "") this.kartica = this.korisnikAzuriranje.kartica

      this.korisnikServis.adminAzuriraj(this.korisnikAzuriranje.korisnicko_ime, this.korisnicko_ime, this.lozinka, this.ime, this.prezime, this.tip, this.pol, this.adresa, this.telefon, this.mejl, this.slika, this.kartica).subscribe(data => {
        if(data.poruka == "U") {
          alert("Podaci uspesno azurirani")
          this.ngOnInit()
        } else {
          alert("Azuriranje podataka neuspesno")
          this.ngOnInit()
        }
      })
    } else {
      this.boja = "red"
      this.uspeh = "Ni jedno polje nije popunjeno"
    }
  }

  deaktiviraj(korisnik: Korisnik) {
    this.korisnikServis.deaktiviraj(korisnik.korisnicko_ime).subscribe(data => {
      if(data.poruka == "U") {
        if(korisnik.deaktiviran == 0) {
          alert("Uspesno deaktiviran korisnik")
          this.ngOnInit()
        } else {
          alert("Uspesno aktiviran korisnik")
          this.ngOnInit()
        }
      } else {
        alert("Deaktivacija neuspesna")
      }
    })
  }

  prihvati(korisnicko_ime: string) {
    this.korisnikServis.prihvati(korisnicko_ime).subscribe(data => {
      if(data.poruka == "U") {
        alert("Registracija odobrena")
        this.ngOnInit()
      } else {
        alert("Neuspesno odobravanje registracije")
        this.ngOnInit()
      }
    })
  }

  odbij(korisnicko_ime: string) {
    this.korisnikServis.odbij(korisnicko_ime).subscribe(data => {
      if(data.poruka == "U") {
        alert("Registracija odbijena")
        this.ngOnInit()
      } else {
        alert("Neuspesno odbijena registracije")
        this.ngOnInit()
      }
    })
  }

  proveraLozinke() {
    const pocetnoSlovo = /^[A-Za-z]/.test(this.lozinka)
    const duzina = this.lozinka.length >= 6 && this.lozinka.length <= 10
    const velikoSlovo = /[A-Z]/.test(this.lozinka)
    const malaSlova = (this.lozinka.match(/[a-z]/g) || []).length >= 3
    const broj = /\d/.test(this.lozinka)
    const specijalanKarakter = /[!@#$%^&*(),.?":{}|<>_\-\[\]\\\/~`+=;'"]/g.test(this.lozinka)

    if(pocetnoSlovo && duzina && velikoSlovo && malaSlova && broj && specijalanKarakter) {
      this.greskaLozinka = ""
    } else {
      this.greskaLozinka = "Lozinka mora da bude duzine od 6 do 10 karaktera i da sadrzi bar jedno veliko slovo, broj, specijalni karakter i 3 mala slova"
    }
  }

  tipKartice: string = ''
  validna: boolean = false
  poruka: string = ''

  proveraKartice() {
    const broj = this.kartica.replace(/\D/g, '')

    if (broj.length == 0) {
      this.poruka = ''
      return
    }

    if (/^(300|301|302|303|36|38)/.test(broj)) {
      this.tipKartice = 'Diners'
      this.validna = broj.length === 15
    } else if (/^(51|52|53|54|55)/.test(broj)) {
      this.tipKartice = 'MasterCard'
      this.validna = broj.length === 16
    } else if (/^(4539|4556|4916|4532|4929|4485|4716)/.test(broj)) {
      this.tipKartice = 'Visa'
      this.validna = broj.length === 16
    } else {
      this.tipKartice = ''
      this.poruka = 'Nepoznata kartica'
      return
    }

    if (this.validna) {
      this.poruka = `${this.tipKartice} — validna`
    } else {
      const potrebnaDuzina = this.tipKartice === 'Diners' ? 15 : 16
      this.poruka = `Za karticu tipa: ${this.tipKartice} je potrebno ${potrebnaDuzina} cifara (trenutno: ${broj.length})`
    }
  }

  prazno() {
    if(this.korisnicko_ime == "" && this.ime == "" && this.prezime == "" && this.tip == "" && this.pol == "" && this.adresa == "" && this.telefon == '' && this.mejl == "" && this.slika == "") {
      return true
    } else {
      return false
    }
  }


  greskaSlika: string = ''
  proveraSlike(event: any) {
    this.greskaSlika = ''
    const fajl = event.target.files[0]
    if(fajl) {
      const dozvoljeno = ["image/jpeg", "image/png"]
      if(!dozvoljeno.includes(fajl.type)) {
        this.greskaSlika = "Nedozvoljen tip fajla"
        return
      }

      const slika = new Image()
      slika.src = window.URL.createObjectURL(fajl)
      slika.onload = () => {

        if(slika.width < 100 || slika.width > 300 || slika.height < 100 || slika.height > 300) {
          this.greskaSlika = "Nedozvoljena velicina slike"
          return
        }
      }

      const citac = new FileReader()
      citac.onload = (e: any) => {
        this.slika = e.target.result
      }
      citac.readAsDataURL(fajl)
    }
  }
}
