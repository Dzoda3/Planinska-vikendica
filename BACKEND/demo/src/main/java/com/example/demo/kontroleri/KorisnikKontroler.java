package com.example.demo.kontroleri;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.db.KorisnikRepo;
import com.example.demo.modeli.Korisnik;
import com.example.demo.modeli.Poruka;
import com.example.demo.modeli.Rezervacija;

@RestController
@RequestMapping("/korisnici")
@CrossOrigin(origins = "http://localhost:4200")
public class KorisnikKontroler {

    @PostMapping("/prijava")
    public Korisnik prijava(@RequestBody Korisnik korisnik) {
        return new KorisnikRepo().prijava(korisnik);
    }

    @PostMapping("/registracija")
    public Poruka registracija(@RequestBody Korisnik korisnik){
        return new KorisnikRepo().registracija(korisnik);
    }

    @PostMapping("/promenaLozinke")
    public Poruka promenaLozinke(@RequestBody Korisnik korisnik) {
        return new KorisnikRepo().promenaLozinke(korisnik);
    }

    @GetMapping("/brojVlasnika")
    public int brojVlasnika() {
        return new KorisnikRepo().brojVlasnika();
    }

    @GetMapping("/brojTurista")
    public int brojTurista() {
        return new KorisnikRepo().brojTurista();
    }
    
    @PostMapping("/azuriraj")
    public Poruka azuriraj(@RequestBody Korisnik korisnik) {
        return new KorisnikRepo().azuriraj(korisnik);
    }

    @PostMapping("/dohvatiRezervacije")
    public List<Rezervacija> dohvatiRezervacije(@RequestBody Korisnik korisnik) {
        return new KorisnikRepo().dohvatiRezervacije(korisnik);
    }

    @GetMapping("/dohvatiSve")
    public List<Korisnik> dohvatiSve() {
        return new KorisnikRepo().dohvatiSve();
    }

    @PostMapping("/deaktiviraj")
    public Poruka deaktiviraj(@RequestBody Korisnik korisnik) {
        return new KorisnikRepo().deaktiviraj(korisnik);
    }

    @GetMapping("/dohvatiRegistracije")
    public List<Korisnik> dohvatiRegistracije() {
        return new KorisnikRepo().dohvatiRegistracije();
    }

    @PostMapping("/prihvati")
    public Poruka prihvati(@RequestBody Korisnik korisnik) {
        return new KorisnikRepo().prihvati(korisnik);
    }

    @PostMapping("/odbij")
    public Poruka odbij(@RequestBody Korisnik korisnik) {
        return new KorisnikRepo().odbij(korisnik);
    }

    @PostMapping("/adminAzuriraj/{korisnicko_ime}")
    public Poruka adminAzuriraj(@RequestBody Korisnik korisnik, @PathVariable String korisnicko_ime) {
        return new KorisnikRepo().adminAzuriraj(korisnik, korisnicko_ime);
    }
}