import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Korisnik } from '../modeli/korisnik';
import { Poruka } from '../modeli/poruka';
import { Rezervacija } from '../modeli/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor() { }

  url = 'http://localhost:8080/korisnici'
  http = inject(HttpClient)

  prijava(kor_ime: string, sifra: string, tip: string) {
    const data = {
      korisnicko_ime: kor_ime,
      lozinka: sifra,
      tip: tip
    }
    return this.http.post<Korisnik>(`${this.url}/prijava`, data)
  }

  registracija(korisnicko_ime: string, lozinka: string, ime: string, prezime: string, tip: string, pol: string, adresa: string, telefon: string, mejl: string, slika: string, kartica: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      tip: tip,
      pol: pol,
      adresa: adresa,
      telefon: telefon,
      mejl: mejl,
      slika: slika,
      kartica: kartica,
    }
    return this.http.post<Poruka>(`${this.url}/registracija`, data)
  }

  promenaLozinke(korisnicko_ime: string, lozinka: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka
    }
    return this.http.post<Poruka>(`${this.url}/promenaLozinke`, data)
  }

  brojVlasnika() {
    return this.http.get<number>(`${this.url}/brojVlasnika`)
  }

  brojTurista() {
    return this.http.get<number>(`${this.url}/brojTurista`)
  }

  azuriraj(korisnicko_ime: string, ime: string, prezime: string, adresa: string, telefon: string, mejl: string, slika: string, kartica: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      mejl: mejl,
      slika: slika,
      kartica: kartica
    }
    return this.http.post<Poruka>(`${this.url}/azuriraj`, data)
  }

  dohvatiRezervacije(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post<Rezervacija[]>(`${this.url}/dohvatiRezervacije`, data)
  }

  dohvatiSve() {
    return this.http.get<Korisnik[]>(`${this.url}/dohvatiSve`)
  }

  deaktiviraj(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post<Poruka>(`${this.url}/deaktiviraj`, data)
  }

  dohvatiRegistracije() {
    return this.http.get<Korisnik[]>(`${this.url}/dohvatiRegistracije`)
  }

  prihvati(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post<Poruka>(`${this.url}/prihvati`, data)
  }

  odbij(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post<Poruka>(`${this.url}/odbij`, data)
  }

  adminAzuriraj(korisnicko_ime: string, korisnicko_ime_n: string, lozinka: string, ime: string, prezime: string, tip: string, pol: string, adresa: string, telefon: string, mejl: string, slika: string, kartica: string) {
    const data = {
      korisnicko_ime: korisnicko_ime_n,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      tip: tip,
      pol: pol,
      adresa: adresa,
      telefon: telefon,
      mejl: mejl,
      slika: slika,
      kartica: kartica
    }
    return this.http.post<Poruka>(`${this.url}/adminAzuriraj/${korisnicko_ime}`, data)
  }
}
