package com.insightpest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
class InsightPestApplicationTests {

    @Test
    void contextLoads() {
        // Verifies Spring context initializes cleanly with H2 and all controllers/services
    }
}
