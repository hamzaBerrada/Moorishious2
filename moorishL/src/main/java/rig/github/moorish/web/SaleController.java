package rig.github.moorish.web;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rig.github.moorish.model.AppUser;
import rig.github.moorish.model.Bag;
import rig.github.moorish.model.Product;
import rig.github.moorish.service.AccountService;
import rig.github.moorish.service.ProductService;
import rig.github.moorish.service.SaleService;

@RestController
public class SaleController {	
	@Autowired
	private SaleService defaultSaleService;
	
	@Autowired
	private ProductService defaultProductService;
	
	@Autowired
	private AccountService accountService;
	
	Logger logger = LoggerFactory.getLogger(getClass());
	
	public SaleController(){
	}
	
	@PostMapping("/addToBag")
	public boolean addToBag(@RequestBody Product product) {
		System.out.println("Add bag : "+ product.getColor());
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		AppUser user = new AppUser();
		if (auth instanceof AnonymousAuthenticationToken) return false;
		user = accountService.findUserByEmail((String)auth.getPrincipal());
		
		Optional<Bag> bagUser = defaultSaleService.getBag(user.getId());
		if(bagUser.isPresent()) {
			System.out.println("bag exist ");
			defaultProductService.addOrUpdateProduct(product);
			bagUser.get().getProducts().add(product);
			defaultSaleService.addOrUpdateBag(bagUser.get());
			
		}
		else {
			System.out.println("bag don't exist ");
			Bag bag = new Bag();
			bag.getProducts().add(product);
			bag.setUser(user);
			defaultSaleService.addOrUpdateBag(bag);
		}
		
		return true;
	}
	
	@GetMapping("/listBag")
	public List<Product> listBag() {
		System.out.println("list Bag : ");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		AppUser user = new AppUser();
		if (auth instanceof AnonymousAuthenticationToken) return null;
		user = accountService.findUserByEmail((String)auth.getPrincipal());
		
		Optional<Bag> bag = defaultSaleService.getBagByUserId(user.getId());
		if(bag.isPresent()) return bag.get().getProducts();
		else return null; 
	}
		
	@PostMapping("/updateBag")
	public List<Product> updateBag(@RequestBody Product product) {
		System.out.println("update bag : "+product.getId());
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		AppUser user = new AppUser();
		if (auth instanceof AnonymousAuthenticationToken) return null;
		user = accountService.findUserByEmail((String)auth.getPrincipal());
		
		Optional<Bag> bag = defaultSaleService.getBagByUserId(user.getId());
		if(bag.isPresent()) {
				defaultProductService.addOrUpdateProduct(product);
			return bag.get().getProducts();
		}			
		else return null; 
	}
	
	@PostMapping("/deleteProduct")
	public List<Product> deleteProduct(@RequestBody Product product) {
		System.out.println("delete product : ");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		AppUser user = new AppUser();
		if (auth instanceof AnonymousAuthenticationToken) return null;
		user = accountService.findUserByEmail((String)auth.getPrincipal());
		Product productToRM = new Product();
		
		Optional<Bag> bag = defaultSaleService.getBagByUserId(user.getId());
		if(bag.isPresent()) {
			for(Product p : bag.get().getProducts()){
				System.out.println("remove element : "+ p.getRef().getId());
				if(p.getRef().getId() == product.getRef().getId()) productToRM = p;
			}
			bag.get().getProducts().remove(productToRM);
			defaultProductService.deleteProduct(productToRM.getId());
			defaultSaleService.addOrUpdateBag(bag.get());
			return bag.get().getProducts();
		}			
		else return null; 
	}
	
}
