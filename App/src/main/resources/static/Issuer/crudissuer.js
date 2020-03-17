new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data () {
    return {
      dialog:false,
      errorSnackbar:false,
      errorText:'',
      errorTimeout:2000,
      searchList:{cardno:'',name:'',dept:'',mail:'',sem:''},
      headers: [
    	  {
              text: 'Card Number',
              parent: this,
              filter:( (value,search,item) => this.searchItems(value,this.searchList.cardno) ),
              align: 'left',
              sortable: false,
              value: 'cardno'
            },
            { text: 'Type',
              value: 'type'
            },
            { text: 'Name',
              parent:this,
              filter:( (value,search,item) => this.searchItems(value,this.searchList.name) ),
              value: 'name' 
            },
            { text: 'Semester',
              parent:this,
              filter:( (value,search,item) => this.searchItems(value,this.searchList.sem) ),
             value: 'sem'
            },
            { text: 'Department',
              parent: this,
              filter:( (value,search,item) => this.searchItems(value,this.searchList.dept) ),          
              value: 'dept' },
            { text: 'Mail',
              parent: this,
              filter:( (value,search,item) => this.searchItems(value,this.searchList.mail) ),
              value: 'mail' },
            { text: 'Phone', value: 'phone' },
            { text: 'Actions', value: 'action', sortable: false }   

        ],
      issuer:[],
  editedIndex: -1,
    editedItem: {
      cardno: '',
      type: '',
      name: '',
      sem: '',
      dept:'',
      mail:'',
      phone:'',
    },
    defaultItem: {
    	 cardno: '',
         type: '',
         name: '',
         sem: '',
         dept:'',
         mail:'',
         phone:'',
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
      .get('/api/issuer/')
      .then(response => (this.issuer=response.data))
    },

 searchItems: function (value,search){
    
   if (search.trim() === '') return true;
   value=value.toString();
  return value.toLowerCase().indexOf(search.toLowerCase()) !== -1
    },
    editItem (item) {
      this.editedIndex = this.issuer.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.issuer.indexOf(item)
      if(confirm('Are you sure you want to delete this item?')){
        axios
        .delete('/api/issuer/'+this.issuer[index]._id)
        .then(response => {console.log(response);
          this.issuer.splice(index,1)})
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
        .post('/api/issuer/'+this.issuer[this.editedIndex]._id,this.editedItem)
        .then(response => {console.log(response);
          Object.assign(this.issuer[this.editedIndex], this.editedItem)})
        .catch(error =>{this.errorText=error.response.data;this.errorSnackbar=true});
        } else {
        axios
        .post('/api/issuer/new',this.editedItem)
        .then(response => {console.log(response);
          this.issuer.push(response.data)})
        .catch(error => {this.errorText=error.response.data;this.errorSnackbar=true});
        
      }
      this.close()
    }

  }
})