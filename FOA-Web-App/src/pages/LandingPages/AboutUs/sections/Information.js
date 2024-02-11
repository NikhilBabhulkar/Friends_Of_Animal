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
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="attach_money"
                    title="For NonProfit"
                    description="Learn more about how our best-in-class technology can help inspire more giving overall and make your organization shine."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="3p"
                    title=" FAO & Support"
                    description="Learn more about how our best-in-class technology can help inspire more giving overall and make your organization shine."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="favorite"
                    title=" Donate to FOA"
                    description="Learn more about how our best-in-class technology can help inspire more giving overall and make your organization shine."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="pets"
                    title="Animal Adoption Hub"
                    description="Explore how our platform connects families with rescue organizations, simplifying the process of adopting animals in need and promoting responsible pet adoption."
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image="https://imengine.prod.srp.navigacloud.com/?uuid=A5F5CAE6-DA2A-4E7A-B250-64FA54DDA080&type=primary&q=72&width=1024"
              title="Focusing on Pet rescue Rehabilation
              and Adoption
              "
              description="We are a passionate organization dedicated to rescuing, rehabilitating, and finding loving homes for pets in need. Our mission is to give every animal a second chance at a happy, healthy life through pet rescue and adoption."
              action={{
                type: "internal",
                route: "pages/company/about-us",
                color: "info",
                label: "find out more",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
