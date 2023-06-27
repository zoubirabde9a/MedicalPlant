import React, { useState } from 'react';

function SearchBar(props) {
    const {setFilterText, setFilter} = props;
    const [searchText, setSearchText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleTextChange = (e) => {
        setFilterText(e.target.value);
        setSearchText(e.target.value);
    };

    const handleFilterChange = (filter) => {
        setFilter(filter);
        setSelectedFilter(filter);
    };

    const handleSearch = () => {

        // Reset search text
        setSearchText('');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Recherge..."
                value={searchText}
                onChange={handleTextChange}
            />
            <select value={selectedFilter} onChange={(e) => handleFilterChange(e.target.value)}>
                <option value="">Select Filter</option>
                <option value="latinName">Nom Latin</option>
                <option value="arabicName">Nom Arabe</option>
                <option value="commonName">Nom Commun</option>
            </select>
            <button onClick={handleSearch}>Recherche</button>
        </div>
    );
}

export default SearchBar;
