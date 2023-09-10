import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box sx={{width: "100%", objectFit: "contain", maxHeight: "400px"}} flex={6} p={2} mt={10}>
        <img src="https://cdn.dribbble.com/users/1022481/screenshots/3018253/404-snow.gif" alt="Not Found"></img>
    </Box>
);
}

export default NotFound;
