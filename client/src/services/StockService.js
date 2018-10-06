import Api from "@/services/Api";

export default {
  get(params) {
    var url = 'api/stock?' + 'page=' + params.page + '&perPage=' + params.perPage + '&search=' + params.search + '&location_id=' + params.location_id;
    return Api().get(url)
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
  },
  getUsageDetails(ids){
    return Api().get('api/stock/usage?ids=' + ids.toString());
  },
  getOrders(ids){
    return Api().get('api/stock/orders?ids=' + ids.toString());
  },
  getCatalogueInfo(ids){
    return Api().get('api/stock/catalogues?ids=' + ids.toString());
  },
  getByGtin(gtin){
    return Api().get('api/stock/gtin?gtin=' + gtin);
  },
  checkout(items){
    return Api().post('api/stock/checkout', {items: items});
  },
  counterUp(id){
    return Api().post('api/stock/' + id + '/level_up');
  },
  counterDown(id){
    return Api().post('api/stock/' + id + '/level_down');
  },
  addBarcode(data){
    return Api().post('api/item/' + data.item_id + '/barcode', {data: data});
  },
  getBarcodes(item_id, supplier_id){
    return Api().get('api/item/' + item_id + '/supplier/' + supplier_id + '/barcodes');
  }
}
