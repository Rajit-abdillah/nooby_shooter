import React from "react";

type RadioImageProps = {
  name: string; // group name (like "gun" or "target")
  value: string; // value to pass when selected
  src: string; // image URL
  alt: string; // alt text for accessibility
  selectedValue: string; // currently selected value (from parent state)
  onChange: (value: string) => void; // callback when user selects
};

const RadioImage: React.FC<RadioImageProps> = ({
  name,
  value,
  src,
  alt,
  selectedValue,
  onChange,
}) => {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
        className="hidden peer"
      />
      <img
        src={src}
        alt={alt}
        className="w-25 h-24 border-2 border-transparent peer-checked:border-blue-500 rounded-lg"
      />
    </label>
  );
};

export default RadioImage;
