dpackage com.deptlib.App.controller;

import java.util.List;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.deptlib.App.model.Issuer;

import com.deptlib.App.repository.IssuerRepository;

@RestController
@RequestMapping("/api/issuer")
public class IssuerController {
	@Autowired
	private IssuerRepository repository;
	
	@RequestMapping(value = "/", method= RequestMethod.GET)
	public List<Issuer> getAllIssuer(){
		return repository.findAll();
	}
	@RequestMapping(value = "/{id}", method= RequestMethod.GET)
	public Issuer getIssuerById(@PathVariable("id")ObjectId _id) {
		return repository.findBy_id(_id);
	}
	@RequestMapping(value= "/{id}", method= RequestMethod.POST)
	public void modifyIssuerById(@PathVariable("id") ObjectId _id,@Valid @RequestBody Issuer issuer) {
		issuer.set_id(_id);
		repository.save(issuer);
	}
	@RequestMapping(value ="/new", method= RequestMethod.POST)
	public Issuer createIssuer(@Valid @RequestBody Issuer issuer) {
		issuer.set_id(ObjectId.get());
		repository.save(issuer);
		return issuer;
	}
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public void deleteIssuer(@PathVariable("id") ObjectId _id) {
		repository.deleteBy_id(_id);
	}
	
}
