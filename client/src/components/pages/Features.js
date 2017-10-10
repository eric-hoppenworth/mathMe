import React from "react";
import InfoRow from "../InfoRow";

class Features extends React.Component {

	myInfo = [{
		text: String.raw`$$ \frac{\begin{array}[b]{r}\left. 54 \right. \\ + \left. 5 \right. \end{array} }{ \left.  \right.} $$`,
		class: "mathItem"
	},{
		text: "This page will contain a more in-depth look at the features our site has to offer."
	},{
		text: "It will show a few different type of problems, and hopefully some pictures of the games."
	},{
		text: String.raw`$$ ${10} \overline{\smash{)} 200 } $$`,
		class: "mathItem"
	}];
		
	
	
	render () {
		return (
			<div>
				<InfoRow light = {true} info = {this.myInfo} />
			</div>
		);	
	}
	
};

export default Features;