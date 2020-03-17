package com.deptlib.App.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Issuer {
      @Id
      public ObjectId _id;
      public String cardno;
      public String type;
      public String name;
      public String sem;
      public String dept;
      public String mail;
      public String phone;
	public Issuer(ObjectId _id, String cardno,String type, String name, String sem, String dept, String mail, String phone) {
		super();
		this._id = _id;
		this.cardno = cardno;
		this.type= type;
		this.name = name;
		this.sem = sem;
		this.dept = dept;
		this.mail = mail;
		this.phone = phone;
	}
	public String get_id() {
		return _id.toHexString();
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public String getCardno() {
		return cardno;
	}
	public void setCardno(String cardno) {
		this.cardno = cardno;
	}
	public String getType() {
		return type;
	}
	public void setType(String type){
		this.type=type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSem() {
		return sem;
	}
	public void setSem(String sem) {
		this.sem = sem;
	}
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
      
}

