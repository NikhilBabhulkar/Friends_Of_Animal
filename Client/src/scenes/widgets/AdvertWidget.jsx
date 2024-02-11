import { Typography, useTheme } from "@mui/material";

import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";


const AdvertWidget = (event) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  //const [event, setEvent] = useState();
  //console.log(event);
  event=event.event;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Upcoming Events
        </Typography>
        <Typography color={medium}>Participate</Typography>
      </FlexBetween>
      <a href="/events" >
        <img
          width="100%"
          height="auto"
          alt="advert"
          src={`${process.env.REACT_APP_LOCAL}/assets${event.eventPosterUrl}`}
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        /> </a>
      <FlexBetween>
        <Typography color={main}>
          {event.eventName}
          </Typography>
        {/* <Typography color={medium}>event_orgnizer@foa.com</Typography> */}
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {event.description}
      </Typography>

      <Typography color={main}>
         {`Event starts -${event.startdate}`} <br></br>
         {`Event ends -${event.deadline}`} 

          </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
