import Api from "@/services/Api";

export default {
  get() {
    return Api().get('api/stock')
  },
  getByIds(ids)
  {
    return Api().get('api/stock/details?ids=' + ids.toString())
  },
  upload(data){
    return Api().post('api/stock/upload', data)
  },
  add(data){
    return Api().post('api/stock', {data: data})
  },
  update(id, data){
    return Api().post('api/stock/' + id, {data: data})
  },
  delete(id){
    return Api().post('api/stock/delete/' + id)
  },
  selectOptions(field_name){
    return Api().get('api/options/' + field_name)
  },
  schema(){
    return Api().get('api/schema/stock')
  },
  vdef(){
    return Api().get('api/schema/stock/v-def')
  }
}
