import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const API_KEY = '3bc54f2d0b502e5346307eea74174cd8';
export class Recipe extends Component {
  state = {
    activeRecipe: []
  };
  componentDidMount = async () => {
    const title = this.props.location.state.recipe;
    const req = await fetch(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=${title}&count=12
    `);
    const res = await req.json();
    this.setState({ activeRecipe: res.recipes[0] });
    console.log(this.state.activeRecipe);
  };
  render() {
    const recipe = this.state.activeRecipe;
    return (
      <div className="container text-center mt-3">
        {this.state.activeRecipe.length !== 0 && (
          <div className="active-recipe">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="active-recipe__img"
            />
            <h3 className="active-recipe__title">{recipe.title}</h3>
            <h4 className="active-recipe__publisher">
              Publisher: <span>{recipe.publisher}</span>
            </h4>
            <p className="active-recipe__website">
              Website:{' '}
              <span>
                <a href={recipe.publisher_url}>{recipe.publisher_url}</a>
              </span>
            </p>
            <button className="btn btn-outline-danger btn-lg mb-3">
              <Link to="/">Home Page</Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Recipe;
