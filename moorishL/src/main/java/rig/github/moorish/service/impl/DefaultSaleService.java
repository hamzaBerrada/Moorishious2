package rig.github.moorish.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rig.github.moorish.model.Bag;
import rig.github.moorish.model.Sale;
import rig.github.moorish.repository.BagRepository;
import rig.github.moorish.repository.SaleRepository;
import rig.github.moorish.service.SaleService;

@Service
public class DefaultSaleService implements SaleService{
	
	@Autowired
	private BagRepository bagRepo;
	
	@Autowired
	private SaleRepository saleRepo;


	public List<Sale> getAllSales() {
		return saleRepo.findAll();
	}

	public List<Bag> getAllBags() {
		return bagRepo.findAll();
	}

	public Optional<Sale> getSale(Long id) {
		return saleRepo.findById(id);
	}

	public Optional<Bag> getBag(Long id) {
		return bagRepo.findById(id);
	}

	public Optional<Bag> getSaleByUserId(Long id) {
		return null;
	}

	public Optional<Bag> getBagByUserId(Long id) {
		return bagRepo.findBagByUserId(id);
	}

	@Transactional
	public boolean addOrUpdateSale(Sale sale) {
		return saleRepo.save(sale) != null;
	}

	@Transactional
	public boolean addOrUpdateBag(Bag bag) {
		return bagRepo.save(bag) != null;
	}

	@Transactional
	public void deleteSale(Long id) {
		try {
			saleRepo.deleteById(id);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	@Transactional
	public void deleteBag(Long id) {
		try {
			bagRepo.deleteById(id);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}		
	}

}
