import React, { Component } from 'react';

class Table extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    //  Other Functions
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
            })
    }
    render() {
        return(
            <div></div>
        )
    }

}

export default Table