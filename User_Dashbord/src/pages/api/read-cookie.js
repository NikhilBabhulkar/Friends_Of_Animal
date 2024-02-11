import { parse } from 'cookie';

export default (req, res) => {
  const cookies = parse(req.headers.cookie || '');

  // Read the userData cookie value
  const userData = cookies.userData || 'No data';

  // Process the data as needed
  //console.log('UserData from React app:', userData);

  res.status(200).json({ userData });
};
