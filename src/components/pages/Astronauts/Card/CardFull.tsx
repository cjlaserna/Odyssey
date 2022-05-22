import React from 'react';
import { Avatar, Heading, Text, Button, Box } from '@chakra-ui/react';
import '../../../../index.css';

type Props = {
  avatar: string;
  name: string;
  agency: string;
  status: string;
  bio: string;
  wiki: string;
};

const CardFull = (props: Props) => {
  return (
    <>
      <Box display={'flex'} alignItems="center" my={5}>
        <Avatar name={props.name} src={props.avatar} size="2xl" />
        <Heading display={'inline'} w="75%" wordBreak={'break-word'} ml="5">
          {props.name}
        </Heading>
      </Box>
      <Heading fontSize={'1.2rem'}> Agency: {props.agency}</Heading>
      <Text>{props.bio}</Text>
    </>
  );
};
export default CardFull;
