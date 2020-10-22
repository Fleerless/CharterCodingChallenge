import React, { Component } from 'react';
import tableData from './tableData.json'

class Table extends Component {
    constructor() {
        super()
        this.state = {
            displayedRestaurants: [],
            filteredInput: ""
        }

        this.filterBySearch = this.filterBySearch.bind(this);

        this.handleSearchFilter = this.handleSearchFilter.bind(this);

        this.parseInput = this.parseInput.bind(this);
        this.toggleErrorMessage = this.toggleErrorMessage.bind(this);
        this.changePage = this.changePage.bind(this);
        this.updateTable = this.updateTable.bind(this)

    }

    // Search Functions
    filterBySearch = async () => {
            // Filter Array Based on Associated Select Element Value
            let restaurantsFiltered = this.state.availableRestaurants.filter(restaurant => {
                let isContained = false;
                // Convert String Into Array and Filter
                const restaurantGenres = restaurant.genre.split(',');
                // Convert First Letter to Upper Case
                const searchValue = this.state.filteredInput.charAt(0).toUpperCase() + this.state.filteredInput.slice(1).toLowerCase();
                restaurantGenres.map(genre => {
                    if (genre.includes(searchValue)) {
                        return isContained = true
                    }
                })
                if (isContained) {
                    return restaurant
                } else if (restaurant.city.includes(this.parseInput())) {
                    return restaurant
                } else {
                    return restaurant.name.includes(this.parseInput())
                }
            });
            await this.setState({
                availableRestaurants: restaurantsFiltered
            })
            await this.updateTable()
            this.toggleErrorMessage(this.state.availableRestaurants)

        };

    // Handler Functions
    handleSearchFilter(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.key === 'Enter') {
                this.filterBySearch();
            };
            // Only Works When Using Backspace On Individual Letters
            if (this.state.filteredInput.length < 1) {
                this.resetResults();
            };
    };

    // Helper Functions
    resetResults = async () => {
        await this.setState({
            availableRestaurants: this.state.originalRestaurants
        })
        this.updateTable()
    };

    parseInput = () => {
        const inputArray = this.state.filteredInput.split(' ');
        let inputArrayStringified = ''
        inputArray.map(string => {
            const capitalString = string.charAt(0).toUpperCase() + string.slice(1);
            inputArrayStringified = `${inputArrayStringified} ${capitalString}`
        });
        return inputArrayStringified.slice(1)
    };

    toggleErrorMessage = (array) => {
        const message = document.getElementById('message')
        array.length !== 0 ?
            message.setAttribute('style', 'visibility: hidden')
            :
            message.setAttribute('style', 'visibility: visible')
    };

    changePage = (event) => {
        const page = event.target.value;
        console.log(typeof page);
        switch ( page) {
            case "2": 
                this.setState({
                    displayedRestaurants: this.state.restaurantsPage2
                });
                break;
                case "3": 
                this.setState({
                    displayedRestaurants: this.state.restaurantsPage3
                });
                break;
                case "4": 
                this.setState({
                    displayedRestaurants: this.state.restaurantsPage4
                });
                break;
            default: 
                this.setState({
                    displayedRestaurants: this.state.restaurantsPage1
                })
        }
    };

    updateTable = async () => {
        await this.setState({
            restaurantsPage1: this.state.availableRestaurants.slice(0, 10),
            restaurantsPage2: this.state.availableRestaurants.slice(11, 20),
            restaurantsPage3: this.state.availableRestaurants.slice(21, 30),
            restaurantsPage4: this.state.availableRestaurants.slice(31, 40),
        })
        this.setState({
            displayedRestaurants: this.state.restaurantsPage1
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
                                onKeyDown={this.handleSearchFilter} 
                                id='search-input' 
                                placeholder='Search by Name, City, or Genre' 
                                value={this.state.filteredInput}
                                />
                                <button onClick={this.filterBySearch}>Search</button>
                                <button onClick={this.resetResults}>Reset Restaurants</button>
                            </div>
                        </div>
                    </div>

                    <div id='filter-elements'>
                        <h3>Filters</h3>
                        <div id='filter-interactions'>
                            <div id='state-interactions'>
                                <label for='state-select'>By State:</label>
                                <select 
                                id='state-list' 
                                onChange={this.handleSearchFilter}
                                name="state-select"
                                >
                                    <option value='1'>Choose a State...</option>
                                    {/* retreive States array[50] from state and create an option element for each State */}
                                    {tableData.states.map((state, index) => (
                                        <option value={state} key={index}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div id='genre-interactions'>
                                <label for='genre-select'>By Genre:</label>
                                <select id='genre-list' 
                                name='genre-select' 
                                onChange={this.handleSearchFilter}>
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
                    <button onClick={this.changePage} value={1}>1</button>
                    <button onClick={this.changePage} value={2}>2</button>
                    <button onClick={this.changePage} value={3}>3</button>
                    <button onClick={this.changePage} value={4}>4</button>
                </div>
            </div>        )
    }

}

export default Table