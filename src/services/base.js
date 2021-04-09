import http from './base.service';

export default class Base {
  constructor(uri) {
    this.apiUrl = uri;
  }
  get = async () => {
    const response = await http.get(this.apiUrl);
    return response.data;
  };
  getById = async (id) => {
    const response = await http.get(`${this.apiUrl}${id}`);
    return response.data;
  };
  add = async (data) => {
    const response = await http.post(this.apiUrl, data);
    return response.data;
  };
  edit = async (data) => {
    const response = await http.put(this.apiUrl, data);
    return response.data;
  };
  remove = async (id) => {
    const response = await http.delete(`${this.apiUrl}${id}`);
    return response.data;
  };
}
