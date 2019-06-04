package rig.github.moorish.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rig.github.moorish.model.Product;

public interface ProductRepository extends JpaRepository<Product,Long>{

}
