package com.insightpest.modules.testimonials.services;

import com.insightpest.modules.testimonials.dto.TestimonialResponse;
import com.insightpest.modules.testimonials.entities.TestimonialEntity;
import com.insightpest.modules.testimonials.repositories.TestimonialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public TestimonialService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    public List<TestimonialResponse> getAllTestimonials() {
        return testimonialRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private TestimonialResponse mapToResponse(TestimonialEntity entity) {
        return new TestimonialResponse(
                entity.getId(),
                entity.getCustomerName(),
                entity.getLocation(),
                entity.getService(),
                entity.getRating(),
                entity.getReview(),
                entity.getDate(),
                entity.isVerified(),
                entity.getHighlight()
        );
    }
}
