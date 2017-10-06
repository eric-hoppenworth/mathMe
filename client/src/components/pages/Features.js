import React from "react";
import InfoRow from "../InfoRow";

class Features extends React.Component {

	myInfo = [{
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
		
	
	
	render () {
		return (
			<div>
				<InfoRow light = {true} info = {this.myInfo} />
			</div>
		);	
	}
	
};

export default Features;