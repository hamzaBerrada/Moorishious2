package rig.github.moorish.web;


import org.springframework.beans.factory.annotation.Autowired;
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
		if(!userForm.getPassword().equals(userForm.getRepassword())) throw new RuntimeException("you must confirm your password");
		AppUser user = accountService.findUserByEmail(userForm.getEmail());
		if(user != null) throw new RuntimeException("this user alrady exist");
		AppUser appUser = new AppUser();
		appUser.setEmail(userForm.getEmail());
		appUser.setPassword(userForm.getPassword());
		accountService.saveUser(appUser);
		accountService.addRoleToUse(userForm.getEmail(), "USER");
		return appUser;
	}
	
}
