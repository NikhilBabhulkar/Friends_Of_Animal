/* eslint-disable react/no-unescaped-entities */
/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";

// Images
import appleLogo from "assets/images/gray-dog.avif";
import facebookLogo from "assets/images/gray-cat.avif";
import nasaLogo from "assets/images/gray-rabbi.avif";
import vodafoneLogo from "assets/images/gray-hen.avif";
import digitalOceanLogo from "assets/images/horse.avif";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          {/* <MKTypography variant="h2">Our Reviews</MKTypography> */}
          <MKTypography variant="h2" color="info" textGradient mb={2}>
            Animal Lover
          </MKTypography>
          <MKTypography variant="body1" color="text" mb={2}>
            We are a passionate community dedicated to making a difference in the lives of our
            beloved animal companions. Whether you're a devoted pet owner, a wildlife enthusiast, or
            a champion for animal rights, our organization welcomes you with open arms
          </MKTypography>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 8 }}>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Haythahie  Balakrishnan"
              date="1 day ago"
              review="Seeing nearly 1000 dogs in the shelter well maintained, properly given food, medical care and specially love made me speechless. This visit opened many more perspectives about life. Now whenever and however possible I am helping this NGO. I am giving this testimonial so that other also can have the credibility, because I visited this place in person."
              rating={5}
              style={{
                border: "1px solid #ddd !important", // Add border styles here
                borderRadius: "5px", // Optional: Add border radius for rounded corners
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              sx={{
                backgroundColor: "red", // Change this to your desired hover color
                color: "#fff", // Change text color when hovered if needed
                // Add any other hover styles as needed
              }}
              name="Arun Vignesh"
              date="1 week ago"
              review="Changing thousands of lives is a great thing and a tough thing as well. I am here to let the visitors know that this 100% serving animal serving organization. Compassion for animals is intimately associated with goodness of character, and it may be confidently asserted that he who is cruel to animals cannot be a good man."
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="Dusty Fate"
              date="3 weeks ago"
              review="For over 20 years, I’ve been a supporter of BFAS. Their mission is similar to other animal rescues, but their strategies & tactics to achieve those goals align perfectly with grassroots efforts. Plz support BFAS, they are the real deal."
              rating={5}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 6 }} />
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={appleLogo} alt="Apple" width="100%" opacity={0.6} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={facebookLogo} alt="Facebook" width="100%" opacity={0.6} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={nasaLogo} alt="Nasa" width="100%" opacity={0.6} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox component="img" src={vodafoneLogo} alt="Vodafone" width="100%" opacity={0.6} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MKBox
              component="img"
              src={digitalOceanLogo}
              alt="DigitalOcean"
              width="100%"
              opacity={0.6}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
