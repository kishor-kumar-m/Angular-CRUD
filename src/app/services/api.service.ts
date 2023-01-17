import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) { }
  user = environment.apiURL + "/user";
  postProduct(data: any) {
    return this.http.post<any>(`${this.user}/create-user/`, data);
  }
  getProduct() {
    return this.http.get<any>(`${this.user}/get-all-users/`);
  }
  putProduct(data: any, id: number) {
    return this.http.patch<any>(`${this.user}/update-user/` + id, data);
  }
  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.user}/delete-user/` + id);
  }
}
