package com.deptlib.App.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.deptlib.App.model.Books;

public interface BooksRepository extends MongoRepository<Books, String> {
	Books findBy_id(ObjectId _id);
	long deleteBy_id(ObjectId _id);
}
