import { Component, inject } from '@angular/core';
import { LogoutComponent } from "../../logout/logout.component";
import { VlasnikProfilComponent } from "../vlasnik-profil/vlasnik-profil.component";
import { VlasnikVikendiceComponent } from "../vlasnik-vikendice/vlasnik-vikendice.component";
import { VlasnikRezervacijeComponent } from "../vlasnik-rezervacije/vlasnik-rezervacije.component";
import { Router } from "@angular/router";
import { KorisnikService } from '../../servisi/korisnik.service';
import { VikendicaService } from '../../servisi/vikendica.service';
import { Korisnik } from '../../modeli/korisnik';

@Component({
  selector: 'app-vlasnik',
  standalone: true,
  imports: [LogoutComponent, VlasnikProfilComponent, VlasnikVikendiceComponent, VlasnikRezervacijeComponent],
  templateUrl: './vlasnik.component.html',
  styleUrl: './vlasnik.component.css'
})
export class VlasnikComponent {
  profil = true
  pokaziVikendice = false
  rezervacije = false

  ruter = inject(Router)

  korisnikServis = inject(KorisnikService)
  vikendicaServis = inject(VikendicaService)

  korisnik: Korisnik = new Korisnik()

  ngOnInit() {
    let x = localStorage.getItem("prijavljen")
    if(x != null) {
      this.korisnik = JSON.parse(x)
    }

    this.vikendicaServis.dohvatiMoje(this.korisnik.korisnicko_ime).subscribe(data => {
      localStorage.setItem("vikendice", JSON.stringify(data))
    })
  }

  prikaziProfil() {
    this.profil = true
    this.pokaziVikendice = false
    this.rezervacije = false
  }

  prikaziVikendice() {
    this.pokaziVikendice = true
    this.profil = false
    this.rezervacije = false
  }

  prikaziRezervacije() {
    this.rezervacije = true
    this.profil = false
    this.pokaziVikendice = false
  }

  promenaLozinke() {
    this.ruter.navigate(['/promenaLozinke'])
  }
}
