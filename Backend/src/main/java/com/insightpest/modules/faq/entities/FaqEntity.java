package com.insightpest.modules.faq.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "faqs", indexes = {
    @Index(name = "idx_faqs_category", columnList = "category")
})
public class FaqEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 300)
    private String question;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String answer;

    public FaqEntity() {}

    public FaqEntity(String category, String question, String answer) {
        this.category = category;
        this.question = question;
        this.answer = answer;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
}
