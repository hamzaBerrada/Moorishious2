package rig.github.moorish.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rig.github.moorish.model.AppUser;
import rig.github.moorish.model.RegisterForm;
import rig.github.moorish.service.AccountService;

@RestController
public class AccountRestController {

	@Autowired
	private AccountService accountService;
	
	@PostMapping("/register")
	public AppUser register(@RequestBody RegisterForm userForm) {
		//if(!userForm.getPassword().equals(userForm.getRepassword())) throw new RuntimeException("you must confirm your password");
		AppUser user = accountService.findUserByEmail(userForm.getEmail());
		if(user != null) throw new RuntimeException("this user already exist");
		AppUser appUser = new AppUser();
		appUser.setEmail(userForm.getEmail());
		appUser.setPassword(userForm.getPassword());
		accountService.saveUser(appUser);
		accountService.addRoleToUser(userForm.getEmail(), "USER");
		System.out.println("correct auth");
		return appUser;
	}
	
	@PostMapping("/completeRegister")
	public AppUser completeRegister(@RequestBody AppUser userForm) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		AppUser user = new AppUser();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
			user = accountService.findUserByEmail((String)auth.getPrincipal());
			user.setFirstName(userForm.getFirstName());
			user.setLastName(userForm.getLastName());
			user.setAddress(userForm.getAddress());
			user.setCity(userForm.getCity());
			user.setCountry(userForm.getCountry());
			user.setPostalCode(userForm.getPostalCode());
			user.setPhone(userForm.getPhone());
			accountService.saveUser(user);
		}
		else System.out.println("**AnonymousAuthenticationToken**");
		
		return user;
	}
	
}
