package rig.github;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Test {
	
	void test01() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String password = encoder.encode("oe3im3io2r3o2");
		System.out.println(password);
	}
	
	public Test() {
		
		test01();// TODO Auto-generated constructor stub
	}
	
	public static void main(String[] args) {
		new Test();
	}
}
