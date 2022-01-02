import React, { useState, useEffect, ReactElement, createContext } from 'react';

import axios from 'axios';

import mockFollowers from './mockData.js/mockFollowers';
import mockRepos from './mockData.js/mockRepos';
import mockUser from './mockData.js/mockUser';

const rootUrl = 'https://api.github.com';
const initValue = 0;

// @ts-ignore
const GithubContext = createContext();

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }: any): ReactElement => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request loading
  const [requests, setRequests] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: '' });

  //  check rate
  const toggleError = (show = false, msg = ''): void => {
    setError({ show, msg });
  };
  const checkRequests = (): any => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        const {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === initValue) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch(err => console.log(err));
  };

  const searchGithubUser = async (user: any): Promise<any> => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch(err =>
      console.log(err),
    );
    if (response) {
      setGithubUser(response.data);
      // eslint-disable-next-line camelcase
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        // eslint-disable-next-line camelcase
        axios(`${followers_url}?per_page=100`),
      ])
        .then(results => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const [repos, followers] = results;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch(err => console.log(err));
    } else {
      toggleError(true, 'there is no user with that username');
    }
    checkRequests();
    setIsLoading(false);
  };

  // error
  useEffect(checkRequests, []);
  // get initial user
  useEffect(() => {
    searchGithubUser('vadzimka0');
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
