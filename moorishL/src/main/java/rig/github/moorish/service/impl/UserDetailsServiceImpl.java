package rig.github.moorish.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import rig.github.moorish.model.AppUser;
import rig.github.moorish.service.AccountService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	@Autowired
	private AccountService accountService;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		//System.out.println(email);
		AppUser appUser = accountService.findUserByEmail(email);
		
		System.out.println(appUser.getEmail());
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		appUser.getRoles().forEach(r->{
			authorities.add(new SimpleGrantedAuthority(r.getName()));
		});
		
		return new User(appUser.getEmail(),appUser.getPassword(), authorities);
	}

}
