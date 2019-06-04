package rig.github.moorish.service;

import com.stripe.model.Order;

import rig.github.moorish.model.AppUser;

public interface PayementService {
	public String createCustomer(AppUser user);

	public void chargeCreditCard(Order order);
}
