import http from "../http";

class CountriesService {

  getAll() {
    return http.get("/countries");
  }

  get(id) {
    return http.get(`/countries/${id}`);
  }

  getAllParams(page, start_date, end_date, search) {
    return http.get(`/countries?page=${page}&start_date=${start_date}&end_date=${end_date}&search=${search}`);
  }

  add(data) {
      return http.post("/countries", data);
  }

  delete(id) {
    return http.delete(`/countries/${id}`);
  }

  update(id, data) {
    return http.put(`/countries/${id}`, data);
  }


}

export default new CountriesService();
