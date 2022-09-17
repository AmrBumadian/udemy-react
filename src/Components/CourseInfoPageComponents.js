import React from 'react';
import {Rating} from './CourseCardComponent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
	faAward,
	faCirclePlay,
	faStar,
	faUserGroup,
	faChevronDown,
	faChevronUp
} from '@fortawesome/free-solid-svg-icons'
import {FooterComponent} from "./FooterComponent";
import {useParams} from "react-router-dom";
import {NavBarComponent} from "./NavBarComponent";

import '../styles/course-page.css';

let apiUrl = "http://localhost:5000/";

class CourseHeader extends React.Component {
	render() {
		return (
			<header id="course-page-header">
				<section>
					<h2>{this.props.courseName}</h2>
					<p>{this.props.courseTitle}</p>
					<Rating rate={this.props.courseRate} ratesCount={this.props.ratingsCount}
					        enrolled={this.props.enrolled}/>
					<span>Created by <span className="underlined">{this.props.author}</span></span>
				</section>
			</header>
		);
	}
}

class CourseNav extends React.Component {
	render() {
		return (
			<section id="course-nav">
				<section>
					<span>Overview</span>
					<span>Curriculum</span>
					<span>Instructor</span>
					<span>Reviews</span>
				</section>
			</section>
		)
	}
}

class CourseOverview extends React.Component {
	render() {
		let currentKey = 0;
		let whatYouWillLearn = this.props.learning.map((s) => <li key={currentKey++}>{s}</li>);
		return (
			<section id="overview">
				<h2>What you'll learn</h2>
				<ul>
					{whatYouWillLearn}
				</ul>
			</section>
		)
	}
}

class ChapterLabel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dropped: false
		}
	}

	toggle() {
		if (this.state.dropped) {
			document.querySelector(`#${this.props.labelFor}`).setAttribute("hidden", "true");
		} else {
			document.querySelector(`#${this.props.labelFor}`).removeAttribute("hidden");
		}
		this.setState({dropped: !this.state.dropped});
	}

	render() {
		return (
			<label htmlFor={this.props.sectionName} onClick={() => {
				this.toggle()
			}}>
				<span>
					{(this.state.dropped) ? <FontAwesomeIcon icon={faChevronUp}/> :
						<FontAwesomeIcon icon={faChevronDown}/>}
					<span>{this.props.sectionName}</span>
				</span>
				<span id="chapter-summary">
					<span>{this.props.lecturesCount} lectures</span>
					<span>{" • "}</span>
					<span>{this.props.duration}</span>
				</span>
			</label>
		)
	}
}

class CourseContent extends React.Component {

	render() {
		let currentKey = 0;
		let currentChapter = 1;
		let courseContent = this.props.courseContent.lectures.map((section) => {
			let childKey = 0;
			return (
				<section className="inner-content" key={currentKey++}>
					<ChapterLabel labelFor={`chapter${currentChapter}`} sectionName={section.sectionName}
					              duration={section.duration} lecturesCount={section.contents.length}/>
					<ul id={`chapter${currentChapter++}`} hidden={true}>
						{
							section.contents.map((lecture) => {
								return (
									<li key={childKey++}>
										<span>
											<FontAwesomeIcon icon={faCirclePlay}/>
											<span className="lecture-name">{lecture}</span>
											<FontAwesomeIcon className="lecture-dropdown" icon={faChevronDown}/>
										</span>
										<span className="preview">Preview</span>
										<span className="duration">22:22</span>
									</li>
								)
							})
						}
					</ul>
				</section>
			)
		});
		return (
			<section id="course-info">
				<h2>Course content</h2>
				<section id="course-content-summary">
					<span>
						<span>{this.props.courseContent.sectionCount} sections</span>
						<span>{" • "}</span>
						<span>{this.props.courseContent.lectureCount} lectures</span>
						<span>{" • "}</span>
						<span>{this.props.courseContent.totalDuration} total length</span>
					</span>
					<span id="expand-all">Expand all sections</span>
				</section>
				<section id="course-content">
					{courseContent}
				</section>
			</section>
		)
	}
}

class CourseDescription extends React.Component {

	render() {
		let currentKey = 0;
		let requirements = this.props.requirements.map((r) => <li key={currentKey++}>{r}</li>);
		let description = this.props.description.map((d) => <p key={currentKey++}>{d}</p>)
		return (
			<section>
				<section id="requirements">
					<h2>Requirements</h2>
					<ul>
						{requirements}
					</ul>
				</section>
				<section id="description">
					<h2>Description</h2>
					{description}
				</section>
			</section>
		)
	}
}

