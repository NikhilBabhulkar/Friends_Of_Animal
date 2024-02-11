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

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React components
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";

// Images
import post1 from "assets/images/examples/blog1.jpg";
import post2 from "assets/images/examples/blog4.jpg";
import post3 from "assets/images/examples/blog3.jpg";
import post4 from "assets/images/examples/blog5.png";

function Places() {
  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={6}>
          <MKTypography variant="h3" mb={6}>
            Check Some latest Blogs
          </MKTypography>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post1}
              title="Safety first! Why you should pet-proof your home"
              description="Pet-proofing your home is a must to ensure the safety and well-being of your furry friends. Whether you have a new puppy, kitten, or adult pet, taking precautions to prevent accidents ."
              action={{
                type: "internal",
                route:
                  "https://www.amtmindia.org/safety-first-why-you-should-pet-proof-your-house/",
                color: "info",
                label: "read more",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post2}
              title="How pets boost our health and moods"
              description="Pets can have a significant impact on our health and well-being in many ways. They can positively affect our physical, mental, emotional, and psychological health with their unconditional love."
              action={{
                type: "internal",
                route: "https://www.amtmindia.org/how-pets-boost-our-health-and-moods/",
                color: "info",
                label: "read more",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post3}
              title="Cage Free Versus Free Range Eggs – The Cruelty Quotient"
              description="While cage-free and free-range systems are improvements over battery cages, they still pose an assorted range of welfare issues. For higher animal welfare standards,                             "
              action={{
                type: "internal",
                route:
                  "https://www.amtmindia.org/cage-free-vs-free-range-eggs-the-cruelty-quotients/",
                color: "info",
                label: "read more",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BackgroundBlogCard
              image={post4}
              title="FoA has been working to free animals from cruelty"
              description="."
              action={{
                type: "internal",
                route: "https://www.amtmindia.org/blog/",
                label: "read more",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;
