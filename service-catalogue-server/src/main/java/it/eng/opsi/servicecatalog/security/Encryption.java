package it.eng.opsi.servicecatalog.security;

import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class Encryption {

  /**
   * Encode password.
   *
   * @param pwd the pwd
   * @return the string
   * @throws NoSuchAlgorithmException the no such algorithm exception
   */
  public static String encodePassword(String pwd) throws NoSuchAlgorithmException {
    // Esegue la codifica MD5
    MessageDigest md = MessageDigest.getInstance("MD5");
    md.update(pwd.getBytes());

    byte[] byteData = md.digest();

    // Conversione della password codificata in Stringa
    StringBuffer sb = new StringBuffer();
    for (int i = 0; i < byteData.length; i++) {
      sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
    }

    return sb.toString();
  }

  /**
   * Encrypt.
   *
   * @param text the text
   * @return the string
   */
  public static String encrypt(String text) {
    String encr = "";
    try {
      String key = "key1234567";
      Key aesKey = new SecretKeySpec(Arrays.copyOf(key.getBytes("UTF-8"), 16), "AES");
      Cipher cipher = Cipher.getInstance("AES");
      cipher.init(Cipher.ENCRYPT_MODE, aesKey);
      byte[] encrypted = cipher.doFinal(text.getBytes());

      encr = Base64.getEncoder().encodeToString(encrypted);

    } catch (Exception e) {
      e.printStackTrace();
    }
    return encr;
  }

  /**
   * Decrypt.
   *
   * @param encr the encr
   * @return the string
   */
  public static String decrypt(String encr) {
    String decrypted = "";
    try {
      String key = "key1234567";
      Key aesKey = new SecretKeySpec(Arrays.copyOf(key.getBytes("UTF-8"), 16), "AES");
      Cipher cipher = Cipher.getInstance("AES");

      cipher.init(Cipher.DECRYPT_MODE, aesKey);
      byte[] decode = Base64.getDecoder().decode(encr);
      decrypted = new String(cipher.doFinal(decode));

    } catch (Exception e) {
      e.printStackTrace();
    }
    return decrypted;
  }

}
