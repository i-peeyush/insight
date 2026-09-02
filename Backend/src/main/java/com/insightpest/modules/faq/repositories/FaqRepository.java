package com.insightpest.modules.faq.repositories;

import com.insightpest.modules.faq.entities.FaqEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaqRepository extends JpaRepository<FaqEntity, String> {
    List<FaqEntity> findByCategoryIgnoreCase(String category);
}
