import Api from "@/services/Api";

export default {
  schema(){
    return Api().get('api/schema/catalogue')
  },
  vdef(){
    return Api().get('api/schema/catalogue/v-def')
  },
  get(params) {
    var url = 'api/catalogue?' + 'page=' + params.page + '&perPage=' + params.perPage + '&search=' + params.search + '&location_id=' + params.location_id;
    return Api().get(url)
  },
  add(data){
    return Api().post('api/catalogue', {data: data})
  },
  selectOptions(field_name){
    return Api().get('api/options/' + field_name)
  },
  getByIds(ids)
  {
    return Api().get('api/catalogue/details?ids=' + ids.toString())
  },
  update(id, data){
    return Api().post('api/catalogue/' + id, {data: data})
  }
}
