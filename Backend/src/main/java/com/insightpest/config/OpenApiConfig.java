package com.insightpest.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI insightPestOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Insight Pest Solutions API")
                        .description("RESTful Backend Services for Insight Pest Solutions Web Platform. Provides service catalogs, pest library, dynamic slot bookings, lead ingestion, and contact management.")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Insight Pest Solutions Engineering")
                                .email("support@insightpestsolutions.demo"))
                        .license(new License()
                                .name("Proprietary Commercial License")));
    }
}
