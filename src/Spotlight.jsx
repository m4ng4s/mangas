import React, {Component} from 'react';
import * as misc from './../lib/misc';

import "./../assets/css/spotlight.css";

class Spotlight extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount() {
		misc.init_spotlight(() => {
			alert('enter cuy')
		})
	}
	render () {
		return (
			<div id="spotlight_wrapper">
				<input type="text" id="spotlight" placeholder="Manga Search" />
			</div>
		)
	}
}

export default Spotlight