import {getCategory} from "../../utils/sessionUtils";

export default {
  data(){
    return{
      categoryList:[]
    }
  },
  mounted() {
    // this.getCategoryList();
  },
  methods:{
    getCategoryList(){
      if (this.categoryList.length === 0) {
        getCategory().then(data => this.categoryList = data)
      }
    }
  },
  filters:{
    getCategoryName(categoryId) {
      this.categoryList.forEach(data => {
        if (data.id === categoryId) {
          return data.name
        }
      })
    }
  }
}
