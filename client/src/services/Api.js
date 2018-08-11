import axios from "axios";
import Vue from "vue";

export default() => {
  return axios.create({
    baseURL: process.env.API_ROOT,
    headers: {"Authorization": "Bearer " + Vue.ls.get("jwt", "")}
  })
}
