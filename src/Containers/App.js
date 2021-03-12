import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import { Heroes } from './Heroes';
import logo from './MLBBLogo.svg';
import './app.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            Heroes: Heroes,
            searchField: ''
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value})
    }  

    render() {
        const filteredHeroes = this.state.Heroes.filter(Heroes =>{
            return Heroes.heroname.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        return (
            <div className='font-mono text-center'>
                <header className='pt-2 h-1/3 flex flex-col items-center justify-center'>
                    <img src={logo} className='w-3/5 md:w-1/5' alt="MLBBlogo"/>
                    <h1 className='text-2xl text-gray-200 font-bold'>Fans Database</h1>
                </header>
                <SearchBox searchChange={this.onSearchChange} />
                <div className='overflow-y-auto h-96'>
                    <CardList Heroes={filteredHeroes} />
                </div>
                <footer>
                    <h1 className='pt-4 text-gray-200'>Build by Alfian Nahar</h1>
                </footer>
            </div>     
        );
    }
}


export default App;