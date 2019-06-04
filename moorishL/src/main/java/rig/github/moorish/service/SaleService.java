package rig.github.moorish.service;

import java.util.List;
import java.util.Optional;

import rig.github.moorish.model.Bag;
import rig.github.moorish.model.Sale;

public interface SaleService {

	List<Sale> getAllSales();

	List<Bag> getAllBags();

	Optional<Sale> getSale(Long id);

	Optional<Bag> getBag(Long id);

	boolean addOrUpdateSale(Sale sale);

	boolean addOrUpdateBag(Bag bag);

	void deleteSale(Long id);

	void deleteBag(Long id);

}
