import  React from "react";
import { Box, Typography, Paper } from "@mui/material";
import UserImage from "components/UserImage";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ result }) => {
    const navigate = useNavigate();
    return (
        <Paper variant="outlined" sx={{ p: 1, mb: 1, display: 'flex', alignItems: 'center' }} onClick={()=>{navigate(`/userprofile/${result._id}`)}}>
            {/* Avatar for the circular logo */}
            {/* <Avatar src={result.picturePath} alt="Profile Pic" sx={{ mr: 2 }} /> */}
            <UserImage image={result.picturePath} alt="Profile Pic" sx={{ mr: 2 }} />

            {/* Name and location */}
            <Box style={{ marginLeft: "3rem" }}>
                <Typography variant="subtitle1" sx={{ mb: 0.5 }}>{`${result.firstName} ${result.lastName}`}</Typography>
                <Typography variant="body2" color="textSecondary">{result.occupation}</Typography>
                <Typography variant="body2" color="textSecondary">{result.location}</Typography>
            </Box>
        </Paper>
    );
};

const SearchWidget = ({ searchResults }) => {
    
    //console.log(searchResults);
    return (
        <Paper variant="outlined" style={{ width: "35rem" }} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
            <Box width={550} style={{ padding: "1rem" }} >
                {/* Display search results */}
                {searchResults.map((result, index) => (
                    <SearchResult key={index} result={result} />
                ))}
            </Box>
        </Paper>
    );
};

export default SearchWidget;
