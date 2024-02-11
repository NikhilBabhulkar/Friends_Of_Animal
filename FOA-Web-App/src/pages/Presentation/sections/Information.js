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

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/calf2.jpg";
import bgBack from "assets/images/cat-rotate.png";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={<>Saving Lives: Support Animal Rescue Today</>}
                description="Your support can save lives. Help rescue and care for animals in need. Every donation counts. Join our mission to make a difference and give these innocent lives a chance. Donate now and be a hero for animals.
                "
              />
              <RotatingCardBack
                image={bgBack}
                title="Caring for Animals: Donate Today"
                description="Your donation makes a difference. Help injured and abandoned animals find hope, shelter, and care. Every contribution matters. Give now to be a part of our compassionate community and change lives."
                action={{
                  type: "internal",
                  route: "/sections/page-sections/page-headers",
                  label: "Donate",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="pets"
                  title=" Animal Welfare"
                  description="Our unwavering commitment to animal welfare is at the heart of everything we do. We provide shelter, medical care, and love to animals in need, while advocating for responsible pet ownership and the prevention of cruelty."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="favorite_outline"
                  title="Adoption"
                  description="We encourage you to consider adoption as your first choice for adding a furry family member. By adopting, you save lives and provide loving homes to animals in search of a second chance
                  ."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="favorite"
                  title="Save Animals"
                  description="We're dedicated to rescuing and caring for those who cannot speak for themselves. Your support makes their second chances possible."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="school"
                  title="Education and Advocacy"
                  description="We believe in educating the public about animal welfare. Explore resources for responsible pet care, adoption, and advocacy efforts to improve animal protection laws."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
