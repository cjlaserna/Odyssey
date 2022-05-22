import React, { useState, useEffect } from 'react';
import './Astronauts.css';
import { Box, Button, Container, SimpleGrid, Heading, Image, Text, Flex, Spinner, Skeleton } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import CardPreview from './Card/CardPreview';
import useDrag from './useDrag';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

type Props = {};
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = 'test';
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(10)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

const Astronauts = (props: Props) => {
  const [items] = useState(getItems);
  const [astronauts, setAstronauts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMore, setIsMore] = useState(true);

  // NOTE: for drag by mouse
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const particleParams = require('../../../assets/particlesjs-config.json');
  async function fetchAstronauts(start: number, limit: number): Promise<any> {
    return fetch(`https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=${limit}&offset=${start}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }

  function fetchMore(): void {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    fetchAstronauts(astronauts.length, 10).then((result) => {
      console.log(result.results);
      if (result.results.length === 0) {
        setIsMore(false);
        return;
      }
      let data: any = astronauts;
      result.results.map((astronaut) => {
        data.push(astronaut);
      });
      setAstronauts(data);
      setIsLoading(false);
    });
  }

  function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
    const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    console.log(isTouchpad);
    if (isTouchpad) {
      ev.stopPropagation();
      return;
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAstronauts(1, 10).then((result) => {
      setAstronauts(result.results);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <Container zIndex={'-99'} position="absolute">
        <Particles id="tsparticles" init={particlesInit} options={particleParams} />
      </Container>
      <Flex justifyContent="center" alignItems={'center'} flexDirection="column" height={'85vh'}>
        <Heading className="title" fontSize={'8xl'}>
          Astronauts
        </Heading>
        <Box height={'50vh'} w="90%" onMouseLeave={dragStop} className="scroll">
          {isLoading ? (
            <Box w={'100%'} h={'50vh'} justifyContent="center" alignItems={'center'} display="flex">
              <Spinner />
            </Box>
          ) : (
            <ScrollMenu onWheel={onWheel} onMouseDown={() => dragStart} onMouseUp={() => dragStop} onMouseMove={handleDrag}>
              {astronauts.map((astronaut: any, index) => (
                <CardPreview
                  key={astronaut.name}
                  name={astronaut.name}
                  avatar={astronaut.profile_image}
                  itemId={index.toString()}
                  agency={astronaut.agency.name}
                  status={astronaut.status.name}
                  bio={astronaut.bio}
                  wiki={astronaut.wiki}
                />
              ))}
            </ScrollMenu>
          )}
          <Flex w="100%" justifyContent={'center'} alignItems="center" my={5}>
            <Button isLoading={isLoading} onClick={fetchMore}>
              Load More
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Astronauts;
