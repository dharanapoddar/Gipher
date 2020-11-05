package com.stackroute.giphermanager.service;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class MockTokenAuthenticationService {

	private static final long serialVersionUID = -2550185165626007488L;

	public static final long EXPIRATIONTIME = 5 * 60 * 60;

//	@Value("${jwt.secret}")
//	private String SECRET;


	  
	    static final String SECRET = "dpgipher";
	    static final String TOKEN_PREFIX = "Bearer";
	    static final String HEADER_STRING = "Authorization";

	    public static void addAuthentication(HttpServletResponse res, String username) {

	        String jwt = createToken(username);

	        res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + jwt);
	    }

	    public static Authentication getAuthentication(HttpServletRequest request) {
	        String token = request.getHeader(HEADER_STRING);
	        if (token != null) {
	            // parse the token.
	            String user = Jwts.parser()
	                    .setSigningKey(SECRET)
	                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
	                    .getBody()
	                    .getSubject();

	            return user != null ?
	                    new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()) :
	                        null;
	        }
	        return null;
	    }

	    public static String createToken(String username) {
			Map<String, Object> claims = new HashMap<>();
			return doGenerateToken(claims, username);
		}
	    

	    
	    private static String doGenerateToken(Map<String, Object> claims, String subject) {

			return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
					.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME * 1000))
					.signWith(SignatureAlgorithm.HS512, SECRET).compact();
		}
	
	
}
