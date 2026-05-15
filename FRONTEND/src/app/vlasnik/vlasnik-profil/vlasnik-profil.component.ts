import { Component, inject } from '@angular/core';
import { VikendicaService } from '../../servisi/vikendica.service';
import { KorisnikService } from '../../servisi/korisnik.service';
import { Korisnik } from '../../modeli/korisnik';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vlasnik-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vlasnik-profil.component.html',
  styleUrl: './vlasnik-profil.component.css'
})
export class VlasnikProfilComponent {
  korisnikServis = inject(KorisnikService)
  vikendicaServis = inject(VikendicaService)

  korisnik: Korisnik = new Korisnik()

  ime: string = ''
  prezime: string = ''
  adresa: string = ''
  telefon: string = ''
  mejl: string = ''
  slika: string = ''
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
    this.uspeh = ''
    this.boja = ''
  }

  azuriraj() {
    if(!this.prazno() && this.greskaSlika == "") {
      if(this.ime == "") this.ime = this.korisnik.ime
      if(this.prezime == "") this.prezime = this.korisnik.prezime
      if(this.adresa == "") this.adresa = this.korisnik.adresa
      if(this.telefon == "") this.telefon = this.korisnik.telefon
      if(this.mejl == "") this.mejl = this.korisnik.mejl
      if(this.slika == "") this.slika = this.korisnik.slika

      this.korisnikServis.azuriraj(this.korisnik.korisnicko_ime, this.ime, this.prezime, this.adresa, this.telefon, this.mejl, this.slika, this.korisnik.kartica).subscribe(data => {
        if(data.poruka == "U") {
          this.boja = "green"
          this.uspeh = "Podaci uspesno azurirani"
        } else {
          this.boja = "red"
          this.uspeh = "Azuriranje podataka neuspesno"
        }
      })

      this.ngOnInit()
    } else {
      this.boja = "red"
      this.uspeh = "Ni jedno polje nije popunjeno"
    }
  }

  prazno() {
    if(this.ime == "" && this.prezime == "" && this.adresa == "" && this.telefon == "" && this.mejl == "" && this.slika == "") return true;
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
