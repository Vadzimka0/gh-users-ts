import React, { ReactElement } from 'react';

// import { Info, Repos, User, Search, Navbar } from '../components';
import { GithubContext } from '../context/context';
import loadingImage from '../images/preloader.gif';

const Dashboard = (): ReactElement => {
  // @ts-ignore
  const { isLoading } = React.useContext(GithubContext);
  if (isLoading) {
    return (
      <main>
        {/*<Navbar />*/}
        {/*<Search />*/}
        <img src={loadingImage} className="loading-img" alt="loding" />
      </main>
    );
  }
  return (
    <main>
      {/*<Navbar />*/}
      {/*<Search />*/}
      {/*<Info />*/}
      {/*<User />*/}
      {/*<Repos />*/}
    </main>
  );
};

export default Dashboard;
