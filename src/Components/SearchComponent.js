import {useSearchParams} from "react-router-dom";
import React from "react";
import {Slicker} from "./CourseCardComponent";

let apiUrl = "http://localhost:8000/";

class SearchResult extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchResult: []
		};
	}

	componentDidMount() {
		this.fetchAllCoursesData();
	}

	fetchAllCoursesData() {
		fetch(apiUrl + "db")
			.then(response => response.json())
			.then(data => {
				let filteredCourses = [];
				for (let category in data) {
					for (let course of data[category]["courses"]) {
						if (course["courseName"].search(new RegExp(this.props.query, "i")) !== -1) filteredCourses.push(course);
					}
				}
				this.setState({
					searchResult: filteredCourses
				});
			});
	}

	render() {
		if (this.state.searchResult.length === 0) return null;
		return (
			<section className="category">
				<section id="courses" className="courses">
					<Slicker courses={this.state.searchResult}/>
				</section>
			</section>
		)
	}
}

export function SearchResultWrapper() {
	let [searchParams] = useSearchParams();
	return <SearchResult query={searchParams.get("query")}/>;
}