package rig.github.moorish.model;

import java.util.Arrays;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import rig.github.moorish.model.enums.Category;
import rig.github.moorish.model.enums.Brand;

@Entity
public class Reference {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String ref;

	private String name;

	private Double price;

	private String desc;

	private String gender;

	private Category category;

	private String subCategory;
	
	private Brand marque;
	
	@ElementCollection
	private List<String> colors;
	
	@ElementCollection
	private List<String> sizes;

	private String pathPrincipal;

	private String[] pictures;

	public Reference() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRef() {
		return ref;
	}

	public void setRef(String ref) {
		this.ref = ref;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String[] getPictures() {
		return pictures;
	}

	public void setPictures(String[] pictures) {
		this.pictures = pictures;
	}

	public String getPathPrincipal() {
		return pathPrincipal;
	}

	public void setPathPrincipal(String pathPrincipal) {
		this.pathPrincipal = pathPrincipal;
	}

	public Brand getMarque() {
		return marque;
	}

	public void setMarque(Brand marque) {
		this.marque = marque;
	}

	public List<String> getColors() {
		return colors;
	}

	public void setColors(List<String> colors) {
		this.colors = colors;
	}

	public List<String> getSizes() {
		return sizes;
	}

	public void setSizes(List<String> sizes) {
		this.sizes = sizes;
	}
	
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((category == null) ? 0 : category.hashCode());
		result = prime * result + ((colors == null) ? 0 : colors.hashCode());
		result = prime * result + ((desc == null) ? 0 : desc.hashCode());
		result = prime * result + ((gender == null) ? 0 : gender.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((marque == null) ? 0 : marque.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((pathPrincipal == null) ? 0 : pathPrincipal.hashCode());
		result = prime * result + Arrays.hashCode(pictures);
		result = prime * result + ((price == null) ? 0 : price.hashCode());
		result = prime * result + ((ref == null) ? 0 : ref.hashCode());
		result = prime * result + ((sizes == null) ? 0 : sizes.hashCode());
		result = prime * result + ((subCategory == null) ? 0 : subCategory.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Reference other = (Reference) obj;
		if (category != other.category)
			return false;
		if (colors == null) {
			if (other.colors != null)
				return false;
		} else if (!colors.equals(other.colors))
			return false;
		if (desc == null) {
			if (other.desc != null)
				return false;
		} else if (!desc.equals(other.desc))
			return false;
		if (gender == null) {
			if (other.gender != null)
				return false;
		} else if (!gender.equals(other.gender))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (marque != other.marque)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (pathPrincipal == null) {
			if (other.pathPrincipal != null)
				return false;
		} else if (!pathPrincipal.equals(other.pathPrincipal))
			return false;
		if (!Arrays.equals(pictures, other.pictures))
			return false;
		if (price == null) {
			if (other.price != null)
				return false;
		} else if (!price.equals(other.price))
			return false;
		if (ref == null) {
			if (other.ref != null)
				return false;
		} else if (!ref.equals(other.ref))
			return false;
		if (sizes == null) {
			if (other.sizes != null)
				return false;
		} else if (!sizes.equals(other.sizes))
			return false;
		if (subCategory == null) {
			if (other.subCategory != null)
				return false;
		} else if (!subCategory.equals(other.subCategory))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Reference [id=" + id + ", ref=" + ref + ", name=" + name + ", price=" + price + ", desc=" + desc
				+ ", gender=" + gender + ", category=" + category + ", subCategory=" + subCategory + ", marque="
				+ marque + ", colors=" + colors + ", sizes=" + sizes + ", pathPrincipal=" + pathPrincipal
				+ ", pictures=" + Arrays.toString(pictures) + "]";
	}

}
