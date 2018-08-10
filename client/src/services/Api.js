import axios from "axios";
import Vue from "vue";

export default() => {
  return axios.create({
    baseURL: `http://trust1.uniproc.com:5000`,
    headers: {"Authorization": "Bearer " + Vue.ls.get("jwt", "")}
  })
}
