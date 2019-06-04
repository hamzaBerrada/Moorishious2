package rig.github.moorish.model;

import java.time.LocalDate;
import java.util.List;
import java.util.Vector;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Sale {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	private AppUser user;

	//product with the choosed quantity// calcul quantity from reference
	@OneToMany
	private List<Product> products;

	private Double totalAmount;
	
	private LocalDate date;

	private Boolean isDelivred;

	public Sale() {
		products = new Vector<>();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AppUser getUser() {
		return user;
	}

	public void setUser(AppUser user) {
		this.user = user;
	}


	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Boolean getIsDelivred() {
		return isDelivred;
	}

	public void setIsDelivred(Boolean isDelivred) {
		this.isDelivred = isDelivred;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	
	

}
