package jp.educure.attendancemanagement.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.educure.attendancemanagement.service.JwtService;
import lombok.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    // UserDetailsServiceは通常DIで受け取り、JWT検証後のユーザー解決に利用する。
    public JwtAuthFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // AuthorizationヘッダからBearerトークンを取り出す。
        // ここでBearer形式でなければJWT認証対象外として素通しする。
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // "Bearer " の7文字を除いた実トークン文字列を取得。
        String token = authHeader.substring(7);

        // トークンの署名/有効期限を検証し、正常な場合のみsubject(email)を取り出す。
        // 失敗時はnullが返るため、認証情報をセットしない。
        String email = jwtService.validateToken(token);

        // SecurityContextが未設定の時だけ認証情報を投入する。
        // 既に他経路で認証済みの場合は上書きしない。
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // JWTのsubject(email)からUserDetailsを引き直し、現在の権限情報を反映する。
            var userDetails = userDetailsService.loadUserByUsername(email);

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            // IPやSession IDなどのリクエストメタ情報をAuthentication detailsへ格納する。
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // 認証成否にかかわらず後続フィルタへ処理を渡す。
        filterChain.doFilter(request, response);
    }
}

