package rig.github.moorish.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rig.github.moorish.model.Reference;

public interface ReferenceRepository extends JpaRepository<Reference, Long> {
	Reference findByRef(String ref);
	Reference[] findAllByGender(String gender);
	Long deleteByRef(String ref);
}
