import { City } from "../../types/city";

export const citiesService = {
  async getCities() {
    const response = await fetch("/data/city.list.json");
    if (!response.ok) {
      throw new Error(`Http error with status ${response.status}`);
    }
    const data: City[] = await response.json();
    return data;
  },
};
