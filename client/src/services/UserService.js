import Api from "@/services/Api";

export default {
  get() {
    return Api().get('api/users')
  },
  schema(){
    return Api().get('api/schema/users')
  },
  vdef(){
    return Api().get('api/schema/users/v-def')
  },
  add(data){
    return Api().post('api/users', {data: data})
  },
  delete(ids){
    return Api().post('api/users/delete?ids=' + ids.toString())
  },
}
