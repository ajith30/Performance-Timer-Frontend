import { Box, Button, Container, Typography } from "@mui/material";
import { useContext } from "react";
import PerformanceContext from "../context/PerformanceContext";

const AllPerformance = () => {
  const { records, events, deleteFeedback } = useContext(PerformanceContext);
 

  return (
    <Container>
      <Typography variant="h4" gutterBottom marginTop={3} marginBottom={3}>
        All 10 performance records of each events
      </Typography>

      <Box>
        {events.map((event) => (
          <div key={event}>
            <Typography variant="h6" mt={2}>
              {event}
            </Typography>
            {records[event.toLowerCase()].length === 0 ? (
              <Typography>No record is present for the event.</Typography>
            ) : (
              records[event.toLowerCase()].map((record, index) => (
                <div key={index}>
                  <Typography>
                    Distance: {record.distance}&nbsp;&nbsp;&nbsp;&nbsp; Time: {record.time}
                  </Typography>
                </div>
              ))
            )}
          </div>
        ))}

        <Button variant="contained" color="error" sx={{marginTop: 2}}  onClick={() => { deleteFeedback()}}>Delete All Records</Button>
      </Box>
    </Container>
  );
};

export default AllPerformance;
