import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
// import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { CompanyCard } from 'src/sections/overview/company-card';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
// import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
// import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
// import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// // import Head from 'next/head';
// import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
// import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
// import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';




const Page = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [allevents, setAllevents] = useState([]);
  const [user, setUser] = useState({ events: [] })

  useEffect(() => {
    // Your network call logic here
    const fetchData = async () => {
      try {

        const response1 = await axios.get('http://localhost:3002/api/read-cookie');
        const { token, userId } = response1.data.userData ? JSON.parse(response1.data.userData) : null;
        const userData = await axios.get(`http://localhost:3001/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        });
        setUser(userData.data)
        //console.log(user);

        const eventData = await axios.get("http://localhost:3001/events/", {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        });
        setAllevents(eventData.data)

        // Make your API call or any network request here using Axios
        const response = await axios.get(`http://localhost:3001/users/events/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        });

        const data = response.data;
        setEvents(data);
        // console.log(events1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Check if the page is being loaded on the client side
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>
          Dashboard | FOA
        </title>
      </Head>
      <Box

        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="xl">
          <Typography variant='h3' style={{ fontFamily: "cursive" }}>{`Hii... ${user.firstName} ${user.lastName}`}  </Typography>
          <Grid
            container
            spacing={3}
            marginBottom={5}
          >
            <Grid
              xs={12}
              sm={6}
              lg={4}
            >
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: '100%' }}
                value={user.events.length}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={4}
            >
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value="0"
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={4}
            >
              <OverviewTasksProgress
                sx={{ height: '100%' }}
                value={allevents.length}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
            </Grid>



            <Grid container spacing={4}>
              {events && events.length > 0 ? (
                events.map((company) => (
                  <>
                    <Grid xs={12} md={6} lg={4} key={company.id}>
                      <CompanyCard company={company} userId={user._id} />
                    </Grid>
                  </>
                ))
              ) : (
                <Typography variant="body1" align="center">
                  You have not participated in any event 😞
                </Typography>
              )}
            </Grid>

            <Box
              marginBottom={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>





            <Grid
              xs={12}
              lg={8}
            >
            </Grid>

            <Grid
              xs={12}
              md={12}
              lg={8}
            >
              <OverviewLatestOrders
                orders={allevents}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
