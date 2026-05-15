import { Component, inject } from '@angular/core';
import { KorisnikService } from '../../servisi/korisnik.service';
import { VikendicaService } from '../../servisi/vikendica.service';
import { Korisnik } from '../../modeli/korisnik';
import { Vikendica } from '../../modeli/vikendica';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from "../../../../node_modules/@angular/common/index";

@Component({
  selector: 'app-vlasnik-vikendice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vlasnik-vikendice.component.html',
  styleUrl: './vlasnik-vikendice.component.css'
})
export class VlasnikVikendiceComponent {
  korisnikServis = inject(KorisnikService)
  vikendicaServis = inject(VikendicaService)

  korisnik: Korisnik = new Korisnik()
  vikendica: Vikendica = new Vikendica()
  vikendice: Vikendica[] = []

  ruter = inject(Router)

  azuriranje = false
  dodavanje = false
  dodajJson = false
  naslov = ''
  dugme = ''
  naziv = ''
  mesto = ''
  slike = ''
  usluge = ''
  letnjaCena = 0
  zimskaCena = 0
  telefon = ''
  ocena = 0.0

  ngOnInit() {
    this.azuriranje = false
    this.dodavanje = false
    this.dodajJson = false
    this.naslov = ''
    this.dugme = ''
    this.naziv = ''
    this.mesto = ''
    this.slike = ''
    this.usluge = ''
    this.letnjaCena = 0
    this.zimskaCena = 0
    this.telefon = ''

    let x = localStorage.getItem("prijavljen")
    if(x != null) {
      this.korisnik = JSON.parse(x)
    }

    x = localStorage.getItem("vikendice")
    if(x != null) {
      this.vikendice = JSON.parse(x)
    }
  }

  prikazi(vikendica: Vikendica) {
    this.dodavanje = false
    this.azuriranje = true
    this.dodajJson = false
    this.vikendica = vikendica
    this.naslov = "Azuriraj podatke"
    this.dugme = "Azuriraj"
  }

  dodaj() {
    this.azuriranje = false
    this.dodavanje = true
    this.naslov = "Dodaj novu vikendicu"
    this.dugme = "Dodaj"
  }

  azuriraj() {
    if(this.azuriranje) {
      if(this.naziv == "") this.naziv = this.vikendica.naziv
      if(this.mesto == "") this.mesto = this.vikendica.mesto
      if(this.usluge == "") this.usluge = this.vikendica.usluge
      if(this.letnjaCena == 0) this.letnjaCena = this.vikendica.letnjaCena
      if(this.zimskaCena == 0) this.zimskaCena = this.vikendica.zimskaCena
      if(this.telefon == '') this.telefon = this.vikendica.telefon

      this.vikendicaServis.azuriraj(this.vikendica.idV, this.naziv, this.mesto, this.usluge, this.letnjaCena, this.zimskaCena, this.telefon).subscribe(data => {
        if(data.poruka == "U") {
          alert("Azuriranje vikendice uspesno")
          this.vikendicaServis.dohvatiMoje(this.korisnik.korisnicko_ime).subscribe(data => {
            this.vikendice = data
          })
          this.ngOnInit()
        } else {
          alert("Azuriranje vikendice neuspesno")
        }
      })
    } else if(!this.prazna()) {
      this.vikendicaServis.dodaj(this.naziv, this.mesto, this.usluge, this.letnjaCena, this.zimskaCena, this.telefon, this.korisnik.korisnicko_ime).subscribe(data => {
        if(data.poruka == "U") {
          alert("Dodavanje vikendice uspesno")
          this.vikendicaServis.dohvatiMoje(this.korisnik.korisnicko_ime).subscribe(data => {
            this.vikendice = data
          })
          this.ngOnInit()
        } else {
          alert("Dodavanje vikendice neuspesno")
        }
      })
    } else if(this.dodajJson && !this.praznaJSON()) {
      this.vikendicaServis.dodaj(this.naziv, this.mesto, this.usluge, this.letnjaCena, this.zimskaCena, this.telefon, this.korisnik.korisnicko_ime).subscribe(data => {
        if(data.poruka == "U") {
          alert("Dodavanje vikendice uspesno")
          this.vikendicaServis.dohvatiMoje(this.korisnik.korisnicko_ime).subscribe(data => {
            this.vikendice = data
          })
          this.ngOnInit()
        } else {
          alert("Dodavanje vikendice neuspesno")
        }
      })
    }
  }

  obrisi(idV: number) {
    this.vikendicaServis.obrisi(idV).subscribe(data => {
      if(data.poruka == "U") {
        alert("Brisanje vikendice uspesno")
        this.vikendicaServis.dohvatiMoje(this.korisnik.korisnicko_ime).subscribe(data => {
          this.vikendice = data
        })
        this.ngOnInit()
      } else {
        alert("Brisanje vikendice neuspesno")
      }
    })
  }

  prazna() {
    if(this.naziv == '' || this.mesto == '' || this.slike == '' || this.usluge == '' || this.telefon == '') {
      return true
    } else return false
  }

  praznaJSON() {
    if(this.naziv == '' || this.mesto == '' || this.usluge == '' || this.telefon == '') {
      return true
    } else return false
  }

  json(event: any) {
    this.dodajJson = true
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const data = JSON.parse(reader.result as string)
      this.naziv = data.naziv
      this.mesto = data.mesto
      this.usluge = data.usluge
      this.telefon = data.telefon
      this.letnjaCena = data.letnjaCena
      this.zimskaCena = data.zimskaCena
    }
    reader.readAsText(file)
  }
}
