package rig.github.moorish.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rig.github.moorish.model.AppUser;
import rig.github.moorish.model.Role;
import rig.github.moorish.repository.RoleRepository;
import rig.github.moorish.repository.UserRepository;
import rig.github.moorish.service.RoleService;

@Service
public class DefaultRoleService implements RoleService{
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private UserRepository userRepo;


	public List<Role> getAllRoles() {
		return roleRepo.findAll();
	}

	public List<AppUser> getAllUsers() {
		return userRepo.findAll();
	}

	public Optional<Role> getRole(Long id) {
		return roleRepo.findById(id);
	}

	public Optional<AppUser> getUser(Long id) {
		return  userRepo.findById(id);
	}

	@Transactional
	public boolean addOrUpdateRole(Role role) {
		return roleRepo.save(role) != null;
	}

	@Transactional
	public boolean addOrUpdateUser(AppUser user) {
		return userRepo.save(user) != null;
	}

	@Transactional
	public void deleteRole(Long id) {
		try {
			roleRepo.deleteById(id);
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
		
	}
	@Transactional
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
		try {
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
	}


}
