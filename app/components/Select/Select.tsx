type SelectType = {
  name: string;
  options: {
    id: string;
    label: string;
  }[];
  selected: string | null;
  onChange?: (selected: string) => void;
};

const Select = ({ name, options, selected, onChange }: SelectType) => {
  return (
    <select
      name={name}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      value={selected || ""}
    >
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
