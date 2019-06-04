package rig.github.moorish.model;

public class Payement {
	
	private Double amount;
	private String currency;
	private String description;
	private String source;
	private String token;
	
	public Payement() {
		super();
	}
	
	public Payement(Double amount, String currency, String description, String source, String token) {
		super();
		this.amount = amount;
		this.currency = currency;
		this.description = description;
		this.source = source;
		this.token = token;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	
	

}
