import http from "../http";

class CitiesService {

  getAll(id) {
    return http.get(`/countries/${id}/cities`);
  }

  getAllParams(id, page, start_date, end_date, search) {
    return http.get(`/countries/${id}/cities?page=${page}&start_date=${start_date}&end_date=${end_date}&search=${search}`);
  }

  delete(id, id2) {
    return http.delete(`/countries/${id}/cities/${id2}`);
  }

  add(id, data) {
      return http.post(`/countries/${id}/cities`, data)
  }

  update(id, id2, data) {
    return http.put(`/countries/${id}/cities/${id2}`, data);
  }

}

export default new CitiesService();
