package jp.educure.attendancemanagement.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jp.educure.attendancemanagement.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms:86400000}")
    private long expirationMs;

    public String generateToken(User user) {
        // JWTに含める情報は最小限にし、subjectには一意キー(email)を設定する。
        // 発行時刻(iat)と有効期限(exp)を明示して、期限切れ判定を可能にする。
        return JWT.create()
                .withSubject(user.getEmail())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationMs))
                .sign(Algorithm.HMAC256(secret));
    }

    /**
     * トークンを検証し、有効であればsubject（email）を返す。
     * 無効な場合は null を返す。
     */
    public String validateToken(String token) {
        try {
            // 署名検証 + exp検証を行い、改ざんや期限切れトークンを弾く。
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret)).build();
            DecodedJWT decoded = verifier.verify(token);
            return decoded.getSubject();
        } catch (JWTVerificationException e) {
            // 検証失敗は例外を外へ漏らさずnullに丸め、呼び出し側で未認証扱いにする。
            return null;
        }
    }
}
