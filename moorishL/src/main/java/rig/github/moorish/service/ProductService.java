package rig.github.moorish.service;

import java.util.List;
import java.util.Optional;

import rig.github.moorish.model.Product;
import rig.github.moorish.model.Reference;

public interface ProductService {

	List<Product> getAllProducts();

	List<Reference> getAllReferences();

	Optional<Product> getProduct(Long id);

	Optional<Reference> getReference(Long id);
	
	Reference getReferenceByRef(String ref);

	boolean addOrUpdateProduct(Product product);

	boolean addOrUpdateReference(Reference reference);

	void deleteProduct(Long id);

	void deleteReference(Long id);

}
