package rig.github.moorish.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rig.github.moorish.model.AppUser;
import rig.github.moorish.repository.UserRepository;
import rig.github.moorish.service.exceptions.JwtSecurityException;

@Service
public class AuthenticationService {

	@Autowired
	UserRepository userRepository;

	public Optional<AppUser> login(String email, String password) {
		AppUser user = userRepository.findByEmail(email);
		if (user != null) {
			if (user.getPassword().equals(password)) {
				return Optional.of(user);
			}
		}
		throw new JwtSecurityException("user not found");
	}

}
