package mireia.FrikiMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class FrikiMapApplication {

    public static void main(String[] args) {
        new SpringApplicationBuilder(FrikiMapApplication.class)
            .properties(
                "spring.data.mongodb.uri=mongodb+srv://mireia:Admin123@frikimap.ofdyxsr.mongodb.net/FrikiMap",
                "server.port=8081"
            )
            .run(args);
    }
}