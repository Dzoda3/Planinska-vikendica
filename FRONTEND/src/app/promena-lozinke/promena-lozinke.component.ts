import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../servisi/korisnik.service';
import { Korisnik } from '../modeli/korisnik';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promena-lozinke',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './promena-lozinke.component.html',
  styleUrl: './promena-lozinke.component.css'
})
export class PromenaLozinkeComponent {
  staraLozinka: string = ''
  novaLozinka: string = ''
  potvrdaNoveLozinke: string = ''

  korisnik: Korisnik = new Korisnik()
  greska: string = ''
  greska1: string = ''
  greska2: string = ''
  greska3: string = ''

  ruter = inject(Router)
  korisnikServis = inject(KorisnikService)

  ngOnInit() {
    let x = localStorage.getItem("prijavljen")
    if(x != null) {
      this.korisnik = JSON.parse(x)
    }
  }

  proveraStareLozinke() {
    if(this.staraLozinka != this.korisnik.lozinka) {
      this.greska1 = "Neispravno uneta stara lozinka"
      return false
    }
    this.greska1 = ""
    return true
  }

  proveraNoveLozinke() {
    if(this.staraLozinka === this.novaLozinka) {
      this.greska2 = "Stara i nova lozinka ne smeju da budu iste"
      return false
    }

    this.greska2 = ""

    const pocetnoSlovo = /^[A-Za-z]/.test(this.novaLozinka)
    const duzina = this.novaLozinka.length >= 6 && this.novaLozinka.length <= 10
    const velikoSlovo = /[A-Z]/.test(this.novaLozinka)
    const malaSlova = (this.novaLozinka.match(/[a-z]/g) || []).length >= 3
    const broj = /\d/.test(this.novaLozinka)
    const specijalanKarakter = /[!@#$%^&*(),.?":{}|<>_\-\[\]\\\/~`+=;'"]/g.test(this.novaLozinka)

    if(pocetnoSlovo && duzina && velikoSlovo && malaSlova && broj && specijalanKarakter) {
      if (this.novaLozinka !== this.potvrdaNoveLozinke) {
        this.greska3 = "Lozinke se ne poklapaju."
        return false
      } else {
        this.greska3 = ''
        return true
      }
    } else {
      this.greska2 = "Lozinka mora da bude duzine od 6 do 10 karaktera i da sadrzi bar jedno veliko slovo, broj, specijalni karakter i 3 mala slova"
      return false
    }
  }

  promenaLozinke() {
    if(this.proveraStareLozinke() && this.proveraNoveLozinke()) {
      this.korisnikServis.promenaLozinke(this.korisnik.korisnicko_ime, this.novaLozinka).subscribe(data => {
        if(data.poruka == "U") {
          alert("Lozinka uspesno promenjena")
          this.ruter.navigate([''])
        } else {
          this.greska = "Promena lozinke neuspesna"
        }
      })
    } else {
      this.greska = "Nisu popunjena sva polja"
    }
  }
}
