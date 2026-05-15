import { Component, inject } from '@angular/core';
import { TuristaProfilComponent } from "../turista-profil/turista-profil.component";
import { LogoutComponent } from "../../logout/logout.component";
import { TuristaVikendiceComponent } from "../turista-vikendice/turista-vikendice.component";
import { TuristaRezervacijeComponent } from "../turista-rezervacije/turista-rezervacije.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [LogoutComponent, TuristaProfilComponent, TuristaVikendiceComponent, TuristaRezervacijeComponent],
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.css'
})
export class TuristaComponent {
  profil = true
  vikendice = false
  rezervacije = false

  ruter = inject(Router)

  prikaziProfil() {
    this.profil = true
    this.vikendice = false
    this.rezervacije = false
  }

  prikaziVikendice() {
    this.vikendice = true
    this.profil = false
    this.rezervacije = false
  }

  prikaziRezervacije() {
    this.rezervacije = true
    this.profil = false
    this.vikendice = false
  }

  promenaLozinke() {
    this.ruter.navigate(['/promenaLozinke'])
  }
}
