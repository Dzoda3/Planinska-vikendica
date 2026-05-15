import { Component, inject } from '@angular/core';
import { KorisnikService } from '../../servisi/korisnik.service';
import { VikendicaService } from '../../servisi/vikendica.service';
import { Korisnik } from '../../modeli/korisnik';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turista-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './turista-profil.component.html',
  styleUrl: './turista-profil.component.css'
})
export class TuristaProfilComponent {
  korisnikServis = inject(KorisnikService)
  vikendicaServis = inject(VikendicaService)

  korisnik: Korisnik = new Korisnik()

  ime: string = ''
  prezime: string = ''
  adresa: string = ''
  telefon: string = ''
  mejl: string = ''
  slika: string = ''
  kartica: string = ''
  uspeh: string = ''
  boja: string = ''
  greskaSlika: string = ''

  ngOnInit() {
    let x = localStorage.getItem("prijavljen")
    if(x != null) {
      this.korisnik = JSON.parse(x)
    }

    this.ime = ''
    this.prezime = ''
    this.adresa = ''
    this.telefon = ''
    this.mejl = ''
    this.slika = ''
    this.kartica = ''
  }

  azuriraj() {
    if((this.validna || this.poruka == "") && !this.prazno() && this.greskaSlika == "") {
      this.uspeh = ''
      this.boja = ''
      if(this.ime == "") this.ime = this.korisnik.ime
      if(this.prezime == "") this.prezime = this.korisnik.prezime
      if(this.adresa == "") this.adresa = this.korisnik.adresa
      if(this.telefon == "") this.telefon = this.korisnik.telefon
      if(this.mejl == "") this.mejl = this.korisnik.mejl
      if(this.slika == "") this.slika = this.korisnik.slika
      if(this.kartica == "") this.kartica = this.korisnik.kartica

      this.korisnikServis.azuriraj(this.korisnik.korisnicko_ime, this.ime, this.prezime, this.adresa, this.telefon, this.mejl, this.slika, this.kartica).subscribe(data => {
        if(data.poruka == "U") {
          this.boja = "green"
          this.uspeh = "Podaci uspesno azurirani"

          this.korisnikServis.prijava(this.korisnik.korisnicko_ime, this.korisnik.lozinka, this.korisnik.tip).subscribe(data => {
            if(!data) {
              this.boja = "red"
              this.uspeh = "Korisnik ne postoji"
            } else {
              localStorage.setItem("prijavljen", JSON.stringify(data));
              this.ngOnInit()
            }
          })
        } else {
          this.boja = "red"
          this.uspeh = "Azuriranje podataka neuspesno"
        }
      })
    } else {
      this.boja = "red"
      this.uspeh = "Ni jedno polje nije popunjeno"
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
    if(this.ime == "" && this.prezime == "" && this.adresa == "" && this.telefon == "" && this.mejl == "" && this.slika == "" && this.kartica == "") return true;
    else return false;
  }

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
