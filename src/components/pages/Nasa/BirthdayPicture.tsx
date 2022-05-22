import React, { useEffect, useState } from 'react';
import { Avatar, Heading, Text, Button, Box } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {};
const BirthdayPicture = (props: Props) => {
  const [startDate, setStartDate] = useState(new Date());

  function getYear(fullYear: any): string {
    const temp = fullYear.toString();
    return temp.slice(-2);
  }

  function getDay(date: any): string {
    const temp = date.toString();
    if (date < 10) {
      return '0' + temp;
    }
    return temp;
  }
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} h="75vh">
        <Heading noOfLines={2} className="title" textTransform={'uppercase'} width="50%" fontSize={'3rem'} my="4">
          What picture did NASA take on your birthday?
        </Heading>
        <Box display={'flex'} alignItems="center" my={5}>
          <Text>Birth Date: </Text>
          <Box bg={'#19113C'} p="2" mx={2}>
            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
          </Box>
          <Button
            onClick={() => {
              const year = getYear(startDate.getFullYear());
              const month = getDay(startDate.getMonth());
              const date = getDay(startDate.getDate());
              window.open(`https://apod.nasa.gov/apod/ap${year}${month}${date}.html`, '_blank');
            }}
          >
            Go
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default BirthdayPicture;
