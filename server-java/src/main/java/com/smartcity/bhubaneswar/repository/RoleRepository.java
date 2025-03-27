package com.smartcity.bhubaneswar.repository;

import com.smartcity.bhubaneswar.model.ERole;
import com.smartcity.bhubaneswar.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}