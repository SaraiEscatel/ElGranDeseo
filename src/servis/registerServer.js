import { BaseService } from "base-service-fran-dev";
import { BASE_PATH } from "../utils/constants";

export default class RegisterServices extends BaseService {
  constructor() {
    const baseUrl = BASE_PATH;
    const endPoint = "auth/registration/";
    super(baseUrl, endPoint);
  }
}
