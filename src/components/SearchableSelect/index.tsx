import { useRef, useState } from "react";
import { Option } from "../../types/common";
import { ReactComponent as ChevronUpDown } from "../../icons/chevron-up-down.svg";
import styles from "./index.module.css";
import useClickOutside from "../../hooks/useClickOutside";

interface SearchableSelectProps {
  options: Option[];
  onSelect: (selected: Option) => void;
}

const MAX_ITEMS_DISPLAY = 50;

const SearchableSelect = (props: SearchableSelectProps) => {
  const { options, onSelect } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options
    .filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, MAX_ITEMS_DISPLAY);

  const handleSelect = (option: Option) => {
    onSelect(option);
    setSearchTerm(option.label);
    setIsOpen(false);
  };

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className={styles.wrapper} ref={ref}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder="Search..."
        className={styles.input}
      />

      <ChevronUpDown
        className={styles.chevronIcon}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul className={styles.optionList}>
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={styles.optionItem}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {isOpen && filteredOptions.length === 0 && (
        <div className={styles.noData}>No options found</div>
      )}
    </div>
  );
};

export default SearchableSelect;
