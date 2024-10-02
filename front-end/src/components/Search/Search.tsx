import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface SearchInputProps {
    onSearch: (value: string) => void;
    placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder }) => {
    return (
        <Search
            placeholder={placeholder}
            onSearch={onSearch}
            style={{ width: 300 }}
        />
    );
};

export default SearchInput;
