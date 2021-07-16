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
export async function getStaticProps() {
  // this code never executes on the client side, but during the build process
  // it never executes on the machines of the visitors
  // e.g. fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
