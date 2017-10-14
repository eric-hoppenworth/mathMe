import React from "react";

class InfoStat extends React.Component {

	render() {
		let percent;
		if(this.props.total){
			percent = parseInt((this.props.correct/this.props.total) * 100,10)
		} else {
			percent = "0"
		}
		percent = percent + "%";

		const style = {
			width: percent
		};

		return(
			<div className = "col with-border" >
				<div className ="row" >
					<div className = "col-1" ></div>
					<div className = "col-3" >
						{this.props.title}
					</div>
					<div className = "col-8" ></div>
				</div>
				<div className = "row" >
					<div className = "col-2"></div>
					<div className = "col-8 back-bar" >
						<div className = "bar" style = {style}> </div>
					</div>
					<div className = "col-2"></div>
				</div>
				<div className = "row" >
					<div className = "col-2"></div>
					<div className = "col-8" >
						{this.props.correct} / {this.props.total}
					</div>
					<div className = "col-2"></div>
				</div>
			</div>
		);
	}	
}

export default InfoStat;