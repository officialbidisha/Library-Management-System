new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data () {
    return {
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
        { text: 'Phone', value: 'phone' }
        ],
      issuer:{}
    }
  },
  created(){
    axios
      .get('/api/issuer/')
      .then(response => (this.issuer=response.data))
 
  },
    methods:{
    searchItems: function (value,search){
    
   if (search.trim() === '') return true;
   value=value.toString();
  return value.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }

  }

  
})