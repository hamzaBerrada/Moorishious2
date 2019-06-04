package rig.github.moorish.service;

import java.util.Optional;

import rig.github.moorish.model.Role;
import rig.github.moorish.model.AppUser;

public interface AccountService {
	public Optional<AppUser> saveUser(AppUser user);
	public Optional<Role> saveRole(Role role);
	public void addRoleToUse(String email, String name);
	public AppUser findUserByEmail(String email); 
}
