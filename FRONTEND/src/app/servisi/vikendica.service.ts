import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Vikendica } from '../modeli/vikendica';
import { Poruka } from '../modeli/poruka';
import { Rezervacija } from '../modeli/rezervacija';
import { Komentar } from '../modeli/komentar';
import { Ocena } from '../modeli/ocena';

@Injectable({
  providedIn: 'root'
})
export class VikendicaService {

  constructor() { }

  url = 'http://localhost:8080/vikendice'
  http = inject(HttpClient)

  dohvatiSve() {
    return this.http.get<Vikendica[]>(`${this.url}/dohvatiSve`)
  }

  filtriraj(naziv: string, mesto: string) {
    const data = {
      naziv: naziv,
      mesto: mesto
    }
    return this.http.post<Vikendica[]>(`${this.url}/filtriraj`, data)
  }

  brojVikendica() {
    return this.http.get<number>(`${this.url}/brojVikendica`)
  }

  dohvatiVikendicu(idV: number) {
    const data = {
      idV: idV
    }
    return this.http.post<Vikendica>(`${this.url}/dohvatiVikendicu`, data)
  }

  dohvatiMoje(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post<Vikendica[]>(`${this.url}/dohvatiMoje`, data)
  }

  azuriraj(idV: number, naziv: string, mesto: string, usluge: string, letnjaCena: number, zimskaCena: number, telefon: string) {
    const data = {
      idV: idV,
      naziv: naziv,
      mesto: mesto,
      usluge: usluge,
      letnjaCena: letnjaCena,
      zimskaCena: zimskaCena,
      telefon: telefon,
    }
    return this.http.post<Poruka>(`${this.url}/azuriraj`, data)
  }

  obrisi(idV: number) {
    const data = {
      idV: idV
    }
    return this.http.post<Poruka>(`${this.url}/obrisi`, data)
  }

  dodaj(naziv: string, mesto: string, usluge: string, letnjaCena: number, zimskaCena: number, telefon: string, korisnicko_ime: string) {
    const data = {
      naziv: naziv,
      mesto: mesto,
      usluge: usluge,
      letnjaCena: letnjaCena,
      zimskaCena: zimskaCena,
      telefon: telefon,
    }
    return this.http.post<Poruka>(`${this.url}/dodaj/${korisnicko_ime}`, data)
  }

  dohvatiRezervacije(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }
    return this.http.post<Rezervacija[]>(`${this.url}/dohvatiRezervacije`, data)
  }

  potvrdi(rezervacija: Rezervacija) {
    const data = {
      idR: rezervacija.idR
    }
    return this.http.post<Poruka>(`${this.url}/potvrdi`, data)
  }

  odbij(rezervacija: Rezervacija, komentar: string) {
    return this.http.post<Poruka>(`${this.url}/odbij/${rezervacija.idR}`, komentar)
  }

  otkazi(rezervacija: Rezervacija) {
    const data = {
      idR: rezervacija.idR
    }
    return this.http.post<Poruka>(`${this.url}/otkazi`, data)
  }

  dohvatiSlike(idV: number) {
    const data = {
      idV: idV
    }
    return this.http.post<String[]>(`${this.url}/dohvatiSlike`, data)
  }

  dohvatiOcene(idV: number) {
    const data = {
      idV: idV
    }
    return this.http.post<Ocena[]>(`${this.url}/dohvatiOcene`, data)
  }

  dohvatiKomentare(idV: number) {
    const data = {
      idV: idV
    }
    return this.http.post<Komentar[]>(`${this.url}/dohvatiKomentare`, data)
  }

  zauzeto(idV: number, datumOd: Date, datumDo: Date) {
    const data = {
      idV: idV,
      datumOd: datumOd,
      datumDo: datumDo
    }
    return this.http.post<Poruka>(`${this.url}/zauzeto`, data)
  }

  rezervisi(idV: number, korisnicko_ime: string, datumOd: Date, datumDo: Date, odrasli: number, deca: number, rezervisan: Date) {
    const data = {
      idV: idV,
      korisnicko_ime: korisnicko_ime,
      datumOd: datumOd,
      datumDo: datumDo,
      odrasli: odrasli,
      deca: deca,
      rezervisan: rezervisan
    }
    return this.http.post<Poruka>(`${this.url}/rezervisi`, data)
  }

  dohvati30() {
    return this.http.get<number>(`${this.url}/dohvati30`)
  }

  dohvati7() {
    return this.http.get<number>(`${this.url}/dohvati7`)
  }

  dohvati24() {
    return this.http.get<number>(`${this.url}/dohvati24`)
  }
}
