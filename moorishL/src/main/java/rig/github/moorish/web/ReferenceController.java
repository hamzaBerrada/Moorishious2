package rig.github.moorish.web;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stripe.Stripe;
import com.stripe.model.Charge;

import rig.github.moorish.model.AppUser;
import rig.github.moorish.model.Payement;
import rig.github.moorish.model.Reference;
import rig.github.moorish.model.Sale;
import rig.github.moorish.model.enums.Category;
import rig.github.moorish.model.enums.SubAccessories;
import rig.github.moorish.model.enums.SubClothing;
import rig.github.moorish.model.enums.SubJacket;
import rig.github.moorish.model.enums.SubShoes;
import rig.github.moorish.payload.UploadFileResponse;
import rig.github.moorish.service.FileStorageService;
import rig.github.moorish.service.ProductService;
import rig.github.moorish.service.SaleService;

@RestController
public class ReferenceController {
	@Autowired
	private FileStorageService fileStorageService;

	@Autowired
	private ProductService defaultProductService;
	
	@Autowired
	private SaleService defaultSaleService;
	
	private String path;
	
	public ReferenceController() {
	}

	@PostMapping("/addReference")
	public Boolean addReference(@RequestBody Reference reference) {
		Reference ref = new Reference();
		ref.setName(reference.getName());
		ref.setDesc(reference.getDesc());
		ref.setCategory(reference.getCategory());
		ref.setSubCategory(reference.getSubCategory());
		ref.setGender(reference.getGender());
		ref.setPrice(reference.getPrice());
		ref.setRef(reference.getRef());
		ref.setPathPrincipal(path);
		return defaultProductService.addOrUpdateReference(ref);
	}

	@GetMapping("/listReference")
	public List<Reference> listReference() {
		return defaultProductService.getAllReferences();
	}

	@PostMapping("/uploadFile")
	public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
		System.out.println("rest controller uploadFile");
		String fileName = fileStorageService.storeFile(file);
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();
		path = fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
	}

	@PostMapping("/uploadMultipleFiles")
	public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("file") MultipartFile[] files) {
		return Arrays.asList(files).stream().map(file -> uploadFile(file)).collect(Collectors.toList());
	}

	@PostMapping("/deleteReference")
	public void deleteReference(@RequestBody Reference ref) {
		Reference refo = new Reference();
		refo = defaultProductService.getReferenceByRef(ref.getRef());
		defaultProductService.deleteReference(refo.getId());
	}
	
	@GetMapping("/categoryReference")
	public Category[] categoryReference() {
		return Category.values();
	}
		
	@PostMapping("/subCategory")
	public Object[] subCategoryReference(@RequestBody String category) {
		if(category.equals("CLOTHING=")) {
			return SubClothing.values();
		}
		else if(category.equals("SHOES=")) {
			return SubShoes.values();
		}
		else if(category.equals("ACCESSORIES=")) {
			return SubAccessories.values();
		}
		else if(category.equals("JACKET=")) {
			return SubJacket.values();
		}
		else return null;
	}
	
		
	@PostMapping("/getPaid")
	public void getPayement(@RequestBody Payement payement , @RequestBody Sale sale) {
		Stripe.apiKey = "sk_test_L7pTZLxEobdHSR10XSB7xQss";
		
		Payement p = new Payement();
		p.setSource(payement.getSource());
		p.setAmount(payement.getAmount());
		p.setCurrency(payement.getCurrency());
		p.setDescription(payement.getDescription());
		
		Sale s = new Sale();
		s.setDate(sale.getDate());
		s.setId(sale.getId());
		s.setTotalAmount(sale.getTotalAmount());
		s.setIsDelivred(sale.getIsDelivred());
		s.setUser(sale.getUser());
		
		defaultSaleService.addOrUpdateSale(s);
		
		System.out.println("dkheel : " + p.getSource());
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("amount", p.getAmount());
		params.put("currency", p.getCurrency());
		params.put("description", p.getDescription());
		params.put("source", p.getSource());
		try {
			Charge.create(params);
		} catch (Exception e) {
			System.out.println("Erreur : " + e.getMessage());
		}
		
	}
	
}
