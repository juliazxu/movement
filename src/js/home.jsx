import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
				<h1>Movement!</h1>
        <Link to='/create'><button>Create a petition!</button></Link>
			</div>
    )
  }
}
