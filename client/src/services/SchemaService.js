import Api from "@/services/Api";

export default {
  fetchLocationSchema () {
    return Api().get('api/schema/location')
  },
  fetchLocationHeaders(){
    return Api().get('api/schema/location/headers')
  },
  fetchStockSchema () {
    return Api().get('api/schema/stock')
  },
  fetchStockHeaders () {
    return Api().get('api/schema/stock/headers')
  },
  fetchSupplierSchema(){
    return Api().get('api/schema/supplier')
  }
}
