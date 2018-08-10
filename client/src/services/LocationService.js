import Api from "@/services/Api";

export default {
  fetchLocations() {
    return Api().get('api/locations')
  },
  getLocationDetailsByIds(ids)
  {
    return Api().get('api/locations/details?ids=' + ids.toString())
  },
  uploadLocations(locations){
    return Api().post('api/locations/upload', locations)
  },
  addLocation(location){
    return Api().post('api/locations', location)
  },
  updateLocation(id, data){
    return Api().post('api/locations/' + id, {data: data})
  }
}



