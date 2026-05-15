import { Component, inject } from '@angular/core';
import { KorisnikService } from '../../servisi/korisnik.service';
import { Korisnik } from '../../modeli/korisnik';
import { Rezervacija } from '../../modeli/rezervacija';
import { Vikendica } from '../../modeli/vikendica';
import { VikendicaService } from '../../servisi/vikendica.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-turista-rezervacije',
  standalone: true,
  imports: [],
  templateUrl: './turista-rezervacije.component.html',
  styleUrl: './turista-rezervacije.component.css'
})
export class TuristaRezervacijeComponent {

  korisnikServis = inject(KorisnikService)
  vikendicaServis = inject(VikendicaService)

  korisnik: Korisnik = new Korisnik()
  rezervacije: Rezervacija[] = []
  arhivaRezervacija: Rezervacija[] = []
  vikendice: Vikendica[] = []

  datum: Date = new Date()
  datumString: String = formatDate(this.datum, "yyyy-MM-dd", 'en-US')

  ngOnInit() {
    let x = localStorage.getItem("prijavljen")
    if(x != null) {
      this.korisnik = JSON.parse(x)
    }

    this.korisnikServis.dohvatiRezervacije(this.korisnik.korisnicko_ime).subscribe(data => {
      this.rezervacije = data

      this.arhivaRezervacija = []
      for(let r of this.rezervacije) {
        if(r.datumDo.split('T')[0] < this.datumString) {
          this.arhivaRezervacija.push(r)
        }

        this.vikendicaServis.dohvatiVikendicu(r.idV).subscribe(data => {
          this.vikendice.push(data)
        })
      }

      this.arhivaRezervacija.sort((a, b) => (a.datumDo > b.datumDo) ? -1 : 1)
    })
  }

  dohvatiNaziv(rezervacija: Rezervacija) {
    const vikendica = this.vikendice.find(vikendica => vikendica.idV == rezervacija.idV)
    return vikendica?.naziv
  }

  dohvatiMesto(rezervacija: Rezervacija) {
    const vikendica = this.vikendice.find(vikendica => vikendica.idV == rezervacija.idV)
    return vikendica?.mesto
  }

  otkazi(rezervacija: Rezervacija) {
    this.vikendicaServis.otkazi(rezervacija).subscribe(data => {
      if(data.poruka == "U") {
        alert("Rezervacija uspesno otkazana")
        this.ngOnInit()
      } else {
        alert("Greska")
      }
    })
  }

  moguceOtkazati(rezervacija: Rezervacija) {
    const datum = new Date(rezervacija.datumOd)
    const razlika = (datum.getTime() - this.datum.getTime()) / (24 * 60 * 60 * 1000)
    return razlika > 1
  }
}
