package rig.github.moorish.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rig.github.moorish.model.Product;
import rig.github.moorish.model.Reference;

public interface ProductRepository extends JpaRepository<Product,Long>{
	Product findByRef(Reference reference);
}
