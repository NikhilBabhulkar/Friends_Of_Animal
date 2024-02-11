import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';

export const CompanyCard = (props) => {
  const { company,userId } = props;

  return (
    <Card
  sx={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }}
>
  <CardContent>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        pb: 3,
      }}
    >
      <img
        src={`http://localhost:3001/assets/${company.eventPosterUrl}`}
        alt={company.eventName}
        style={{ width: '100%', height: 'auto' }}
      />
    </Box>
    <Typography align="center" gutterBottom variant="h5">
      {company.eventName}
    </Typography>
    <Typography align="center" variant="body1">
      {company.description}
    </Typography>
  </CardContent>
  <Box sx={{ flexGrow: 1 }} />
  <Typography align="center"  variant="caption" color='text.secondary'>
      {`Start Date:${company.startdate}`}
    </Typography>
    <Typography align="center" variant="caption" color='text.secondary'>
      {`End Date : ${company.deadline}`}
    </Typography>
  <Divider />
  <Stack
    alignItems="center"
    direction="row"
    justifyContent="space-between"
    spacing={2}
    sx={{ p: 2 }}
  >
    {/* <Stack
        alignItems="center"
        direction="row"
        spacing={1}
      >
        <SvgIcon
          color="action"
          fontSize="small"
        >
          <ClockIcon />
        </SvgIcon>
        <Typography
          color="text.secondary"
          display="inline"
          variant="body2"
        >
          Updated 2hr ago
        </Typography>
      </Stack> */}
    <Stack
      alignItems="center"
      direction="row"
      spacing={1}
    >
      <SvgIcon color="action" fontSize="small">
        <ArrowDownOnSquareIcon />
      </SvgIcon>
      <Typography color="text.secondary" display="inline" variant="body2">
       <a target='_blank' href={`http://localhost:3001/assets/certificates/${userId}/${company._id}_${userId}.pdf`}> Download Certificate</a>
      </Typography>
    </Stack>
  </Stack>
</Card>

  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
