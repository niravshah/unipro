import Api from "@/services/Api";

export default {
  get() {
    return Api().get('api/goods')
  },
  getByIds(ids)
  {
    return Api().get('api/goods/details?ids=' + ids.toString())
  },
  upload(data){
    return Api().post('api/goods/upload', data)
  },
  add(data){
    return Api().post('api/goods', {data: data})
  },
  update(id, data){
    return Api().post('api/goods/' + id, {data: data})
  },
  delete(id){
    return Api().post('api/goods/delete/' + id)
  },
  selectOptions(field_name){
    return Api().get('api/options/' + field_name)
  },
  getSchema(){
    return Api().get('api/schema/goods')
  },
  getVDef(){
    return Api().get('api/schema/goods/v-def')
  }
}



