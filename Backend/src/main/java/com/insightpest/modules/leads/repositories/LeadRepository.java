package com.insightpest.modules.leads.repositories;

import com.insightpest.modules.leads.entities.LeadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<LeadEntity, String> {
    List<LeadEntity> findByStatusIgnoreCase(String status);
}
