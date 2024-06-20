import React from "react";
//other-libs
import { useDispatch, useSelector } from "react-redux";
//types
import { AppDispatch, RootState } from "../../state/store";
//reducers
import { setFilterValue } from "../../state/search/searchSlice";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const search = useSelector((state: RootState) => state.search);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterValue(e.target.value));
    };

    return (
        <div className='search_bar'>
            <input
                value={search}
                onChange={handleSearchChange}
                className='search_input'
                placeholder='Search for item'
            />
        </div>
    )
}

export default Header;