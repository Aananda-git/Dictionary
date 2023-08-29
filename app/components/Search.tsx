import React from "react";

const Search = () => {
    return(
        <div  >
            <input
                type="search"
                id="searchInput"
                name="search"
                className="w-3/4 h-10  rounded-3xl bg-stone-100"
                placeholder="Enter your search"
                
            /> 
        </div>
    );
};

export default Search;