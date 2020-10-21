import React, { Component } from 'react';
import tableData from './tableData.json'

class Table extends Component {
    constructor() {
        super()
        this.state = {
            displayedRestaurants: [],
            restaurantsPage1: [],
            restaurantsPage2: [],
            restaurantsPage3: [], 
            restaurantsPage4: [],
            currentPage: 1,
            filteredInput: ""
        }
        this.handleSearchFilter = this.handleSearchFilter.bind(this)
    }
    handleSearchFilter(event) {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    //  Lifecycle Methods
    componentDidMount() {
        fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
            headers: {
                Authorization: "Api-Key q3MNxtfep8Gt",
            },
        })
            // Parse the response
            .then(function (response) {
                return response.json();
            })
            // Save to State
            .then((data) => {
                // sort data by name property and save to state
                this.setState({
                    originalRestaurants: (data.sort((a, b) => (a.name > b.name) ? 1 : -1)),
                    availableRestaurants: (data.sort((a, b) => (a.name > b.name) ? 1 : -1))
                })
            }).then(() => {
                this.setState({
                    restaurantsPage1: this.state.availableRestaurants.slice(0, 10),
                    restaurantsPage2: this.state.availableRestaurants.slice(11, 20),
                    restaurantsPage3: this.state.availableRestaurants.slice(21, 30),
                    restaurantsPage4: this.state.availableRestaurants.slice(31, 40),
                })
            }).then(() => {
                this.setState({
                    displayedRestaurants: this.state.restaurantsPage1
                })
            })
    }
    render() {
        // Search Functions
        const filterBySearch = () => {
            // Filter Array Based on Associated Select Element Value
            let restaurantsFiltered = this.state.availableRestaurants.filter(restaurant => {
                let isContained = false;
                // Convert String Into Array and Filter
                const restaurantGenres = restaurant.genre.split(',');
                restaurantGenres.map(genre => {
                    // Convert First Letter to Upper Case
                    const searchValue = this.state.filteredInput.charAt(0).toUpperCase() + this.state.filteredInput.slice(1).toLowerCase();
                    if (genre.includes(searchValue)) {
                        return isContained = true
                    }
                })
                if (isContained) {
                    return restaurant
                } else if (restaurant.city.includes(parseInput())) {
                    return restaurant
                } else {
                    return restaurant.name.includes(parseInput())
                }
            });
            this.setState({
                availableRestaurants: restaurantsFiltered
            })
            toggleErrorMessage(this.state.availableRestaurants)

        };

        //  Handler Functions
        // handleSearchFilter = (event) => {
        //     console.log(event.target.value);
        //     this.setState({
        //         filteredInput: event.target.value
        //     });
        //     if (event.key === 'Enter') {
        //         filterBySearch();
        //     };
        //     // Only Works When Using Backspace On Individual Letters
        //     if (this.state.filteredInput.length < 1) {
        //         resetResults();
        //     };
            
        // };

        const handleStateSelect = (event) => {
            this.setState({
                stateSelect: event.target.value
            });
        };

        const handleGenreSelect = (event) => {
            this.setState({
                genreSelect: event.target.value
            })
        };
        // Helper Functions
        const resetResults = () => {
            this.setState({
                availableRestaurants: this.state.originalRestaurants
            })
        };

        const parseInput = () => {
            const inputArray = this.state.filteredInput.split(' ');
            let inputArrayStringified = ''
            inputArray.map(string => {
                const capitalString = string.charAt(0).toUpperCase() + string.slice(1);
                inputArrayStringified = `${inputArrayStringified} ${capitalString}`
            });
            return inputArrayStringified.slice(1)
        };

        const toggleErrorMessage = (array) => {
            const message = document.getElementById('message')
            array.length !== 0 ?
                message.setAttribute('style', 'visibility: hidden')
                :
                message.setAttribute('style', 'visibility: visible')
        };

        const changePage = (event) => {
            this.setState({
                currentPage: event.target.value
            })
        };
        return(
            <div>
                <div>
                    <div id='header-elements'>
                        <h2>Welcome to RestaurantSearch<span class='light-blue'>!</span></h2>
                        <h5>The best restaurant search engine in this repository<span class='light-blue'>!</span></h5>
                        <h6>Or your money back<span class='light-blue'>!</span></h6>
                        <div id='search-elements'>
                            <h5>Please type your search</h5>
                            <div id='search-interactions'>
                                <input 
                                name="filteredInput"
                                onChange={this.handleSearchFilter} 
                                id='search-input' 
                                placeholder='Search by Name, City, or Genre' 
                                value={this.state.filteredInput}
                                />
                                <button onClick={filterBySearch}>Search</button>
                                <button onClick={resetResults}>Reset Restaurants</button>
                            </div>
                        </div>
                    </div>

                    <div id='filter-elements'>
                        <h3>Filters</h3>
                        <div id='filter-interactions'>
                            <div id='state-interactions'>
                                <label for='state-select'>By State:</label>
                                <select id='state-list' onChange={handleStateSelect}>
                                    <option value='1'>Choose a State...</option>
                                    {/* retreive States array[50] from state and create an option element for each State */}
                                    {tableData.states.map((state, index) => (
                                        <option value={state} key={index}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div id='genre-interactions'>
                                <label for='genre-select'>By Genre:</label>
                                <select id='genre-list' name='genre-select' onChange={handleGenreSelect}>
                                    <option value='1'>Choose a Genre...</option>
                                    {/* retreive genres array from state and create an option element for each genre */}
                                    {tableData.genres.map((genre, index) => (
                                        <option value={genre} key={index}>{genre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id='message-div'>
                        <span id='message' style={{ visibility: 'hidden' }}>There are no results. Please choose another selection</span>
                    </div>
                </div>
                <div id='table'>
                    <table>
                        <thead>
                            <tr>
                                <th id='name'>Name:</th>
                                <th id='city'>City:</th>
                                <th id='state'>State:</th>
                                <th id='phone'>Phone:</th>
                                <th id='genre'>Genre:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* retreive displayedRestaurants array[0-9] from state and create a table row for each restaurant */}
                            {this.state.displayedRestaurants.map((restaurant, index) => (
                                <tr key={index}>
                                    <td>
                                        <div class='table-data'>
                                            {restaurant.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div class='table-data'>
                                            {restaurant.city}
                                        </div>
                                    </td>
                                    <td>
                                        <div class='table-data'>
                                            {restaurant.state}
                                        </div>
                                    </td>
                                    <td>
                                        <div class='table-data'>
                                            {restaurant.telephone}
                                        </div>
                                    </td>
                                    <td>
                                        <div class='table-data'>
                                            {restaurant.genre}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id='page-buttons'>
                    <button onClick={changePage} value={1}>1</button>
                    <button onClick={changePage} value={2}>2</button>
                    <button onClick={changePage} value={3}>3</button>
                    <button onClick={changePage} value={4}>4</button>
                </div>
            </div>        )
    }

}

export default Table