package rig.github.moorish.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rig.github.moorish.model.Product;
import rig.github.moorish.model.Reference;
import rig.github.moorish.repository.ProductRepository;
import rig.github.moorish.repository.ReferenceRepository;
import rig.github.moorish.service.ProductService;

@Service
public class DefaultProductService implements ProductService {

	@Autowired
	private ReferenceRepository referenceRepo;

	@Autowired
	private ProductRepository productRepo;

	public List<Product> getAllProducts() {
		return productRepo.findAll();
	}

	public List<Reference> getAllReferences() {
		return referenceRepo.findAll();
	}

	public Optional<Product> getProduct(Long id) {
		return Optional.ofNullable(productRepo.getOne(id));
	}

	public Optional<Reference> getReference(Long id) {
		return Optional.ofNullable(referenceRepo.getOne(id));
	}

	@Override
	public Reference getReferenceByRef(String ref) {
		return referenceRepo.findByRef(ref);
	}

	@Transactional
	public boolean addOrUpdateProduct(Product product) {
		return productRepo.save(product) != null;
	}

	@Transactional
	public boolean addOrUpdateReference(Reference reference) {
		System.out.println("service " + reference);
		return referenceRepo.save(reference) != null;
	}

	@Transactional
	public void deleteProduct(Long id) {

		try {
			productRepo.deleteById(id);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

	}

	@Transactional
	public void deleteReference(Long id) {
		try {
			referenceRepo.deleteById(id);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

}
