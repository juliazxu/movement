import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home'
import Create from './create'

class App extends React.Component{
	constructor() {
		super()
	}
		
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path='/' component={Home} />
					<Route path='/create' component={Create} />
				</div>
 			</BrowserRouter>
		)
	}
}


export default App

ReactDOM.render(<App />, document.getElementById('root'))
