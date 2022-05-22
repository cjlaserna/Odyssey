import React from 'react';
import { Box, Heading, Icon, Link } from '@chakra-ui/react';
import { Heart } from 'akar-icons';

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <Box justifyContent="center" alignItems={'center'} py="5" mt={3} pb="10">
        <Heading as="h3" display={'flex'} justifyContent="center" alignItems={'center'} w="100%">
          Made with <Icon as={Heart} display="inline" mx={2} mt={2} strokeWidth="3" /> by{' '}
          <Link href="https://github.com/cjlaserna/" mx={2}>
            cjlaserna
          </Link>
        </Heading>
      </Box>
    </>
  );
};

export default Footer;
