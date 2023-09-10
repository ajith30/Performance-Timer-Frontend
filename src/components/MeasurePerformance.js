
import { useContext, useEffect, useState } from "react";
import {
  Typography,
  Button,
  MenuItem,
  Grid,
  FormControl,
  Box,
  Container,
  Select
} from "@mui/material";
import PerformanceContext from "../context/PerformanceContext";
import { formatTime } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import "../index.css"


const MeasurePerformance = () => {
  const {
    events,
    distances,
    records,
    saveRecord,
  } = useContext(PerformanceContext);

  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  // Reset the timer when a new distance is selected
  useEffect(() => {
    setTime(0);
    setIsRunning(false);
  }, [selectedDistance]);

  const handleStartPause = () => {
    // Start the timer only when both event and distance are selected
    if (selectedEvent && selectedDistance) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleSaveRecord = async () => {
    if (selectedEvent && selectedDistance) {
      const newRecord = {
        event: selectedEvent,
        distance: selectedDistance,
        time: formatTime(time),
      };

      saveRecord(newRecord);
    }
  };

  const handleEventChange = (newEvent) => {
    setSelectedEvent(newEvent);
    setSelectedDistance('');
    setTime(0);
    setIsRunning(false);
  };

  const getLastSavedRecord = (event) => {
    const eventRecords = records[event.toLowerCase()];
    if (eventRecords.length > 0) {
      const lastRecord = eventRecords[eventRecords.length - 1];
      return `Distance: ${lastRecord.distance} - Time: ${lastRecord.time}`;
    }
    return "Yet to be added";
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom marginTop={3} marginBottom={3}>
        Measure Performance
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select 
              value={selectedEvent}
              onChange={(e) => handleEventChange(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select an Event
              </MenuItem>
              {events.map((event) => (
                <MenuItem key={event} value={event}>
                  {event}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select 
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value)}
              displayEmpty
              disabled={!selectedEvent}
            >
              <MenuItem value="" disabled>
                Select Distance
              </MenuItem>
              {selectedEvent &&
                distances[selectedEvent].map((distance) => (
                  <MenuItem key={distance} value={distance}>
                    {distance}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box mt={2} textAlign="center">
        <Typography variant="h5" marginTop={4} marginBottom={2}>
          Stopwatch
        </Typography>
        <Typography variant="h4" marginTop={2} marginBottom={2}>
          {formatTime(time)}
        </Typography>

        <Box display="flex" justifyContent="center" gap={4}>
          <Button
            variant="contained"
            color={isRunning ? "secondary" : "primary"}
            onClick={handleStartPause}
          >
            {isRunning ? "Pause" : time === 0 ? "Start" : "Resume"}
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveRecord}
          disabled={!selectedEvent || !selectedDistance}
        >
          Save Record
        </Button>
      </Box>

      <Box textAlign="center" marginTop={3}>
        <Typography variant="h5" mt={2}>
          Latest Performance Record
        </Typography>
        {events.map((event) => (
          <div key={event}>
            <Typography variant="h6">{event}</Typography>
            <Typography>{getLastSavedRecord(event)}</Typography>
          </div>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" marginTop={3} gap={5}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/all-performance");
          }}
        >
          See All Records
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/show-performance");
          }}
        >
          Top 5 Records
        </Button>
      </Box>
    </Container>
  );
};

export default MeasurePerformance;
