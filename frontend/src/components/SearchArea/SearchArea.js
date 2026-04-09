import './SearchArea.css';

function SearchArea() { 
    return (        
        <div className='search-area' id='search-area'>
            <div className='container'>
                <h2>Search for Movies, Actors and more...</h2>    
                <form className='search-input'>
                    <input type='text' className='input-search' placeholder='Search movies, actors...'/>
                    <button className='btn-search'>Search</button>
                </form>
            </div>
        </div>
    );
}
export default SearchArea;