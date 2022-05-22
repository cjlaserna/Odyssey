import { Box, Heading, Image, Text, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { Select, OptionBase, GroupBase } from 'chakra-react-select';
import './Experimental.css';
import planet from './Planet-4.png';

type Props = {};

interface PlanetOption extends OptionBase {
  label: string;
  value: string;
}

const Experimental = (props: Props) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetOption | null>(null);
  const [normalWeight, setNormalWeight] = useState('');

  const [weight, setWeight] = useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);
  const planetOptions = [
    { value: 'venus', label: 'Venus' },
    { value: 'mercury', label: 'Mercury' },
    { value: 'mars', label: 'Mars' },
    { value: 'saturn', label: 'Saturn' },
    { value: 'jupiter', label: 'Jupiter' },
    { value: 'uranus', label: 'Uranus' },
    { value: 'neptune', label: 'Neptune' },
  ];

  function getWeight(normal: number, planet: string): number {
    switch (planet) {
      case 'venus':
        return normal * 0.91;
      case 'mercury':
        return normal * 0.38;
      case 'mars':
        return normal * 0.38;
      case 'jupiter':
        return normal * 2.34;
      case 'saturn':
        return normal * 0.93;
      case 'uranus':
        return normal * 0.92;
      case 'neptune':
        return normal * 0.92;
      default:
        return normal;
    }
  }
  useEffect(() => {
    console.log(selectedPlanet);
  }, [setSelectedPlanet]);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'} h="75vh">
      <Box display="flex" justifyContent="center" alignItems="center" mt={'8rem'}>
        <Heading className="title" textTransform={'uppercase'} fontSize="4rem">
          Your Weight on{' '}
          <Typewriter
            options={{
              strings: ['Mars', 'Venus', 'Mercury', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'],
              autoStart: true,
              loop: true,
            }}
          />
        </Heading>
      </Box>
      <Image src={planet} zIndex="-99" width="480px" opacity={'.5'} position={'absolute'} top="50px" left="60px" />
      <SimpleGrid columns={2} w="75%" my={10} display="flex" justifyContent="center" alignItems="center">
        <Box w="md" overflow={'hidden'}>
          <Text className="title" fontSize={'1.8rem'} margin="0 auto" textTransform={'uppercase'} wordBreak="break-word">
            {selectedPlanet ? (
              <Box>
                <Text my={2} noOfLines={2} textOverflow="ellipsis">
                  Your weight on Earth: {normalWeight}kg
                </Text>
                <Text noOfLines={2}>
                  Your weight on {selectedPlanet.label}: {getWeight(parseInt(normalWeight), selectedPlanet.value)}kg
                </Text>
              </Box>
            ) : (
              'No Data Entered'
            )}
          </Text>
        </Box>
        <Box backgroundColor={'#19113C'} w="md" className="form" borderRadius={'20px'} padding="20px" float={'right'}>
          {' '}
          <Box mb={2}>
            <Text mb={1}> Weight(kg): </Text>
            <Input
              placeholder="Weight(kg*)"
              aria-label="weight in kg"
              onChange={(e) => setNormalWeight(e.target.value)}
              type="number"
            />
          </Box>
          <Select<PlanetOption, false, GroupBase<PlanetOption>>
            name="colors"
            className="chakra-react-select"
            classNamePrefix="chakra-react-select"
            options={planetOptions}
            placeholder="Select a planet"
            selectedOptionStyle="check"
            onChange={setSelectedPlanet}
            chakraStyles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                bg: 'transparent',
                px: 2,
                cursor: 'inherit',
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: 'none',
              }),
            }}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Experimental;
