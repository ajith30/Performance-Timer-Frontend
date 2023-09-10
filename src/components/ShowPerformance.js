import { useContext } from 'react';
import { Button, Container, Typography } from '@mui/material';
import PerformanceContext from "../context/PerformanceContext";


const ShowPerformance = () => {
  const { records, events, deleteFeedback } = useContext(PerformanceContext);

  return (
    <Container>
      <Typography variant="h4" gutterBottom marginTop={3} marginBottom={3}>
        Show Performance
      </Typography>
      {events.map((event) => (
        <div key={event}>
          <Typography variant="h5" mt={2}>Top 5 Timings in {event} Event</Typography>
          {records[event.toLowerCase()].length === 0 ? (
            <Typography>No record is present for the event.</Typography>
          ) : (
            records[event.toLowerCase()].slice(0, 5).map((record, index) => (
              <div key={index}>
                <Typography>
                  Distance: {record.distance} &nbsp;&nbsp;&nbsp;&nbsp; Time: {record.time}
                </Typography>
              </div>
            ))
          )}
        </div>
      ))}
      <Button variant="contained" color="error" sx={{marginTop: 2}}  onClick={() => { 
        deleteFeedback();
      }}
      >Delete All Records</Button>
    </Container>
  );
};

export default ShowPerformance;
