import Api from "@/services/Api";

export default {
  login (user) {
    return Api().post('/api/auth/login', {data: user})
  }
}
