import React from 'react';
import Select from 'react-select';

const customStyles = {
    control: (provided) => ({
        ...provided,
        // 'border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500': {}
    }),
    option: (provided, state) => ({
        ...provided,
        // 'px-4 py-2 hover:bg-indigo-100': {},
        backgroundColor: state.isSelected ? 'bg-indigo-500' : null,
        color: state.isSelected ? 'text-white' : null,
    }),
    menu: (provided) => ({
        ...provided,
        'mt-1 rounded-md shadow-lg': {}
    }),
    // Add more custom styles for other parts as needed
  };

const customClassNames = {
    control: () => 'border border-red-500 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
    option: ({ isSelected }) => 
      `px-4 py-2 hover:bg-indigo-100 ${isSelected ? 'bg-indigo-500' : ''}`,
    menu: () => 'mt-1 rounded-md shadow-lg',
    placeholder: (base) => ({
        ...base,
        'text-red-500': {}
    }),
    input: (base) => ({
        ...base,
        'bg-white text-black dark:bg-gray-950 dark:text-white': {}
    }),
};
  
const SelectSearch = ({ options, placeholder, onChange }) => {
  return (
    <Select
      options={options}
      classNames={customClassNames}
    //   styles={customStyles}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default SelectSearch;
