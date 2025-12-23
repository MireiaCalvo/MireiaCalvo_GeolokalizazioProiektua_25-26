package mireia.FrikiMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "mireia.FrikiMap.model")
public class FrikiMapApplication {

    public static void main(String[] args) {
        SpringApplication.run(FrikiMapApplication.class, args);
    }
}