import React, { Children } from 'react'
import TextInput from './TextInput';
import { Head, Link, router } from "@inertiajs/react";

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
        <TextInput className={"w-1/2 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-900 " + className}
            placeholder={ placeholder ? placeholder : 'Cari...' }
            defaultValue={queryParams[name]}
            onBlur={e => searchFieldChanged(name, e.target.value)}
            onKeyPress={e => onKeyPress(name, e)}/>
    );
}


const Search = {};

Search.Input = SearchInput;

export default Search;