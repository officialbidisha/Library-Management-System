new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data () {
    return {
      dialog:false,
      errorSnackbar:false,
      errorText:'',
      errorTimeout:2000,
      searchList:{title:'',author:'',subject:''},
      headers: [
        {
          text: 'Call Number',
          align: 'left',
          sortable: false,
          value: 'callno'
        },
        { text: 'Title',
          filter:( (value,search,item) => this.searchItems(value,this.searchList.title) ),
          value: 'title'
        },
        { text: 'Author Name',
          parent:this,
          filter:( (value,search,item) => this.searchItems(value,this.searchList.author) ),
          value: 'author' 
        },
        { text: 'Subject',
          parent:this,
          filter:( (value,search,item) => this.searchItems(value,this.searchList.subject) ),
         value: 'subject'
        },
        { text: 'No. of Copies', value: 'no_of_copies' },
        { text: 'Actions', value: 'action', sortable: false }
        ],
      books:[],
  editedIndex: -1,
    editedItem: {
      callno: '',
      title: '',
      author: '',
      subject: '',
      no_of_copies: 0,
    },
    defaultItem: {
      callno: '',
      title: '',
      author: '',
      subject: '',
      no_of_copies: 0,
    },
    errors:{}
  }},
  
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },
created(){
      this.initialize()
   },  
  methods: {
    initialize(){
          axios
      .get('/api/books/')
      .then(response => (this.books=response.data))
    },

 searchItems: function (value,search){
    
   if (search.trim() === '') return true;
   value=value.toString();
  return value.toLowerCase().indexOf(search.toLowerCase()) !== -1
    },
    editItem (item) {
      this.editedIndex = this.books.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.books.indexOf(item)
      if(confirm('Are you sure you want to delete this item?')){
        axios
        .delete('/api/books/'+this.books[index]._id)
        .then(response => {console.log(response);
          this.books.splice(index,1)})
        .catch(error => {this.errorText=error.response.data;this.errorSnackbar=true});
        
      }
    },
    checkItem(item) {
      
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        axios
        .post('/api/books/'+this.books[this.editedIndex]._id,this.editedItem)
        .then(response => {console.log(response);
          Object.assign(this.books[this.editedIndex], this.editedItem)})
        .catch(error =>{this.errorText=error.response.data;this.errorSnackbar=true});
        } else {
        axios
        .post('/api/books/new',this.editedItem)
        .then(response => {console.log(response);
          this.books.push(response.data)})
        .catch(error => {this.errorText=error.response.data;this.errorSnackbar=true});
        
      }
      this.close()
    }

  }
})