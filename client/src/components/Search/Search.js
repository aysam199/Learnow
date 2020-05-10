import './Search.css';
import React, { useState, useEffect } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Spinner from '../Spinner/Spinner';
import axiosGet from '../../utils/axiosGet';

const Search = props => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState(null);
  const [term, setTerm] = useState(props.match.params.term);
  const [page, setPage] = useState(+props.match.params.page);
  const reqTime = React.useRef(0);
  useEffect(() => {
    setSearchResult(null);
    setLoading(true);
    setTerm(props.match.params.term);
    setPage(+props.match.params.page);
  }, [props.match.params.term, props.match.params.page]);

  useEffect(() => {
    let requestPath = `/getcourses/?search=${term}&page=${page}&page_size=50`;
    reqTime.current = new Date();
    setLoading(true);
    axiosGet(requestPath)
      .then(res => {
        if(!res.data.count) 
          setError(`Empty result`);
        else{
          reqTime.current = new Date() - reqTime.current;
          setError(null);
          setLoading(false);
          setSearchResult(res);
        }
      })
      .catch(err => {
        setError(err);
      });
  }, [term, page]);

  if (error) {
    if(error ===`Empty result`) 
    return (<h2>No courses found, try again.</h2>);
    else
    return (<h2>Unexpected error happened..</h2>);
  }
  if (loading) return Spinner();
  if (searchResult) {
    return (
      <SearchResults
        time={reqTime.current}
        data={searchResult.data}
        setPage={setPage}
        page={page}
      />
    );
  }
  return Spinner();
};

export default Search;
