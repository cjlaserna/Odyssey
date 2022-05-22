import React from 'react';
import { Heading, Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import './News.css';

type Props = {
  time: string;
  heading: string;
  description: string;
  url: string;
};

const ArticleLink = (props: Props) => {
  const date = new Date(props.time);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md" className="link-box">
      <Box as="time" dateTime={date.getUTCDate.toString()}>
        {date.toLocaleDateString('en-us', options)}
      </Box>
      <Heading size="md" my="3" className="heading" noOfLines={1}>
        <LinkOverlay href={props.url} target="_blank">
          {props.heading}
        </LinkOverlay>
      </Heading>
      <Text className="desc" textOverflow={'ellipsis'} noOfLines={4}>
        {props.description}
      </Text>
    </LinkBox>
  );
};

export default ArticleLink;
