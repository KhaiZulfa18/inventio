import clsx from 'clsx';
import React from 'react';
import Select from 'react-select';

const controlStyles = {
    base: "border rounded-lg bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700 py-1 px-0.5 hover:cursor-pointer",
    focus: "border-primary-600 ring-1 ring-primary-500",
    nonFocus: "border-gray-300 hover:border-gray-400",
};
const placeholderStyles = "text-gray-950 dark:text-white pl-1 py-0.5";
const selectInputStyles = "pl-3 py-0.5";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-3";
const multiValueStyles = "bg-gray-200 dark:bg-gray-900 text-gray-950 dark:text-gray-200 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles = "border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-800 dark:hover:text-red-300 text-gray-500 dark:text-gray-200 hover:border-red-300 dark:hover:border-red-300 rounded-md";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles = "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800 hover:border-0 dark:hover:bg-gray-900 dark:hover:border-red-400 dark:hover:text-red-400";
const indicatorSeparatorStyles = "bg-gray-300 dark:bg-gray-700";
const dropdownIndicatorStyles = "p-1 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 rounded-md hover:text-black dark:hover:text-white";
const menuStyles = "p-1 mt-2 border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-100 rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
    base: "hover:cursor-pointer px-3 py-2 rounded my-1",
    focus: "hover:bg-gray-100 dark:hover:bg-gray-900 active:bg-gray-200 dark:active:bg-gray-800",
    selected: "after:ml-2 after:text-green-500 text-gray-900 dark:text-gray-100 bg-gray-300 dark:bg-gray-700",
};
const noOptionsMessageStyles = "text-gray-500 p-2 bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-800 rounded-sm";
  
const customStyles = {
    input: (base) => ({
        ...base,
        "input:focus": {
        boxShadow: "none",
        },
    }),
    multiValueLabel: (base) => ({
        ...base,
        whiteSpace: "normal",
        overflow: "visible",
    }),
    control: (base) => ({
        ...base,
        transition: "none",
    }),
};

const customClassNames = {
    control: ({ isFocused }) =>
        clsx(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base,
        ),
    placeholder: () => placeholderStyles,
    input: () => selectInputStyles,
    valueContainer: () => valueContainerStyles,
    singleValue: () => singleValueStyles,
    multiValue: () => multiValueStyles,
    multiValueLabel: () => multiValueLabelStyles,
    multiValueRemove: () => multiValueRemoveStyles,
    indicatorsContainer: () => indicatorsContainerStyles,
    clearIndicator: () => clearIndicatorStyles,
    indicatorSeparator: () => indicatorSeparatorStyles,
    dropdownIndicator: () => dropdownIndicatorStyles,
    menu: () => menuStyles,
    groupHeading: () => groupHeadingStyles,
    option: ({ isFocused, isSelected }) =>
    clsx(
        isFocused && optionStyles.focus,
        isSelected && optionStyles.selected,
        optionStyles.base,
    ),
    noOptionsMessage: () => noOptionsMessageStyles,
};
  
const SelectSearch = ({ options, placeholder, onChange, ...props}) => {
  return (
    <Select
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        unstyled
        styles={customStyles}
        classNames={customClassNames}
        {...props}
    />
  );
};

export default SelectSearch;
