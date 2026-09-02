package com.insightpest.modules.blog.dto;

import java.time.LocalDate;
import java.util.List;

public class BlogPostResponse {
    private String id;
    private String slug;
    private String title;
    private String excerpt;
    private String content;
    private String category;
    private String author;
    private LocalDate publishedDate;
    private String readingTime;
    private boolean featured;
    private List<String> tags;

    public BlogPostResponse() {}

    public BlogPostResponse(String id, String slug, String title, String excerpt, String content,
                            String category, String author, LocalDate publishedDate, String readingTime,
                            boolean featured, List<String> tags) {
        this.id = id;
        this.slug = slug;
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.category = category;
        this.author = author;
        this.publishedDate = publishedDate;
        this.readingTime = readingTime;
        this.featured = featured;
        this.tags = tags;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public LocalDate getPublishedDate() { return publishedDate; }
    public void setPublishedDate(LocalDate publishedDate) { this.publishedDate = publishedDate; }

    public String getReadingTime() { return readingTime; }
    public void setReadingTime(String readingTime) { this.readingTime = readingTime; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}
