package de.youmesh.quebuy.api.security.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import de.youmesh.quebuy.conf.annotations.Util;

import java.nio.charset.StandardCharsets;

@Util
public class TokenHandler {

    public Algorithm getAlgorithm() {
        return Algorithm.HMAC256("secret".getBytes(StandardCharsets.UTF_8));
    }

    public JWTVerifier getJWTVerifier() {
        return JWT.require(getAlgorithm()).build();
    }

    public DecodedJWT getDecodedJWT(String token) {
        return getJWTVerifier().verify(token);
    }
}
