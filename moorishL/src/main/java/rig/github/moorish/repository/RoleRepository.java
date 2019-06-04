package rig.github.moorish.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import rig.github.moorish.model.Role;


public interface RoleRepository extends JpaRepository<Role,Long>{
	
	public Role findByName(String name);
}
