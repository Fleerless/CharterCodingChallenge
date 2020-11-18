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
        this.filterByState = this.filterByState.bind(this);
        this.filterByGenre = this.filterByGenre.bind(this);
        this.searchAfterFilterReset = this.searchAfterFilterReset.bind(this);


        this.handleSearchFilters = this.handleSearchFilters.bind(this);

        this.parseInput = this.parseInput.bind(this);
        this.toggleErrorMessage = this.toggleErrorMessage.bind(this);
        this.changePage = this.changePage.bind(this);
        this.updateTable = this.updateTable.bind(this);
        this.toggleDisplayedButtons = this.toggleDisplayedButtons.bind(this);

    }

    // Filter Functions
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
                    return restaurant.name.includes(this.parseInput());
                }
            });
            await this.setState({
                availableRestaurants: restaurantsFiltered
            });
            await this.updateTable();
            this.toggleErrorMessage(this.state.availableRestaurants);
            this.toggleDisplayedButtons();
        };

    filterByState = async () => {
    // Filter Array Based on Associated Select Element Value
    let restaurantsFiltered = this.state.availableRestaurants.filter(restaurant => {
        return restaurant.state === this.state.stateSelect
    });
    await this.setState({
        availableRestaurants: restaurantsFiltered
    }) 
    this.updateTable()
    this.toggleErrorMessage(this.state.availableRestaurants)

};

    filterByGenre = async () => {
    let restaurantsFiltered = this.state.availableRestaurants.filter(restaurant => {
        let isContained = false;
        // Convert String Into Array and Filter
        const restaurantGenres = restaurant.genre.split(',');
        restaurantGenres.map(genre => {
            if (genre === this.state.genreSelect) {
                return isContained = true
            }
        });
        if (isContained) {
            return restaurant
        }
    });
    await this.setState({
        availableRestaurants: restaurantsFiltered
    }) 
    this.updateTable()
    this.toggleErrorMessage(this.state.availableRestaurants)
};

    // Handler Functions
    handleSearchFilters = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        await this.setState({
            [name]: value
        });
        // Adds Enter key funtionality
        if (event.key === 'Enter') {
                await this.filterBySearch();
            };
        // Resets restaurants in input firld is cleared 
        if (name === 'filteredInput' && this.state.filteredInput.length < 1) {
            await this.resetResults();
            this.toggleDisplayedButtons();
        };
        // Filters by State or Genre in that dropdown is selected
        if (name === "stateSelect") {
            await this.filterByState();
            this.toggleDisplayedButtons()
        } else if (name === "genreSelect") {
            await this.filterByGenre();
            this.toggleDisplayedButtons()
        };
        // Allows filters to be removed by unselecting them
        this.searchAfterFilterReset(name, value)
    };

    // Helper Functions
    resetResults = async () => {
        await this.setState({
            availableRestaurants: this.state.originalRestaurants,
            stateSelect: "",
            genreSelect: ""
        });
        this.updateTable();
        this.toggleErrorMessage(this.state.availableRestaurants);
        document.getElementById('state-list').selectedIndex = 0;
        document.getElementById('genre-list').selectedIndex = 0;
        this.toggleDisplayedButtons();       
    };
    
    searchAfterFilterReset = async (name, value) => {
        if (name === 'genreSelect' && value === '1' && this.state.stateSelect === '1'){
            await this.setState({
                availableRestaurants: this.state.originalRestaurants,
            });
            this.filterBySearch()
            } else if (name === 'genreSelect' && value === '1'){
                await this.setState({
                    availableRestaurants: this.state.originalRestaurants,
                });
                this.filterByState()
                this.filterBySearch()
            }
        if (name === 'stateSelect' && value === '1' && this.state.stateSelect === '1'){
            await this.setState({
                availableRestaurants: this.state.originalRestaurants,
            });
            this.filterBySearch()
            } else if (name === 'stateSelect' && value === '1'){
                await this.setState({
                    availableRestaurants: this.state.originalRestaurants,
                });
                this.filterByGenre()
                this.filterBySearch()
            };
    }

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

    toggleDisplayedButtons = () => {
        const button1 = document.getElementById('button1');
        const button2 = document.getElementById('button2');
        const button3 = document.getElementById('button3');
        const button4 = document.getElementById('button4');
        if (this.state.restaurantsPage1.length < 1) {
            button1.style.display = 'none'
        }
        if (this.state.restaurantsPage1.length > 0) {
            button1.style.display = 'initial'
        }
        if (this.state.restaurantsPage2.length < 1) {
            button2.style.display = 'none'
        }
        if (this.state.restaurantsPage2.length > 0) {
            button2.style.display = 'initial'
        }
        if (this.state.restaurantsPage3.length < 1) {
            button3.style.display = 'none'
        }
        if (this.state.restaurantsPage3.length > 0) {
            button3.style.display = 'initial'
        }
        if (this.state.restaurantsPage4.length < 1) {
            button4.style.display = 'none'
        }
        if (this.state.restaurantsPage4.length > 0) {
            button4.style.display = 'initial'
        }
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
               
                        <div id='search-elements'>
                            <h5>Please type your search</h5>
                            <div id='search-interactions'>
                                <input 
                                name="filteredInput"
                                onChange={this.handleSearchFilters} 
                                onKeyDown={this.handleSearchFilters} 
                                id='search-input' 
                                placeholder='Search by Name, City, or Genre' 
                                value={this.state.filteredInput}
                                />
                                <button onClick={this.filterBySearch} id='search-button'>Search</button>
                                <button onClick={this.resetResults} id='reset-button'>Reset Restaurants</button>
                            </div>
                        </div>

                    <div id='filter-elements'>
                        <h3>Filters</h3>
                        <h5>Return drop-down filters to "Choose..." option to deactivate filter</h5>
                        <div id='filter-interactions'>
                            <div id='state-interactions'>
                                <label for='state-select'>By State:</label>
                                <select 
                                id='state-list' 
                                onChange={this.handleSearchFilters}
                                name="stateSelect"
                                >
                                    <option value='1'>All States</option>
                                    {/* retreive States array[50] from state and create an option element for each State */}
                                    {tableData.states.map((state, index) => (
                                        <option value={state} key={index}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div id='genre-interactions'>
                                <label for='genre-select'>By Genre:</label>
                                <select 
                                id='genre-list' 
                                name='genreSelect' 
                                onChange={this.handleSearchFilters}>
                                    <option value='1'>All Genres</option>
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
                                <tr id={`t-row-${index + 1}`} key={index}>
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
                    <button id='button1' onClick={this.changePage} value={1}>1</button>
                    <button id='button2' onClick={this.changePage} value={2}>2</button>
                    <button id='button3' onClick={this.changePage} value={3}>3</button>
                    <button id='button4' onClick={this.changePage} value={4}>4</button>
                </div>
            </div>        )
    }

}

export default Table