class CourseInstructors extends React.Component {

	render() {
		let currentKey = 0;
		let instructors = this.props.instructors.map((inst) => {
			let bio = inst.bio.map((b) => <p key={currentKey++}>{b}</p>);
			return (
				<section key={currentKey++} className="instructor">
					<h3 className="bold-underlined">{inst.name}</h3>
					<h4>{inst.title}</h4>
					<section className="instructor-info">
						<img src={`${process.env.PUBLIC_URL}${inst.pic}`} alt="instructor's logo"/>
						<section className="icons">
							<FontAwesomeIcon className="icon" key={currentKey++} icon={faStar}/>
							<FontAwesomeIcon className="icon" key={currentKey++} icon={faAward}/>
							<FontAwesomeIcon className="icon" key={currentKey++} icon={faUserGroup}/>
							<FontAwesomeIcon className="icon" key={currentKey++} icon={faCirclePlay}/>
						</section>
						<section className="info">
							<span>{inst.rate} Instructor Rating</span>
							<span>{inst.reviewsCount} Reviews</span>
							<span>{inst.studentsCount} Students</span>
							<span>{inst.coursesCount} Courses</span>
						</section>
					</section>
					<section id="instructor-bio">{bio}</section>
				</section>
			);
		});

		return (
			<section id="instructors">
				<h2>Instructors</h2>
				{instructors}
			</section>
		)
	}
}

class FixedSide extends React.Component {

	render() {
		let currentKey = 0;
		let contents = this.props.courseSummaryContents.map((c) => <li key={currentKey++}><span>{c}</span></li>);
		return (
			<section id="fixed-side">
				<section id="side-main">
					<section className="prices">
						<span className="current-price">{this.props.currentPrice}</span>
						<span className="old-price">{this.props.oldPrice}</span>
						<span className="discount">{this.props.dicount} off</span>
					</section>
					<button className="purple-button">Add to cart</button>
					<button className="white-button">Buy now</button>
					<span className="caption">30-Day Money-Back Guarantee</span>
					<h3>This course includes:</h3>
					<ul className="side-content">{contents}</ul>
					<section className="links">
						<span>Share</span>
						<span>Gift this course</span>
						<span>Apply Coupon</span>
					</section>
				</section>
				<section id="side-footer">
					<h2>Training 5 or more people?</h2>
					<p>Get your team access to 17,000+ top Udemy courses anytime, anywhere.</p>
					<button className="white-button">Try Udemy Business</button>
				</section>
			</section>
		)
	}
}

class CourseSideInfo extends React.Component {

	render() {
		return (
			<section id="side-list">
				<img src={`${process.env.PUBLIC_URL}${this.props.courseImage}`} alt="course logo"/>
				<FixedSide {...this.props}/>
			</section>
		);
	}
}

class CourseFullPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {courseData: {}};
		this.courseName = this.props.params.courseName;
		console.log(this.courseName);
	}

	componentDidMount() {
		fetch(apiUrl + this.courseName)
			.then((response) => response.json())
			.then((data) => {
				this.setState({courseData: data})
			});
	}

	render() {
		if (!Object.keys(this.state.courseData).length) return <section></section>;
		return (
			<section>
				<NavBarComponent id="other-nav"/>
				<CourseHeader {...this.state.courseData.header}/>
				<CourseNav/>
				<CourseSideInfo currentPrice={this.state.courseData.currentPrice}
				                courseImage={this.state.courseData.courseImage}
				                courseSummaryContents={this.state.courseData.courseSummaryContents}
				                oldPrice={this.state.courseData.oldPrice} dicount={this.state.courseData.discount}/>
				<main id="course-page-main">
					<CourseOverview learning={this.state.courseData.learning}/>
					<CourseContent courseContent={this.state.courseData.courseContent}/>
					<CourseDescription requirements={this.state.courseData.requirements}
					                   description={this.state.courseData.description}/>
					<CourseInstructors instructors={this.state.courseData.instructors}/>
				</main>
				<FooterComponent id="footer"/>}
			</section>
		)
	}
}

function GetFullPage() {
	let params = useParams();
	return (<CourseFullPage params={{...params}}/>);
}

export {
	CourseFullPage,
	GetFullPage
}