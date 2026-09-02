package com.insightpest.modules.faq.services;

import com.insightpest.modules.faq.dto.FaqResponse;
import com.insightpest.modules.faq.entities.FaqEntity;
import com.insightpest.modules.faq.repositories.FaqRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class FaqService {

    private final FaqRepository faqRepository;

    public FaqService(FaqRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    public List<FaqResponse> getAllFaqs(String category) {
        List<FaqEntity> entities;
        if (category != null && !category.equalsIgnoreCase("All")) {
            entities = faqRepository.findByCategoryIgnoreCase(category);
        } else {
            entities = faqRepository.findAll();
        }
        return entities.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private FaqResponse mapToResponse(FaqEntity entity) {
        return new FaqResponse(
                entity.getId(),
                entity.getCategory(),
                entity.getQuestion(),
                entity.getAnswer()
        );
    }
}
