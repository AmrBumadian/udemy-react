import React from 'react';
import {NavBarComponent} from "./NavBarComponent";
import {Slicker} from "./CourseCardComponent";

import '../styles/home.css';
import {Outlet} from "react-router-dom";

let allCoursesCache = [];
let apiUrl = "http://localhost:8000/";

class HomeHeader extends React.Component {
	render() {
		return (
			<header id="home-header">
				<section>
					<h2> 24-Hour Flash Sale</h2>
					<p>
						Learn valuable, practical skills for less. Log in to see deals on courses. Sale ends tonight!
					</p>
				</section>
				<img src={`${process.env.PUBLIC_URL}/assets/images/holding-clock.jpg`} alt="Man holding a sand-clock"/>
			</header>
		);
	}
}

class CategoriesNav extends React.Component {

	render() {
		return (
			<ul className="categories" onClick={this.props.handleChange}>
				{
					this.props.categories.map((c, currentKey) => {
						let id = c.replace(/\s/g, "");
						if (id === this.props.chosenCategory) {
							return <li key={currentKey} id={id} className="chosen-category">{c}</li>;
						}
						return <li key={currentKey} id={id}>{c}</li>;
					})
				}
			</ul>
		)
	}
}

class CourseCategory extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			coursesData: {},
		}
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.categoriesNames = [];
	}

	componentDidMount() {
		this.fetchAllCoursesData();
	}

	componentWillUnmount() {
		allCoursesCache = [];
	}

	fetchAllCoursesData() {
		fetch(apiUrl + "db")
			.then(response => response.json())
			.then(data => {
				for (let category in data) {
					this.categoriesNames.push(data[category]["name"]);
					for (let course of data[category]["courses"]) {
						allCoursesCache.push(course);
					}
				}
				this.setState({
					coursesData: data,
					currentShownCategory: Object.keys(data).at(0)
				});
			});
	}

	handleCategoryChange(event) {
		if (event.button !== 0) return;
		let clickedListElement = event.target;
		let chosenElementId = clickedListElement.getAttribute("id");
		if (event.target.tagName !== "LI" || this.state.currentShownCategory === chosenElementId) return;
		document.querySelector(".chosen-category").classList.remove("chosen-category");
		clickedListElement.classList.add("chosen-category");
		this.setState({currentShownCategory: chosenElementId});
		event.stopPropagation();
	}

	render() {
		if (Object.keys(this.state.coursesData).length === 0) return null;
		let currentCategoryData = this.state.coursesData[this.state.currentShownCategory];
		return (
			<section>
				<CategoriesNav categories={this.categoriesNames}
				               chosenCategory={this.state.currentShownCategory}
				               handleChange={this.handleCategoryChange}/>
				{(currentCategoryData == null) ? (<section></section>) :
					(<section className="category">
						<h3>{currentCategoryData.title ?? ""}</h3>
						<p className="category-description">{currentCategoryData.description ?? ""}</p>
						<button id="explore-category">Explore {currentCategoryData.name ?? ""}</button>
						<section id="courses" className="courses"><Slicker courses={currentCategoryData.courses}/>
						</section>
					</section>)}
			</section>
		)
	}
}

class HomeMain extends React.Component {

	render() {
		return (
			<main id="home-main">
				<h2>A broad selection of courses</h2>
				<p>
					Choose from 185,000 online video courses with new additions published
					every month
				</p>
				<Outlet/>
			</main>
		)
	}
}

class HomePageComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			allCoursesData: {}
		}
	}

	render() {
		return (
			<section>
				<NavBarComponent id="home-nav"/>
				<HomeHeader/>
				<HomeMain/>
			</section>
		)
	}
}

export {
	HomePageComponent,
	CourseCategory
}