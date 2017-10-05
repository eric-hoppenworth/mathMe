import React from "react";
import MathJax from 'react-mathjax-preview';
//Info Row assumes that it gets an array of things to display (props.info)
//The array will have objects with image and txt properties

const InfoRow = (props) => {
	return (
		<div className = {"row " + (props.light ? "light-row": "") + " text-center"} >
			{props.info.map( (item,index) =>{
				return (
					<div key={index} className = {item.class ? item.class +' col-6 infoItem' : "col-6 infoItem"}>
						{ item.image && <img src={item.image} alt = {item.alt}/>}
			        	{item.class === 'mathItem' ? <MathJax math = {item.text}/> : item.text && <h4>{item.text}</h4>}
			        	{item.subText && <h4>{item.subText}</h4>}
			      	</div>
				);
			})}
			{props.children}
	    </div>
	);
}

export default InfoRow;