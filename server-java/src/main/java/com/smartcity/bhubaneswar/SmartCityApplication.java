package com.smartcity.bhubaneswar;

import com.smartcity.bhubaneswar.model.ERole;
import com.smartcity.bhubaneswar.model.Role;
import com.smartcity.bhubaneswar.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SmartCityApplication {

    @Autowired
    private RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(SmartCityApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            // Initialize roles if they don't exist
            if (roleRepository.count() == 0) {
                roleRepository.save(new Role(ERole.ROLE_USER));
                roleRepository.save(new Role(ERole.ROLE_ADMIN));
                System.out.println("Roles initialized");
            }
        };
    }
}