new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data () {
    return {
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
        { text: 'No. of Copies', value: 'no_of_copies' }
        ],
      books:{}
    }
  },
  created(){
    axios
      .get('/api/books/')
      .then(response => (this.books=response.data))
 
  },
    methods:{
    searchItems: function (value,search){
    
   if (search.trim() === '') return true;
   value=value.toString();
  return value.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }

  }

  
})