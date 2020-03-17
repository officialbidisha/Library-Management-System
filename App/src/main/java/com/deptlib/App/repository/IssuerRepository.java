package com.deptlib.App.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.deptlib.App.model.Issuer;

public interface IssuerRepository extends MongoRepository<Issuer, String> {
	Issuer findBy_id(ObjectId _id);
	long deleteBy_id(ObjectId _id);
}