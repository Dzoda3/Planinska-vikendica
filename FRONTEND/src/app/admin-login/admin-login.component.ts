import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../servisi/korisnik.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  korisnikServis = inject(KorisnikService)

  ruter = inject(Router)

  kor_ime: string = ""
  sifra: string = ""
  greska: string = ""


  login() {
    if (this.kor_ime == "") {
      this.greska = "Nije uneto korisnicko ime"
    }
    else if (this.sifra == "") {
      this.greska = "Nije uneta lozinka"
    }
    else {
      this.korisnikServis.prijava(this.kor_ime, this.sifra, "admin").subscribe(data => {
        if (data == null) {
          this.greska = "Korisnik ne postoji"
        } else {
          localStorage.setItem("prijavljen", JSON.stringify(data));
          if (data) {
            this.ruter.navigate(["/admin"])
          } else {
            this.greska = "Korisnik ne postoji"
          }
        }
      });
    }
  }
}
