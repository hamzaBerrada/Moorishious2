package rig.github;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import rig.github.moorish.model.Role;
import rig.github.moorish.property.FileStorageProperties;
import rig.github.moorish.service.AccountService;

@SpringBootApplication
@EnableConfigurationProperties({
    FileStorageProperties.class
})
public class MoorishLApplication  implements CommandLineRunner{
	@Autowired
	private AccountService accountService;
	@Bean
	public BCryptPasswordEncoder getBCPE() {
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(MoorishLApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		accountService.saveRole(new Role(null, "ADMIN"));
		accountService.saveRole(new Role(null, "USER"));
	}

}

