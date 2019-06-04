package rig.github.moorish.service.impl;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import rig.github.moorish.model.Role;
import rig.github.moorish.model.AppUser;
import rig.github.moorish.repository.RoleRepository;
import rig.github.moorish.repository.UserRepository;
import rig.github.moorish.service.AccountService;

@Service
@Transactional
public class AccountServiceImpl implements AccountService{
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public Optional<AppUser> saveUser(AppUser user) {
		String hashPW = bCryptPasswordEncoder.encode(user.getPassword());
		user.setPassword(hashPW);
		return Optional.ofNullable(userRepository.save(user));
	}

	@Override
	public Optional<Role> saveRole(Role role) {
		return Optional.ofNullable(roleRepository.save(role));
	}

	@Override
	public void addRoleToUse(String email, String name) {
		AppUser appUser = userRepository.findByEmail(email);
		Role appRole = roleRepository.findByName(name);
		appRole.setName(name);
		appUser.getRoles().add(appRole);
	}

	@Override
	public AppUser findUserByEmail(String email) {
		return userRepository.findByEmail(email);
		
	}

}
