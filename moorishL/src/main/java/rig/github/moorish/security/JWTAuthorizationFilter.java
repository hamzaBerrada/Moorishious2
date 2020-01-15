package rig.github.moorish.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends OncePerRequestFilter{//checks if there is an Authorization header with the correct token. if the token is not expired or if the signature key is correct.

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		System.out.println("authoriz");
		String jwt = request.getHeader(SecurityConstant.HEADER_STRING);
		if(jwt == null || !jwt.startsWith(SecurityConstant.TOKEN_PREFIX)) {
			chain.doFilter(request, response); return;
		}
		
		Claims claims = Jwts.parser().setSigningKey(SecurityConstant.SECRECT).parseClaimsJws(jwt.replace(SecurityConstant.TOKEN_PREFIX, "")).getBody();
		String username = claims.getSubject();
		ArrayList<Map<String, String>> roles = (ArrayList<Map<String, String>>) claims.get("roles");
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		roles.forEach(r->authorities.add(new SimpleGrantedAuthority(r.get("authority"))));
		
		UsernamePasswordAuthenticationToken authenticatedUser = new UsernamePasswordAuthenticationToken(username,null, authorities);
		SecurityContextHolder.getContext().setAuthentication(authenticatedUser);//If the token is valid then the filter will add authentication data into Spring’s security context.
		chain.doFilter(request, response);
		
	}

}
