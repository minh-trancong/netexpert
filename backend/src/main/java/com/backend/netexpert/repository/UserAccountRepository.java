package com.backend.netexpert.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.netexpert.entity.UserAccount;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Integer>{

    boolean existsByUsername(String username);

    Optional<UserAccount> findByUsername(String username);
} 