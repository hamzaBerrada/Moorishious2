package rig.github.moorish.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rig.github.moorish.model.AppUser;
import rig.github.moorish.model.Reference;
import rig.github.moorish.model.RegisterForm;
import rig.github.moorish.service.AccountService;
import rig.github.moorish.service.ProductService;

@RestController
public class AccountRestController {

	@Autowired
	private AccountService accountService;
	
	@Autowired
	private ProductService defaultProductService;
	
	@PostMapping("/register")
	public AppUser register(@RequestBody RegisterForm userForm) {
		//if(!userForm.getPassword().equals(userForm.getRepassword())) throw new RuntimeException("you must confirm your password");
		AppUser user = accountService.findUserByEmail(userForm.getEmail());
		if(user != null) throw new RuntimeException("this user alrady exist");
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
			User springUser = (User) auth.getPrincipal(); //the spring user found : anonymousUser
			System.out.println("the spring user found : "+ springUser.getUsername());
			user = accountService.findUserByEmail(springUser.getUsername());
		}
		else System.out.println("AnonymousAuthenticationToken **********");
		user.setFirstName(userForm.getFirstName());
		System.out.println("before completed registration"+ user.getFirstName());
		accountService.saveUser(user);
		System.out.println("completed registration");
		return user;
	}
	
}
