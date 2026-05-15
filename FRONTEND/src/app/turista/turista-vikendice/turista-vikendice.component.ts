import { Component, inject } from '@angular/core';
import { VikendicaService } from '../../servisi/vikendica.service';
import { KorisnikService } from '../../servisi/korisnik.service';
import { Vikendica } from '../../modeli/vikendica';
import { Komentar } from '../../modeli/komentar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Korisnik } from '../../modeli/korisnik';
import { Router } from "@angular/router";
import { Ocena } from '../../modeli/ocena';

@Component({
  selector: 'app-turista-vikendice',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './turista-vikendice.component.html',
  styleUrl: './turista-vikendice.component.css'
})
export class TuristaVikendiceComponent {

  ruter = inject(Router)

  korisnikServis = inject(KorisnikService)
  vikendicaServis = inject(VikendicaService)

  korisnik: Korisnik = new Korisnik()
  vikendica: Vikendica = new Vikendica()
  vikendice: Vikendica[] = []

  slike: Map<number, String[]> = new Map<number, String[]>
  ocene: Map<number, Ocena[]> = new Map<number, Ocena[]>
  komentari: Map<number, Komentar[]> = new Map<number, Komentar[]>

  prikaz = false
  rastuceNaziv = false
  rastuceMesto = false

  naziv = ""
  mesto = ""

  ngOnInit() {
    let x = localStorage.getItem("prijavljen")
    if(x != null) {
      this.korisnik = JSON.parse(x)
    }

    this.vikendicaServis.dohvatiSve().subscribe(data => {
      this.vikendice = data;

      for(let v of this.vikendice) {
        this.vikendicaServis.dohvatiSlike(v.idV).subscribe(data => {
          this.slike.set(v.idV, data)
        })

        this.vikendicaServis.dohvatiOcene(v.idV).subscribe(data => {
          this.ocene.set(v.idV, data)
        })

        this.vikendicaServis.dohvatiKomentare(v.idV).subscribe(data => {
          this.komentari.set(v.idV, data)
        })
      }
    })
  }

  sortiraj(kolona: number) {
    if(kolona == 0) {
      this.rastuceNaziv = !this.rastuceNaziv
      this.rastuceMesto = false

      this.vikendice.sort((a, b) => {
        if(a.naziv > b.naziv) {
          return this.rastuceNaziv ? 1 : -1;
        } else if(a.naziv < b.naziv) {
          return this.rastuceNaziv ? -1 : 1;
        } else {
          return 0;
        }
      })
    } else {
      this.rastuceMesto = !this.rastuceMesto
      this.rastuceNaziv = false

      this.vikendice.sort((a, b) => {
        if(a.naziv > b.naziv) {
          return this.rastuceMesto ? 1 : -1;
        } else if(a.naziv < b.naziv) {
          return this.rastuceMesto ? -1 : 1;
        } else {
          return 0;
        }
      })
    }
  }

  filtriraj(naziv: string, mesto: string) {
    this.vikendicaServis.filtriraj(naziv, mesto).subscribe(data => {
      this.vikendice = data
    })
  }

  zvezde(idV: number) {
    const ocene = this.ocene.get(idV)
    if(ocene == undefined) {
      return [
        ...Array(0).fill('pune'),
        ...Array(5).fill('prazne')
      ];
    }

    let srednjaOcena = 0
    const n = ocene?.length

    for(let ocena of ocene) {
      srednjaOcena += ocena.ocena
    }

    const ocena = srednjaOcena / n;

    const pune = Math.floor(ocena);
    const prazne = 5 - pune;

    return [
      ...Array(pune).fill('pune'),
      ...Array(prazne).fill('prazne')
    ];
  }

  prikazi(vikendica: Vikendica) {
    this.prikaz = true
    this.vikendica = vikendica
  }

  proveriMesec() {
    const mesec = new Date().getMonth()
    return mesec >= 4 && mesec <= 7;
  }

  rezervisi(vikendica: Vikendica) {
    localStorage.setItem("vikendica", JSON.stringify(vikendica));
    this.ruter.navigate(['/rezervisanje'])
  }
}
