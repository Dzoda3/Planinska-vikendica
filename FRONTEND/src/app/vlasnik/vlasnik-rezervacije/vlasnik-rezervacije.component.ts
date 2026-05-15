import { Component, inject } from '@angular/core';
import { KorisnikService } from '../../servisi/korisnik.service';
import { VikendicaService } from '../../servisi/vikendica.service';
import { Korisnik } from '../../modeli/korisnik';
import { Vikendica } from '../../modeli/vikendica';
import { Rezervacija } from '../../modeli/rezervacija';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-vlasnik-rezervacije',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './vlasnik-rezervacije.component.html',
  styleUrl: './vlasnik-rezervacije.component.css'
})
export class VlasnikRezervacijeComponent {
  korisnikServis = inject(KorisnikService)
  vikendicaServis = inject(VikendicaService)

  korisnik: Korisnik = new Korisnik()
  vikendice: Vikendica[] = []
  rezervacije: Rezervacija[] = []

  ngOnInit() {
    let x = localStorage.getItem("prijavljen")
    if(x != null) {
      this.korisnik = JSON.parse(x)
    }

    x = localStorage.getItem("vikendice")
    if(x != null) {
      this.vikendice = JSON.parse(x)
    }

    this.vikendicaServis.dohvatiRezervacije(this.korisnik.korisnicko_ime).subscribe(data => {
      this.rezervacije = data
      this.rezervacije.sort((a, b) => {
        const datumA = new Date(a.datumOd)
        const datumB = new Date(b.datumOd)
        return datumA.getTime() - datumB.getTime()
      })
    })
  }

  potvrdi(rezervacija: Rezervacija) {
    this.vikendicaServis.potvrdi(rezervacija).subscribe(data => {
      if(data.poruka == "U") {
        alert("Rezervacija prihvacena")
        this.ngOnInit()
      } else {
        alert("Greska")
      }
    })
  }

  odbij(rezervacija: Rezervacija) {
    const komentar = prompt('Komentar:');
    if (!komentar || komentar.trim().length == 0) {
      alert('Komentar je obavezan!');
      return;
    }
    this.vikendicaServis.odbij(rezervacija, komentar).subscribe(data => {
      if(data.poruka == "U") {
        alert("Rezervacija odbijena")
        this.ngOnInit()
      } else {
        alert("Greska")
      }
    })
  }

  nadji(rezervacija: Rezervacija) {
    const vikendica = this.vikendice.find(vikendica => vikendica.idV == rezervacija.idV)
    return vikendica?.naziv
  }
}
