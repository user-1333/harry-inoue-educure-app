package jp.educure.attendancemanagement;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("jp.educure.attendancemanagement.mapper")
public class AttendancemanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(AttendancemanagementApplication.class, args);
	}

}
