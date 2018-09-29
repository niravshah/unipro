import Api from "@/services/Api";

export default {
  get (params) {
    var url = 'api/suppliers?' + 'page=' + params.page + '&perPage=' + params.perPage + '&search=' + params.search + '&location_id=' + params.location_id;
    return Api().get(url)
  },
  getByIds(ids){
    return Api().get('api/suppliers/details?ids=' + ids.toString())
  },
  delete(id){
    return Api().post('api/suppliers/delete/' + id)
  },
  add(data){
    return Api().post('api/suppliers', {data: data})
  },
  update(id, data){
    return Api().post('api/suppliers/' + id, {data: data})
  },
  schema(){
    return Api().get('api/schema/suppliers')
  },
  vdef(){
    return Api().get('api/schema/suppliers/v-def')
  }
}
