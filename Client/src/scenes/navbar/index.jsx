import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import SearchWidget from "scenes/widgets/SearchWidget";
import axios from "axios";
import HelpModal from "../widgets/HelpModal"; // Import the HelpModal component

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // State for controlling the modal
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const [searchTerm, setSearchTerm] = useState("");
  const [Suggestions, setSuggestion] = useState([]);
  const token = useSelector((state) => state.token);

  const handleSearchInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    try {
      const res = await axios.get(
        `http://localhost:3001/users/search/${searchTerm}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuggestion(res.data);
    } catch (error) {
      console.log(error);
      setSuggestion([]);
    }
    setShowSuggestion(!!value);
  };

  return (
    <>
      {/* Navbar */}
      <FlexBetween padding="1rem 6%" backgroundColor={alt} position="relative">
        <FlexBetween gap="1.75rem">
          {/* Logo */}
          <img
            src={`${process.env.REACT_APP_LOCAL}/assets/foalogo.png`}
            alt="Logo"
            style={{ height: "40px", marginRight: "1rem" }}
          />
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            Friends of Animals
          </Typography>
          {/* Always render search bar */}
          <Box position="relative">
            <Box
              backgroundColor="light"
              borderRadius="9px"
              padding="0.1rem 1.5rem"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <InputBase
                placeholder="Search..."
                onChange={handleSearchInputChange}
              />
              <IconButton>
                <Search />
              </IconButton>
            </Box>
            {/* Conditionally render suggestions */}
            {showSuggestion && (
              <Box
                position="absolute"
                top="calc(100% + 10px)" // Adjust the spacing as needed
                left="0"
                zIndex="999"
              >
                <SearchWidget searchResults={Suggestions} />
              </Box>
            )}
          </Box>
        </FlexBetween>
        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help
              sx={{ fontSize: "25px",cursor:"pointer" }}
              onClick={() => setIsHelpModalOpen(true)} // Open the help modal
            />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    window.location.href = "http://localhost:3002";
                  }}
                >
                  <Typography>Dashboard</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              {/* Move search bar to mobile menu */}
              <Box
                backgroundColor="light"
                borderRadius="9px"
                padding="0.1rem 1.5rem"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <InputBase
                  placeholder="Search..."
                  onChange={handleSearchInputChange}
                />
                <IconButton>
                  <Search />
                </IconButton>
              </Box>

              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help
                sx={{ fontSize: "25px",cursor:"pointer" }}
                onClick={() => setIsHelpModalOpen(true)} // Open the help modal
              />
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      window.location.href = "http://localhost:3002";
                    }}
                  >
                    <Typography>Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>

      {/* Render the HelpModal component */}
      <HelpModal
        open={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)} // Close the help modal
      />
    </>
  );
};

export default Navbar;
