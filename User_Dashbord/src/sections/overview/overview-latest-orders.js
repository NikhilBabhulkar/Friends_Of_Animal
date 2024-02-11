import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  true: 'warning',
  false: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Events" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Sr. No
                </TableCell>
                <TableCell>
                  Event Name
                </TableCell>
                <TableCell>
                   Start Date
                </TableCell>
                <TableCell>
                   End Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              orders.map((order,index) => {
                //const createdAt = format(order.createdAt, 'dd/MM/yyyy');
                console.log(order);;
                return (
                  <TableRow
                    hover
                    key={order._id}
                  >
                    <TableCell>
                      {index+1}
                    </TableCell>
                    <TableCell>
                      {order.eventName}
                    </TableCell>
                    <TableCell>
                      {order.startdate}
                    </TableCell>
                    <TableCell>
                      {order.deadline}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.completed]}>
                        {order.completed ? `Completed`: `On Going`}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
