import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');


    const inputHandler = (e) => {
        const { value, name } = e.target
        setInput(value);
    }

    const searchHandler = (e) => {
        e.preventDefault();
        setSearch(input);
        navigate(`/search?q=${input}`)
    }

    return (
        <>
            <form onSubmit={searchHandler}>
                <input type="text" onChange={inputHandler} />
                <button>SC</button>
            </form>
            <div className="n">
                검색값 {search}
            </div>
        </>
    )
}

export default Search;