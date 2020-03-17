package com.deptlib.App.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Books {
	     @Id
         public ObjectId _id;
	     public String callno;
	     public String title;
	     public String author;
	     public String subject;
	     public int no_of_copies;
		public Books(ObjectId _id, String callno, String title, String author, String subject, int no_of_copies) {
			super();
			this._id = _id;
			this.callno = callno;
			this.title = title;
			this.author = author;
			this.subject = subject;
			this.no_of_copies = no_of_copies;
		}
		public String get_id() {
			return _id.toHexString();
		}
		public void set_id(ObjectId _id) {
			this._id = _id;
		}
		public String getCallno() {
			return callno;
		}
		public void setCallno(String callno) {
			this.callno = callno;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getAuthor() {
			return author;
		}
		public void setAuthor(String author) {
			this.author = author;
		}
		public String getSubject() {
			return subject;
		}
		public void setSubject(String subject) {
			this.subject = subject;
		}
		public int getNo_of_copies() {
			return no_of_copies;
		}
		public void setNo_of_copies(int no_of_copies) {
			this.no_of_copies = no_of_copies;
		}
	 
         
}
