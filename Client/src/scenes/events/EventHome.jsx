import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import './EventHome.css';
import Navbar from 'scenes/navbar';
import Lottie from 'lottie-react'; // Import Lottie component
import { useSelector, useDispatch } from 'react-redux'
import animationData from '../../lotties/Success.json';
//import { setEvents } from "state";
import axios from 'axios';

function EventHome() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  // const events = useSelector((state) => state.events);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [userHook, setUserHook] = useState(user);
  const [events, setEvents] = useState([]);



  const handleParticipate = async (eventId) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_LOCAL}/events/participate/${eventId}`,
        { userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setUserHook(response.data);
        setOpenModal(true);
        // Update the events array to reflect the user's participation
        const updatedEvents = events.map((event) =>
          event._id === eventId
            ? { ...event, participants: [...event.participants, user._id] }
            : event
        );
        setEvents(updatedEvents);
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  

  useEffect(() => {

    const getEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL}/events/`, {
          headers:
            { Authorization: `Bearer ${token}` }
        });
        setEvents(response.data);
       // console.log("useEffect Called")
      } catch (error) {
        console.log(error);
      }
    }
    getEvents();
  }, [])

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='heading-div'>
          <h2>Upcoming Events</h2>
        </div>

        <div className='events-div'>
          <Grid container spacing={3}>
            {events.map(event => (
              <Grid key={event._id} item xs={12} sm={6} md={4} lg={4}>
                <Card className='event'>
                  <Box className='event-image'>
                    <img src={`${process.env.REACT_APP_LOCAL}/assets${event.eventPosterUrl}`} alt={event.eventName} />
                  </Box>
                  <CardContent className='event-content'>
                    <Typography variant="h3" component="div" style={{ marginBottom: "1rem" }}>
                      {event.eventName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {event.description}
                    </Typography>
                    <Typography variant="h5" color="text.primary" style={{marginTop:'2rem'}}>
                      {`Start Date- ${event.startdate}`}<br></br>{`End Date- ${event.deadline}`}
                    </Typography>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => handleParticipate(event._id)}
                      disabled={event.participants.includes(user._id)}
                      style={{ margin: '1rem' }}
                    >
                      {event.participants.includes(user._id) ? 'Already Participated' : 'Participate'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>
            <Typography variant="h4" color="success" style={{ textAlign: "center" }}>
              Hurray...! You have participated in Event 🎉
            </Typography>
          </DialogTitle>
          <DialogContent className='custom-dialog-content'>
            {/* Lottie Animation */}
            <Box style={{ textAlign: 'center' }}>
              <Lottie
                animationData={animationData}
                isClickToPauseDisabled={true} // Disable click to pause
                isPaused={false} // Set to true to pause the animation
                speed={1} // Adjust the speed of the animation
                style={{ width: '100%', height: 'auto', maxWidth: '400px' }} // Set max width for responsiveness
              />
            </Box>

            {/* Custom OK button */}
            <Button variant="contained" sx={{ backgroundColor: '#4CAF50', color: 'white' }} className='custom-ok-button' onClick={handleCloseModal}>
              OK
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default EventHome;
