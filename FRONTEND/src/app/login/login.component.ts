import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../servisi/korisnik.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Vikendica } from '../modeli/vikendica';
import { VikendicaService } from '../servisi/vikendica.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  korisnikServis = inject(KorisnikService)
  vikendicaServis = inject(VikendicaService)
  ruter = inject(Router)

  kor_ime: string = ""
  sifra: string = ""
  tip: string = ""
  greska: string = ""

  brVikendica = 0
  brVlasnika = 0
  brTurista = 0

  rez24 = 0
  rez7 = 0
  rez30 = 0

  vikendice: Vikendica[] = []
  rastuceNaziv = false
  rastuceMesto = false

  naziv = ""
  mesto = ""

  ngOnInit() {
    this.vikendicaServis.brojVikendica().subscribe(data => {
      this.brVikendica = data
    })

    this.korisnikServis.brojVlasnika().subscribe(data => {
      this.brVlasnika = data
    })

    this.korisnikServis.brojTurista().subscribe(data => {
      this.brTurista = data
    })

    this.vikendicaServis.dohvatiSve().subscribe(data => {
      this.vikendice = data
    })

    this.vikendicaServis.dohvati24().subscribe(data => {
      this.rez24 = data
    })

    this.vikendicaServis.dohvati7().subscribe(data => {
      this.rez7 = data
    })

    this.vikendicaServis.dohvati30().subscribe(data => {
      this.rez30 = data
    })
  }

  login() {
    if (this.kor_ime == "") {
      this.greska = "Nije uneto korisnicko ime"
    }
    else if (this.sifra == "") {
      this.greska = "Nije uneta lozinka"
    }
    else if (this.tip == "") {
      this.greska = "Nije unet tip"
    }
    else {
      this.korisnikServis.prijava(this.kor_ime, this.sifra, this.tip).subscribe(data => {
        if (data == null) {
          this.greska = "Korisnik ne postoji"
        } else if(data.deaktiviran == 1) {
          this.greska = "Korisnik deaktiviran"
        } else {
          localStorage.setItem("prijavljen", JSON.stringify(data));
          if (data.tip == "turista") {
            this.ruter.navigate(["/turista"])
          } else if(data.tip == "vlasnik") {
            this.ruter.navigate(["/vlasnik"])
          } else {
            this.greska = "Nepoznat tip korisnika"
          }
        }
      })
    }
  }

  registracija() {
    this.ruter.navigate(["/registracija"])
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

  filtriraj(naziv: string, mesto:string) {
    this.vikendicaServis.filtriraj(naziv, mesto).subscribe(data => {
      this.vikendice = data
    })
  }
}
