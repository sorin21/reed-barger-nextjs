import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Link from 'next/link';

import StoryList from '../components/StoryList';
import Layout from '../components/Layout';

class Index extends Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;

    try {
      // If we are on Home page and we didn't req anothe page before, we should'd have anything in query params
      // so, in cloncluzion, by default will be set to 1
      // If we are not on Home page, we are on a page greater that 1, we take the number from query.page
      //  so if this +(query.page) returs false, we want page to be 1
      page = +(query.page) || 1;
      const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
      // const res = await fetch('https://node-hnapi.herokuapp.com/n');
      // console.log('res', res)
      stories = await res.json();
    } catch (error) {
      console.log(error);
      // to not get any error if we loop over somthing that not iterable, 
      // for example just giving the value of undefined from let stories
      stories = []
    }
    return {
      page,
      stories,
    }
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful", registration);
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }

  render() {
    const { page, stories } = this.props;

    if (stories.length === 0) {
      // we give by default 503 = service unavailable
      //  actually should be 400 = bad request
      return <Error statusCode={400} />
    }
    return (
      <Layout title="Hacker NextJS" description="A Hacker News clone made with NextJS">
        <StoryList stories={stories} />
        <footer>
          {/* take the current value of the page we have and increment that by 1 */}
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>
        <style jsx>{`
      footer {
        padding: 1rem;
      }
      footer a {
        font-weight: bold;
        color: black;
        text-decoration: none;
      }
    `}</style>
      </Layout>
    );
  }
}

export default Index;