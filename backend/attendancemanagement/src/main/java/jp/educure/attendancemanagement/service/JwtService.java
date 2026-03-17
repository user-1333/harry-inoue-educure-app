package jp.educure.attendancemanagement.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jp.educure.attendancemanagement.entity.User;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET = "secret-key";

    public String generateToken(User user) {
        return JWT.create()
                .withSubject(user.getEmail())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 86400000))
                .sign(Algorithm.HMAC256(SECRET));
    }

    /**
     * トークンを検証し、有効であればsubject（email）を返す。
     * 無効な場合は null を返す。
     */
    public String validateToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
            DecodedJWT decoded = verifier.verify(token);
            return decoded.getSubject();
        } catch (JWTVerificationException e) {
            return null;
        }
    }
}
