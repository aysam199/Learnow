import './SearchResults.css';
import React, { useState, useEffect } from 'react';
import CoursePage from '../../pages/CoursePage';

const SearchResults = ({
  time, data, setPage, page,
}) => {
  const [state, setState] = useState({
    courses: data.results,
    selectedCourse: null,
    error: false,
  });

  const { courses } = state;

  const buildPageUrls = numberOfPages => Array(numberOfPages)
    .fill(null)
    .map((_, index) => (
        <li onClick={() => setPage(index + 1)} key={index + 1}>
          <h5 className="page-number">{index + 1}</h5>
        </li>
    ));

  useEffect(() => {
    setState(prevState => ({ ...prevState, courses: data.results }));
  }, [data]);

  if (!courses || !courses.length) {
    setState(prevState => ({ ...prevState, error: true }));
  }
  if (state.error) {
    return (
      <div className="no-results-container">
        <h3>Sorry . . . We could not find anything</h3>
      </div>
    );
  }

  const results = courses.map(course => (
    <li key={course.id}>
      <img alt="course-image" src={course.image_240x135} />
      <div className="course-description">
        <h2>{course.title}</h2>
        <h3>{course.headline}</h3>
        <span
          onClick={() => setState(prevState => ({ ...prevState, selectedCourse: course }))
          }
          className="details-button grow"
        >
          More details
        </span>
      </div>
    </li>
  ));

  if (state.selectedCourse) {
    return <CoursePage state={state} setState={setState} />;
  }
  return (
    <div className="results-container">
      <span className="results-count">{`${data.count} results found in ${time
        / 1000} Seconds`}</span>
      <ul className="results-list">{results}</ul>
      <div className="page-nav-container">
        <ul className="page-nav">
          <li
            key="prev"
            onClick={() => setPage(page => (page <= 1 ? page : +page - 1))}
          >
            {'<'}
          </li>
          {buildPageUrls(10)}
          <li
            key="next"
            onClick={() => setPage(page => (page >= Math.floor(data.count / 50) ? page : +page + 1))
            }
          >
            {'>'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
