// File: src/main/java/mireia/FrikiMap/config/CorsConfig.java
package mireia.FrikiMap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins(
                        "http://127.0.0.1:5500",    // VS Code Live Server
                        "http://localhost:5500",     // Localhost Live Server
                        "http://127.0.0.1:8080",     // Other common ports
                        "http://localhost:8080",
                        "file://"                    // For opening HTML directly
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600); // 1 hour
            }
        };
    }
}