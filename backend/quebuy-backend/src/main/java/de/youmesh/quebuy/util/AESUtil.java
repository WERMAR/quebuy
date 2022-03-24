package de.youmesh.quebuy.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.youmesh.quebuy.api.data.UserRestData;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

public class AESUtil<T> {
    private final String SECRET_KEY_STRING = "v8y/B?E(H+MbQeThWmZq4t7w9z$C&F)J";
    private SecretKeySpec secretKey;

    private void getSecretKey() throws NoSuchAlgorithmException {
        this.secretKey = new SecretKeySpec(SECRET_KEY_STRING.getBytes(StandardCharsets.UTF_8), "AES");
    }

    public String encrypt(T data) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        return Base64.getEncoder().encodeToString(cipher.doFinal(data.toString().getBytes(StandardCharsets.UTF_8)));
    }

    public T decrypt(String data) throws NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, JsonProcessingException, InvalidKeyException {
        getSecretKey();
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        String jsonDataString = new String(cipher.doFinal(Base64.getDecoder().decode(data)));
        ObjectMapper objectMapper = new ObjectMapper();
        UserRestData map = objectMapper.readValue(jsonDataString, UserRestData.class);
        return null;
    }

}
