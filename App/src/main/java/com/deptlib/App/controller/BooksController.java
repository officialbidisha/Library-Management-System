package com.deptlib.App.controller;
import java.util.List;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.deptlib.App.model.Books;
import com.deptlib.App.repository.BooksRepository;

@RestController
@RequestMapping("/api/books")
public class BooksController {
	@Autowired
	private BooksRepository repository;
	
	@RequestMapping(value = "/", method= RequestMethod.GET)
	public List<Books> getAllBooks(){
		return repository.findAll();
	}
	@RequestMapping(value = "/{id}", method= RequestMethod.GET)
	public Books getBookById(@PathVariable("id")ObjectId _id) {
		return repository.findBy_id(_id);
	}
	@RequestMapping(value= "/{id}", method= RequestMethod.POST)
	public void modifyBookById(@PathVariable("id") ObjectId _id,@Valid @RequestBody Books book) {
		book.set_id(_id);
		repository.save(book);
	}
	@RequestMapping(value ="/new", method= RequestMethod.POST)
	public Books createBook(@Valid @RequestBody Books book) {
		book.set_id(ObjectId.get());
		repository.save(book);
		return book;
	}
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public void deleteBook(@PathVariable("id") ObjectId _id) {
		repository.deleteBy_id(_id);
	}
	
}
