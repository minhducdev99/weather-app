import { Option } from "../../types/common";
import SearchableSelect from "../SearchableSelect";
import { City } from "../../types/city";

interface WeatherFormProps {
  cities: City[];
  onCitySelected: (value: City | null) => void;
}

const WeatherForm = (props: WeatherFormProps) => {
  const { cities, onCitySelected } = props;

  const options: Option[] = cities.map((city) => {
    return {
      label: city.name,
      value: city.id,
    };
  });

  const handleSelect = (option: Option) => {
    const citySelected = cities.find((city) => {
      return city.id === option.value;
    });
    if (citySelected) {
      onCitySelected(citySelected);
      return;
    }
    onCitySelected(null);
  };

  return (
    <div>
      <SearchableSelect options={options} onSelect={handleSelect} />
    </div>
  );
};

export default WeatherForm;
