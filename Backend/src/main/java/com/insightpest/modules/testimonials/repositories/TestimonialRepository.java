package com.insightpest.modules.testimonials.repositories;

import com.insightpest.modules.testimonials.entities.TestimonialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<TestimonialEntity, String> {
    List<TestimonialEntity> findByServiceIgnoreCase(String service);
}
