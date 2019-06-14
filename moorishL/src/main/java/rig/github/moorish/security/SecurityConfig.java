package rig.github.moorish.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("securityConfig");
        http.headers().frameOptions().disable();//pour faire fonctionner h2, sinon enlever cette ligne completement
		http.csrf().disable();//sinon il faut que l'app elle meme envoie la requete sinon une requete d'une autre app ou domaine sera rejete (attaque csrf)
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//		http.formLogin().loginPage("/login").and().logout().logoutUrl("/logout");
		http.authorizeRequests().antMatchers("/login/**","/register/**","/logout/**","/addReference/**",
				"/listReference/**","/uploadFile/**","/uploadMultipleFiles/**","/downloadFile/**","/deleteReference/**",
				"/categoryReference/**","/h2/**","/subCategory/**","/getPaid/**").permitAll();
		http.authorizeRequests().anyRequest().permitAll();
		http.addFilterBefore(new CorsResponseFilter(),  UsernamePasswordAuthenticationFilter.class);
		http.addFilter(new JWTAuthenticationFilter(authenticationManager()));
		http.addFilterBefore(new JWTAuthorizationFilter(), CorsResponseFilter.class);
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
		
		
	}
}
