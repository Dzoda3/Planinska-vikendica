import { Component, inject } from '@angular/core';
import { Korisnik } from '../../modeli/korisnik';
import { Vikendica } from '../../modeli/vikendica';
import { KorisnikService } from '../../servisi/korisnik.service';
import { VikendicaService } from '../../servisi/vikendica.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rezervisanje',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rezervisanje.component.html',
  styleUrl: './rezervisanje.component.css'
})
export class RezervisanjeComponent {

  korisnik: Korisnik = new Korisnik()
  vikendica: Vikendica = new Vikendica()

  korisnikServis = inject(KorisnikService)
  vikendicaServis = inject(VikendicaService)

  ruter = inject(Router)

  visa: string = "data:image/png;base64,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"
  mastercard: string = "data:image/png;base64,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"
  diners: string = "data:image/png;base64,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"

  ngOnInit() {
    let x = localStorage.getItem("prijavljen")
    if(x != null) {
      this.korisnik = JSON.parse(x)
    }

    x = localStorage.getItem("vikendica")
    if(x != null) {
      this.vikendica = JSON.parse(x)
    }

    this.kartica = this.korisnik.kartica
    this.uspeh = ''
    this.greska = ''
  }

  korak = 1
  greska = ''
  uspeh = ''

  cena = 0
  cenaNocenja = 0

  datumOd = ''
  datumDo = ''
  datum: Date = new Date()

  odrasli = 1
  deca = 0

  zahtevi = ''

  nastavi() {
    this.greska = ''
    if(this.datumOd == '' || this.datumDo == '') {
      this.greska = 'Unesite datume';
      return;
    }

    const pocetak = new Date(this.datumOd);
    const kraj = new Date(this.datumDo);

    if((pocetak.getTime() - this.datum.getTime() < 0) || (kraj.getTime() - this.datum.getTime() < 0)) {
      this.greska = 'Unesite ispravan datum'
      return
    }

    if(pocetak.getHours() < 14) {
      this.greska = 'Ulazak u vikendicu je moguc od 14 casova'
      return
    }

    if(kraj.getHours() > 10) {
      this.greska = 'Izlazak iz vikendice je moguc do 10 casova'
      return
    }

    const brojDana = Math.ceil((kraj.getTime() - pocetak.getTime()) / (1000 * 60 * 60 * 24));

    if(brojDana <= 0) {
      this.greska = 'Datum zavrsetka mora biti nakon datuma pocetka';
      return;
    }

    this.vikendicaServis.zauzeto(this.vikendica.idV, pocetak, kraj).subscribe(data => {
      if(data.poruka == "N") {
        this.greska = "Vikendica zauzeta"
      }
    })

    if(this.greska == '') {
      this.cenaNocenja = pocetak.getMonth() >= 4 && pocetak.getMonth() <= 7 ? this.vikendica.letnjaCena : this.vikendica.zimskaCena
      this.cena = brojDana * this.cenaNocenja
      this.greska = '';
      this.korak = 2;
    }
  }

  nazad() {
    this.korak = 1;
  }

  potvrdiRezervaciju() {
    if(!this.validna) {
      return
    }

    if (this.zahtevi.length > 500) {
      this.greska = 'Tekst zahteva moze imati najvise 500 karaktera';
      return;
    }

    this.vikendicaServis.rezervisi(this.vikendica.idV, this.korisnik.korisnicko_ime, new Date(this.datumOd), new Date(this.datumDo), this.odrasli, this.deca, this.datum).subscribe(data => {
      if(data.poruka == "U") {
        this.uspeh = `Zakazivanje uspesno!
          Vikendica: ${this.vikendica.naziv}
          Period: ${this.datumOd} – ${this.datumDo}
          Broj gostiju: ${this.odrasli} odraslih, ${this.deca} dece.
          Картица: ${this.kartica}
          Укупна цена: ${this.cena}
          ${this.zahtevi ? 'Napomena: ' + this.zahtevi : ''}`;
      } else {
        this.greska = "Zakazivanje neuspesno"
      }
    })

  }

  povratak() {
    this.ruter.navigate(['/turista'])
  }

  kartica: string = ''
  tipKartice: string = ''
  validna: boolean = true
  poruka: string = ''

  proveraKartice() {
    const broj = this.kartica.replace(/\D/g, '')

    if (broj.length == 0) {
      this.poruka = ''
      return
    }

    if (/^(300|301|302|303|36|38)/.test(broj)) {
      this.tipKartice = 'Diners'
      this.validna = broj.length === 15
    } else if (/^(51|52|53|54|55)/.test(broj)) {
      this.tipKartice = 'MasterCard'
      this.validna = broj.length === 16
    } else if (/^(4539|4556|4916|4532|4929|4485|4716)/.test(broj)) {
      this.tipKartice = 'Visa'
      this.validna = broj.length === 16
    } else {
      this.tipKartice = ''
      this.poruka = 'Nepoznata kartica'
      return
    }

    if(this.validna) {
      this.poruka = `${this.tipKartice} — validna`
    } else {
      const potrebnaDuzina = this.tipKartice === 'Diners' ? 15 : 16
      this.poruka = `Za karticu tipa: ${this.tipKartice} je potrebno ${potrebnaDuzina} cifara (trenutno: ${broj.length})`
    }
  }
}
