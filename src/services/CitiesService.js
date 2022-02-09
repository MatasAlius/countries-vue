import http from "../http";

class CitiesService {

  getAll(id) {
    return http.get(`/countries/${id}/cities`);
  }

  getAllParams(id, page, start_date, end_date, search) {
    return http.get(`/countries/${id}/cities?page=${page}&start_date=${start_date}&end_date=${end_date}&search=${search}`);
  }

  getPage(id, page) {
    return http.get(`/countries/${id}/cities?page=${page}`);
  }

  getByDate(id, start_date, end_date) {
    return http.get(`/countries/${id}/cities?start_date=${start_date}&end_date=${end_date}`);
  }

  delete(id, id2) {
    return http.delete(`/countries/${id}/cities/${id2}`);
  }

  search(id, search) {
      return http.get(`/countries/${id}/cities?search=${search}`);
  }

  add(id, data) {
      return http.post(`/countries/${id}/cities`, data)
  }

  update(id, id2, data) {
    return http.put(`/countries/${id}/cities/${id2}`, data);
  }

}

export default new CitiesService();
