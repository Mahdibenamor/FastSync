import axios from "axios";
import { Service } from "typedi";

@Service()
export class HttpClient {
  constructor() {}

  async fetch(url: string, headers: any) {
    const response = await axios.get(url, headers);
    if (response.status == 200) {
      return response.data?.result;
    }

    throw new Error("failing to connect to mupif");
  }

  async post(url: string, content: any) {
    const response = await axios.post(url, content);
    if (response.status == 200) {
      return response.data?.result;
    }

    throw new Error("failing to connect to perform http request on " + url);
  }
}
