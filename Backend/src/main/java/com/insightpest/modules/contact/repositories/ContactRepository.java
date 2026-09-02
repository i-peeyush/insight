package com.insightpest.modules.contact.repositories;

import com.insightpest.modules.contact.entities.ContactMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactMessageEntity, String> {
}
