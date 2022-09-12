import ReactDOM from "react-dom/client";
import {NavBar} from './navBar';
import {CourseFullPage, CourseHeader} from './courseInfoPageComponents.js'
import React from "react";

import './styles/common.css';
import './styles/coursePage.css';

let currentKey = 0;
let apiUrl = "http://localhost:8000/";
const navBar = ReactDOM.createRoot(document.querySelector("#nav-bar"));
const courseHeader = ReactDOM.createRoot(document.querySelector("#course-header"));
const mainSection = ReactDOM.createRoot(document.querySelector("#main-section"));

window.onload = () => {
	navBar.render(<NavBar key={currentKey++}/>);
	fetchCourseData("JavaScript for Beginners");
};

function fetchCourseData(courseName) {
	courseName = courseName.replace(/\s/g, "");
	fetch(apiUrl + courseName)
		.then((response) => response.json())
		.then((data) => {
			renderWholePage(data)
		});
}

function renderWholePage(courseData) {
	courseHeader.render(<CourseHeader key={currentKey++} {...courseData.header}/>);
	mainSection.render(<CourseFullPage key={currentKey++} {...courseData}/>)
}