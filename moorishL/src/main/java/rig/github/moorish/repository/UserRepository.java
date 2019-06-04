package rig.github.moorish.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rig.github.moorish.model.AppUser;

public interface UserRepository extends JpaRepository<AppUser,Long> {
	
	AppUser findByEmail(String email);

}
