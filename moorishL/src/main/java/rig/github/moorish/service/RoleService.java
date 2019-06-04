package rig.github.moorish.service;

import java.util.List;
import java.util.Optional;

import rig.github.moorish.model.Role;
import rig.github.moorish.model.AppUser;

public interface RoleService {

	List<Role> getAllRoles();

	List<AppUser> getAllUsers();

	Optional<Role> getRole(Long id);

	Optional<AppUser> getUser(Long id);

	boolean addOrUpdateRole(Role role);

	boolean addOrUpdateUser(AppUser user);

	void deleteRole(Long id);

	void deleteUser(Long id);

}
