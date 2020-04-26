package rig.github.moorish.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import rig.github.moorish.model.Bag;

public interface BagRepository extends JpaRepository<Bag, Long>{
	Optional<Bag> findBagByUserId(Long id);
}
