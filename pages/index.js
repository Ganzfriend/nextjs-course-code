import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://images.unsplash.com/photo-1531944213227-db53a6d0f3bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1482&q=80",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://images.unsplash.com/photo-1542576329-818ff4ffda3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1487&q=80",
    address: "Some address 5, 12345 Some City",
    description: "This is a second meetup!",
  },
];

const HomePage = ({ meetups }) => {
  /* the state and useEffect are no longer necessary now that we have the getStaticProps function returning the meetups data we need, passed in as a prop */
  /* this moves data fetching away from the client side, to the build process */
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // send http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return <MeetupList meetups={meetups} />;
};

// exporting this function (which has to be named such) allows for the server to fetch the data (props) and resolving the Promise, before the rest of the component renders, rather than waiting for this to be done through useEffect
// now this component can be rendered already with the required data present
// one of the main features of NextJS is this data fetching for pre-rendering
export async function getStaticProps() {
  // this code never executes on the client side, but during the build process
  // it never executes on the machines of the visitors
  // e.g. fetch data from an API

  // use the revalidate property in the return object in order to use incremental static generation
  // used to update data from database, rather than using same static page that was built on last production build
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10, // NextJS will now wait 10 seconds till it regenerates this page for an incoming request, so it's generated not just during the build process, but also every few seconds on the server (if there are requests for this page)
  };
}

/* alternative to getStaticProps() */

/*
export async function getServerSideProps(context) {
  // here, you can access all the request headers, body, authentication tokens, cookies, etc.
  const {req. res} = context;

  // this function doesn't run during build process
  // it runs on the server after deployment
  // still for fetching data from an API or file system
  // this always runs on server, not client
  // here, you can run serverside code and perform operations that use credentials that should not be exposed to your users, because it only runs on the server
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    }, // revalidating isn't necessary b/c this function runs for every incoming request anyway, so there's no need to revalidate every X seconds
  };

}
*/

/* CONCLUSION: If you don't have data that changes multiple times every few seconds and/or need accesss to the request object, like for authentication info, getStaticProps is better because you don't have to wait for your page to be generated on every incoming request. Instead, you pre-generate an HTML file, which can be stored by and served by a CDN, and fetching that is faster because then it can be cached and reused.  */

export default HomePage;
