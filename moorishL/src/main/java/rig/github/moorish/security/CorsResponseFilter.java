package rig.github.moorish.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;



public class CorsResponseFilter extends OncePerRequestFilter {

  public final static String DEFAULT_ALLOWED_HEADERS = "origin,accept,content-type, X-Requested-with, Access-Control-Request-Method, Access-Control-Request-Method, Access-Control-Request-Headers, authorization";
  public final static String DEFAULT_EXPOSED_HEADERS = "location,info, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, authorization";


@Override
@CrossOrigin(value= {"*"},exposedHeaders= {"Content-Disposition"})
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
		throws ServletException, IOException {
	System.out.println("corsResponding");
	response.addHeader("Access-Control-Allow-Origin", "*");
	response.addHeader("Access-Control-Allow-Headers", DEFAULT_ALLOWED_HEADERS);
	response.addHeader("Access-Control-Expose-Headers", DEFAULT_EXPOSED_HEADERS);
	chain.doFilter(request, response);
	
}

}
