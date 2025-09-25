package com.example.demo;

import com.example.demo.Utils.SSLBypass;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HackathonStarterApplication {

	public static void main(String[] args) {
        SSLBypass.disableSSLVerification();
		SpringApplication.run(HackathonStarterApplication.class, args);
	}

}
