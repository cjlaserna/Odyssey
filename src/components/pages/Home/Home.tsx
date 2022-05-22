import { Box, Button, Container, SimpleGrid, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

import './Home.css';
import news from '../../../assets/images/Planet-1.png';
import rocket from '../../../assets/images/rocket.png';
import rover from '../../../assets/images/Rover.png';

type Props = {};

const Home = (props: Props) => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const particleParams = require('../../../assets/particlesjs-config.json');
  const history = useNavigate();

  console.log(news);
  return (
    <Box>
      <Container zIndex={'-99'} position="absolute">
        <Particles id="tsparticles" init={particlesInit} options={particleParams} />
      </Container>
      <Box
        display={'flex'}
        justifyContent="center"
        alignItems={'center'}
        flexDirection="column"
        h={['80vh', '80vh', '100vh', '100vh']}
      >
        <Heading className="title" fontSize={['5rem', '5rem', '7rem', '10rem']}>
          Odyssey
        </Heading>
        <Container w={'100%'} textAlign="center" my={5}>
          <Button size={'lg'} data-scroll href="#features" as="a">
            Explore the Cosmos
          </Button>
        </Container>
      </Box>
      <Box id="features" background={'#0E041F'} py="5">
        <SimpleGrid
          className="grid"
          columns={[1, 1, 2, 3, 3]}
          spacing={['5', '8', '10', '10', '20']}
          mx={['3rem', '5rem', '8rem', '10rem', '15rem']}
          pb={'10rem'}
          pt="5rem"
        >
          <Box
            w="100%"
            onClick={(e) => {
              e.preventDefault();
              history('/news');
            }}
          >
            <Image src={news} w="70%" />
            <Box
              display={'flex'}
              justifyContent="center"
              alignItems={'center'}
              flexDirection="column"
              w="100%"
              position={'static'}
              className="text"
            >
              <Heading as="h3" fontSize={'6xl'}>
                <a href="/news">News</a>
              </Heading>
              <Text>Latest Space News</Text>
            </Box>
          </Box>
          <Box
            w="100%"
            onClick={(e) => {
              e.preventDefault();
              history('/astronauts');
            }}
          >
            <Image src={rocket} w="100%" />
            <Box
              display={'flex'}
              justifyContent="center"
              alignItems={'center'}
              flexDirection="column"
              w="100%"
              position={'static'}
              className="text"
            >
              <Heading as="h3" fontSize={'6xl'}>
                <a href="/astronauts">Astronauts</a>
              </Heading>
              <Text>Legendary Space Explorers</Text>
            </Box>
          </Box>
          <Box w="100%">
            <Image src={rover} w="70%" />
            <Box
              display={'flex'}
              justifyContent="center"
              alignItems={'center'}
              flexDirection="column"
              w="100%"
              position={'static'}
              className="text"
            >
              <Heading as="h3" fontSize={'6xl'}>
                <a href="/experimental">Experimental</a>
              </Heading>
              <Text> Misc. Space Tools </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
