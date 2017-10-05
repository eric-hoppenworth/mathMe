import React from "react";
import Navbar from "../Navbar";
import SignInForm from "../SignInForm";
import Footer from "../Footer";
import InfoRow from "../InfoRow";

const Splash = (props) =>{
	let myInfo = [{
		alt: "Math Problem",
		image: "http://www.gmatfree.com/MR-2014/image004.png",
		text: "MathMe helps students by providing extra practice for basic arithmatic at varrying levels of complexity."
	},{
		alt: "Multiplication Table",
		image: "https://i.pinimg.com/736x/34/f8/c7/34f8c7a5b0e448bae971ef42f7eb442a--multiplication-tables-times-tables.jpg",
		text: "MathMe also provides tools to aid in basic rote memorization.  This includes not only basic addition and multiplication tables, but also their inverses: subtraction and division."
	}];
	console.log("Props:",props);
	return (
		<div className = "container-fluid">
			<Navbar />
			<SignInForm />
			<InfoRow light = {true} info = {myInfo} />
			<Footer />
		</div>
	);

}

export default Splash;