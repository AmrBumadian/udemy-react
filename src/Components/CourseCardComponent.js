import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar, faStarHalfStroke, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

function cumulativeOffset(element) {
	let top = 0;
	do {
		top += element.offsetTop || 0;
		element = element.offsetParent;
	} while (element);
	return top;
}

function fixPosition(element) {
	return setInterval(() => {
		if (document.querySelector(".course")) {
			let courseElement = document.querySelector(".course");
			let pos = cumulativeOffset(courseElement) + courseElement.offsetHeight / 3.5;
			element.setState({startPos: pos});
			clearInterval(this.interval);
		}
	}, 100);
}


class PrevArrow extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			startPos: 500
		}
		this.interval = fixPosition(this);
	}

	render() {
		return (
			<button style={{top: this.state.startPos}} id="prev-button" onClick={this.props.onClick}><FontAwesomeIcon
				icon={faChevronLeft}/></button>
		)
	}
}

class NextArrow extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			startPos: 500
		}
		this.interval = fixPosition(this);
	}

	render() {
		return (
			<button style={{top: this.state.startPos}} id="next-button" onClick={this.props.onClick}><FontAwesomeIcon
				icon={faChevronRight}/></button>
		)
	}
}

class Slicker extends React.Component {
	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.settings = {
			infinite: true,
			autplay: true,
			autoplaySpeed: 2000,
			speed: 1000,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1080,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 650,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			],
		};
	}

	next() {
		this.slider.slickNext();
	}

	previous() {
		this.slider.slickPrev();
	}

	render() {
		let currentKey = 0;
		let coursesCard = this.props.courses.map((course) => {
			return (<CourseCardComponent key={currentKey++} {...course}/>)
		});
		return (
			<section>
				<Slider ref={c => (this.slider = c)} {...this.settings}>
					{(coursesCard.length) ? coursesCard :
						<h2 className="empty-courses">There are no courses available</h2>}
				</Slider>
				<NextArrow onClick={this.next}/>
				<PrevArrow onClick={this.previous}/>
			</section>
		)
	}
}

class CourseCardComponent extends React.Component {
	render() {
		return (
			<Link to={`/courses/${this.props.courseName.replace(/\s/g, "")}`}>
				<section className="course">
					<img src={`${process.env.PUBLIC_URL}${this.props.imageSrc}`} alt={this.props.imageAlt}/>
					<h4 className="course-name">{this.props.courseName}</h4>
					<h5 className="author">{this.props.author}</h5>
					<Rating rate={this.props.rate} enrolled={this.props.enrolled}/>
					<section>
						<span className="price">{this.props.currentPrice}</span>
						<span className="old-price">{this.props.oldPrice}</span>
					</section>
				</section>
			</Link>
		);
	}
}

class Rating extends React.Component {

	appendRatingStars(courseRating) {
		let currentKey = 0;
		let stars = [];
		let rateFloat = parseFloat(courseRating);
		while (rateFloat >= 1) {
			let star = <FontAwesomeIcon key={currentKey++} icon={faStar}/>
			stars.push(star);
			--rateFloat;
		}
		if (rateFloat > 0) {
			let star = <FontAwesomeIcon key={currentKey++} icon={faStarHalfStroke}/>
			stars.push(star);
		}
		return stars;
	}

	render() {
		return (
			<section className="rating">
				<section className="stars">
					<span>{this.props.rate}</span>
					{this.appendRatingStars(this.props.rate)}
				</section>
				{this.props.ratesCount && <span className="underlined">{`(${this.props.ratesCount} ratings)`}</span>}
				<span className="enrolled">{this.props.enrolled} students</span>
			</section>
		);
	}
}

export {
	Slicker,
	Rating
}
