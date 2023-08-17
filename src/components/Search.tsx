import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface ISearchProps {
    onSearch?: (value: string) => Promise<void>;
    placeholder?: string;
}

const Search: React.FC<ISearchProps> = ({ onSearch, placeholder = '' }) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onSearch) {
            await onSearch(searchValue);
        }
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default Search;
