package com.insightpest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class InsightPestApplication {

    public static void main(String[] args) {
        SpringApplication.run(InsightPestApplication.class, args);
    }
}
