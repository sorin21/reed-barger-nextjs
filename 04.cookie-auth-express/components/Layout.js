import Link from 'next/link';
import Head from 'next/head';

const Layout = ({ children, title, description, auth }) => {
  // auth comes from props <Layout title="Home" {...props}>
  const { user = {} } = auth || {};

  return (
    <div className="">
      <Head>
        <title>{title} | NEXTJS</title>
        <meta name="description" content={description} />
      </Head>
      <div className="root">
        <nav className="navbar">
          <span>Welcome,<strong> {user.name || "Guest"} </strong></span>
          <div>
            <Link href="/">
              <a><span className="main-title">Home</span></a>
            </Link>
            {user.email ?
              (<>
                <Link href="/profile">
                  <a><span className="main-title">Profile</span></a>
                </Link>
                <Link href="/">
                  <a className="logout">Logout</a>
                </Link>
                <Link href="/login">
                  <a><span className="main-title">Login</span></a>
                </Link>
              </>) :
              (<Link href="/login">
                <a><span className="main-title">Login</span></a>
              </Link>)}
          </div>
        </nav>
        <h1>{title}</h1>
        {children}
      </div>
      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .navbar {
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        a {
          margin-right: 1rem !important;
        }
        .logout {
          text-decoration: underline;
          padding: 0;
          font: inherit;
          cursor: pointer;
          border-style: none;
          color: rgb(0,0,238);
        }
        .main-title {
          /* margin-left: 1rem; */
        }
      `}
      </style>
    </div>
  );
};

export default Layout;