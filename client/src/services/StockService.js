import Api from "@/services/Api";

export default {
  fetchStock () {
    return Api().get('api/stock')
  },
  getStockDetailsByIds(ids){
    return Api().get('api/stock/details?ids=' + ids.toString())
  },
  uploadStock(stock){
    return Api().post('api/stock/upload', stock)
  }

}
