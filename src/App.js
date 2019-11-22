import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form';
import Recipes from './Components/Recipes';
const API_KEY = '3bc54f2d0b502e5346307eea74174cd8';
export class App extends Component {
  state = {
    recipes: []
  };

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes);
  };

  componentDidMount = () => {
    const json = localStorage.getItem('recipes');
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  };

  getRecipe = async e => {
    e.preventDefault();
    const recipeName = e.target.elements.recipeName.value;
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=12
    `);
    const data = await api_call.json();
    this.setState({ recipes: data.recipes });
    console.log(this.state.recipes);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Recipe Search</h2>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
