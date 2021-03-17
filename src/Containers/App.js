import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import { Heroes } from './Heroes';
import logo from './MLBBLogo.svg';
import loading from './loading.svg';
import './app.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            Heroes: Heroes,
            searchField: '',
            imageIsReady: true
        }
    }

    componentDidMount() {
        // setTimeout(() => {
        //     const ie = document.querySelectorAll('img');
        //     ie.map(imgElm => {
        //         for (const img of imgElm) {
        //             if (!img.complete) {
        //                 this.setState({ imageIsReady : true});
        //                 console.log('2 ' + this.state.imageIsReady);
        //             }
        //         }
        //         clearTimeout();
        //         return this.setState({ imageIsReady : false});
        //     })
        // }, 750);
        Promise.all(
            Array.from(document.images)
                .filter(img => !img.complete)
                .map(img => new Promise(
                    resolve => { img.onload = img.onerror = resolve; }
                )))
                .then(() => {
                    this.setState({ imageIsReady: false })
                });
    }

    onSearchChange = (event) => {   
        this.setState({ searchField: event.target.value})
    }  

    render() {
        console.log('1 ' + this.state.imageIsReady);
        const filteredHeroes = this.state.Heroes.filter(Heroes =>{
            return Heroes.heroname.toLowerCase().includes(this.state.searchField.toLowerCase());
        })
        return (
            <div className='font-mono text-center'>
                {
                    this.state.imageIsReady ?
                        <div className='inset-0 fixed flex justify-center z-20 w-full h-full bg-black bg-opacity-25 blur'>
                            <img src={loading} className='w-3/12' alt="load"/>
                        </div> :
                        <div className='hidden '>
                            <img src={loading} alt="load"/>
                        </div>
                }
                <header className='pt-2 h-1/3 flex flex-col items-center justify-center'>
                    <img src={logo} className='w-3/5 md:w-1/5' alt="MLBBlogo"/>
                    <h1 className='text-2xl text-gray-200 font-bold'>Fans Database</h1>
                </header>
                <SearchBox searchChange={this.onSearchChange} />
                <div className='overflow-y-auto h-plus md:h-96'>
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