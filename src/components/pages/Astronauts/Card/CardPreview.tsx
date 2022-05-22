import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Avatar,
  Text,
  Badge,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import './card.css';
import CardFull from './CardFull';

type Props = {
  avatar: string;
  name: string;
  agency: string;
  status: string;
  itemId: string;
  bio: string;
  wiki: string;
};

const CardPreview = (props: Props) => {
  const visibility = React.useContext(VisibilityContext);
  const visible = visibility.isItemVisible(props.itemId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      borderRadius={10}
      backgroundColor="#19113C"
      padding={10}
      className="card"
      mx={5}
      float="left"
      maxW={['xs', 'xs', 'xs', 'sm', 'md', 'md']}
      minW={['xs', 'xs', 'xs', 'sm', 'md', 'md']}
      overflow="hidden"
      position={'relative'}
      mb="5"
      onClick={onOpen}
    >
      <Flex justifyContent="center" alignItems="center" flexDirection={'column'}>
        <Avatar name={props.name} src={props.avatar} size="2xl" />
        <Heading textAlign={'center'}> {props.name} </Heading>
      </Flex>
      <Heading fontSize={'1.2rem !important'} textAlign="center" wordBreak="break-all" noOfLines={1}>
        {props.agency}{' '}
      </Heading>
      <Badge
        colorScheme={props.status === 'Active' ? 'green' : 'red'}
        px={5}
        py={2}
        borderRadius="20px"
        position={'absolute'}
        bottom="5px"
        right="5px"
      >
        {props.status}
      </Badge>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="#19113C">
          <ModalHeader>{props.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CardFull
              name={props.name}
              avatar={props.avatar}
              agency={props.agency}
              status={props.status}
              bio={props.bio}
              wiki={props.wiki}
            />
          </ModalBody>

          <ModalFooter>
            <Button as="a" variant={'outline'} href={props.wiki} target="_blank" mx="3">
              Read More...
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CardPreview;
