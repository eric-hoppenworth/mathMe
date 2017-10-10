import React from 'react';

const QuizCard = (props) => {
	return (
        <div className="card quizCard text-center">
            <img className="card-img-top mx-auto d-block" src={props.image} alt={props.title}/>
            <div className="card-body">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text">{props.text}</p>
                <button className="btn btn-primary" name = {props.title} onClick = {props.handleClick}>Start</button>
            </div>
        </div>
	);
}

export default QuizCard;