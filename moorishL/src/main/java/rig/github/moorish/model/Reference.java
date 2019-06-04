package rig.github.moorish.model;

import java.util.Arrays;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import rig.github.moorish.model.enums.Category;

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

	@Override
	public String toString() {
		return "Reference [id=" + id + ", ref=" + ref + ", name=" + name + ", price=" + price + ", desc=" + desc
				+ ", gender=" + gender + ", category=" + category + ", subCategory=" + subCategory + ", pathPrincipal="
				+ pathPrincipal + ", pictures=" + Arrays.toString(pictures) + "]";
	}

}
