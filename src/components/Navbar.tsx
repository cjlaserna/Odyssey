import React, { ReactElement, useState } from 'react';
import { Flex, Button, IconButton, Container, Stack, useMediaQuery } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { InfoIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import { url } from 'inspector';

type Props = {};

const links = [
  { link_name: 'home', url: '/' },
  { link_name: 'news', url: '/news' },
  { link_name: 'astronauts', url: '/astronauts' },
  { link_name: 'experimental', url: '/experimental' },
];

const NavLink = ({ children, url, mobile }: { children: string; url: string; mobile: boolean }) => {
  const history = useNavigate();
  return (
    <>
      {!mobile ? (
        <Button
          as="a"
          mx={1}
          my={5}
          w="unset"
          minW={'5rem'}
          colorScheme={'orange'}
          variant="ghost"
          color="white"
          textDecor="none"
          textTransform="capitalize"
          href={url}
          aria-label={children}
          onClick={(e) => {
            e.preventDefault();
            history(url);
          }}
        >
          {children}
        </Button>
      ) : (
        <Button
          as="a"
          w="100%"
          variant="ghost"
          colorScheme={'orange'}
          color="white"
          textDecor="none"
          textTransform="capitalize"
          aria-label={children}
          href={url}
          onClick={(e) => {
            e.preventDefault();
            history(url);
          }}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default function Navbar(): ReactElement {
  const [display, changeDisplay] = useState('none');
  const [mobile] = useMediaQuery('(max-width: 768px)');
  console.log(mobile);
  return (
    <>
      <Container
        display="flex"
        justifyContent={'flex-end'}
        zIndex="99"
        maxW="99vw"
        w="99vw"
        m="0"
        p="0"
        position={'fixed'}
        top="0"
        right={'0'}
      >
        <Flex mr={'10px'} mt="10px">
          <Flex align="center">
            {/* Desktop */}
            <Flex display={['none', 'none', 'flex', 'flex']}>
              {links.map(({ link_name, url }) => (
                <NavLink key={url} url={url} mobile={mobile}>
                  {link_name}
                </NavLink>
              ))}
            </Flex>

            {mobile ? (
              <IconButton
                aria-label="Open Menu"
                size="lg"
                mt="2"
                mr={'2'}
                icon={<HamburgerIcon />}
                onClick={() => changeDisplay('flex')}
                display={['flex', 'flex', 'none', 'none']}
              />
            ) : (
              <></>
            )}
          </Flex>
          {mobile ? (
            <Flex
              w="100vw"
              display={display}
              zIndex={20}
              h="100vh"
              pos="fixed"
              top="0"
              left="0e"
              overflowY="auto"
              flexDir="column"
            >
              {/* Mobile Content */}
              <Flex justify="flex-end">
                <IconButton
                  mt={'2'}
                  mr={'2'}
                  aria-label="Open Menu"
                  size="lg"
                  icon={<CloseIcon />}
                  onClick={() => changeDisplay('none')}
                />
              </Flex>
              <Stack align={'center'} spacing="5">
                {links.map(({ link_name, url }) => (
                  <NavLink key={url} url={url} mobile={mobile}>
                    {link_name}
                  </NavLink>
                ))}
              </Stack>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
      </Container>
    </>
  );
}
