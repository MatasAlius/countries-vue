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

  getPage(page) {
    return http.get(`/countries?page=${page}`);
  }

  getByDate(start_date, end_date) {
    return http.get(`/countries?start_date=${start_date}&end_date=${end_date}`);
  }

  add(data) {
      return http.post("/countries", data);
  }

  delete(id) {
    return http.delete(`/countries/${id}`);
  }

  search(search) {
    return http.get(`/countries?search=${search}`)
  }

  update(id, data) {
    return http.put(`/countries/${id}`, data);
  }


}

export default new CountriesService();
