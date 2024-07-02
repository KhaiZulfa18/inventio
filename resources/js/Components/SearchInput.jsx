import React, { Children } from 'react'
import TextInput from './TextInput';
import { Head, Link, router } from "@inertiajs/react";
import SelectInput from './SelectInput';

const SearchInput = ({className, url, name, queryParams, placeholder = ''}) => {

    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value;
        }else {
            delete queryParams[name];
        }

        router.get(url,queryParams);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    return (
        <TextInput className={"w-full bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-900 " + className}
            placeholder={ placeholder ? placeholder : 'Cari...' }
            defaultValue={queryParams[name]}
            onBlur={e => searchFieldChanged(name, e.target.value)}
            onKeyPress={e => onKeyPress(name, e)}/>
    );
}


const SearchSelect = ({className, url, name, queryParams = {}, children, ...props}) => {

    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value;
        }else {
            delete queryParams[name];
        }

        router.get(url,queryParams);
    }

    return (
        <SelectInput {...props} className={"w-full " + className} 
        defaultValue={queryParams.category}
        onChange={e => searchFieldChanged(name, e.target.value)}>
            {children}
        </SelectInput>
    );
}

const Search = {};

Search.Input = SearchInput;
Search.Select = SearchSelect;

export default Search;