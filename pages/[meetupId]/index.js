// this folder name in brackets is another way to allow for dynamic nested pages
// localhost:3000/<anything> will now lead to this endpoint
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://images.unsplash.com/photo-1531944213227-db53a6d0f3bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1482&q=80"
      title="First Meetup"
      address="Some Street 5, San Francisco"
      description="This is a first meetup"
    />
  );
};

export default MeetupDetails;
