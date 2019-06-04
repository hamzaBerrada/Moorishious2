package rig.github.moorish.service.exceptions;

public class JwtSecurityException extends RuntimeException {
	private static final long serialVersionUID = -4040558453974666404L;

	public JwtSecurityException(Exception ex) {
		super(ex);
	}

	public JwtSecurityException(String message) {
		super(message);
	}

}
