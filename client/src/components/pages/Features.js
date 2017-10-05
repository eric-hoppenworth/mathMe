import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import InfoRow from "../InfoRow";

class Features extends React.Component {
	state = {
		info: []
	};
	componentWillMount() {
		const myInfo = [{
			text: String.raw`$$ \frac{\begin{array}[b]{r}\left. 5 \right. \\ \times \left. 3 \right. \end{array}}{  15 }$$`,
			class: "mathItem"
		},{
			text: "This page will contain a more in-depth look at the features our site has to offer."
		},{
			text: "It will show a few different type of problems, and hopefully some pictures of the games."
		},{
			text: String.raw`$$ \frac{\begin{array}[b]{r}\left. 153 \right. \\ - \left. 76 \right. \end{array}}{  ? }$$`,
			class: "mathItem"
		}];
		this.setState({
			info: myInfo
		});
	}
	
	render () {
		return (
			<div className = "container-fluid">
				<Navbar />
				<InfoRow light = {true} info = {this.state.info} />
				<Footer />
			</div>
		);	
	}
	
};

export default Features;