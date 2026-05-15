package com.example.demo.modeli;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Koder {
    public static String sifruj(String lozinka) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] sifrovanaLozinka = md.digest(lozinka.getBytes());
            return Base64.getEncoder().encodeToString(sifrovanaLozinka);
        } catch (NoSuchAlgorithmException e) {}
        return null;
    }

    public static boolean verifikujSifru(String lozinka, String hes) {
        String novHes = sifruj(lozinka);
        return novHes.equals(hes);
    }
}
