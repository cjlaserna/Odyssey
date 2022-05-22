import { Heading, Box, LinkBox, LinkOverlay, Text, SimpleGrid, Spinner, Button, IconButton } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import ArticleLink from './ArticleLink';
import InfiniteScroll from 'react-infinite-scroller';
import { ArrowUpIcon } from '@chakra-ui/icons';

type Props = {};

const News = (props: Props) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMore, setIsMore] = useState(true);

  async function fetchArticles<T>(start: number, limit: number): Promise<any> {
    return fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${limit.toString()}&_start=${start.toString()}`)
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
    fetchArticles(articles.length, 10).then((result) => {
      console.log(result);
      if (result.length === 0) {
        setIsMore(false);
        return;
      }
      let data: any = articles;
      result.map((article) => {
        data.push(article);
      });
      setArticles(data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(1, 10).then((result) => {
      console.log(typeof result[0]);
      setArticles(result);
      setIsLoading(false);
    });
  }, []);
  return (
    <Box mx={['3rem', '5rem', '8rem', '10rem', '15rem']} mt="8%" minH={'100vh'}>
      <Heading className="title" textTransform={'uppercase'} fontSize={['2rem', '3rem', '5rem', '7rem']} id="news">
        News
      </Heading>
      <InfiniteScroll pageStart={0} loadMore={fetchMore} hasMore={true} loader={<Spinner />}>
        <SimpleGrid columns={[1, 1, 1, 2, 2, 3]} gap={5} width={'90%'} gridRowGap={10} my={5}>
          {articles.map((article: any, index) => (
            <ArticleLink
              key={article.title}
              heading={article.title}
              url={article.url}
              description={article.summary}
              time={article.publishedAt}
            />
          ))}
        </SimpleGrid>
      </InfiniteScroll>

      <IconButton
        as={'a'}
        aria-label="Back to Top"
        icon={<ArrowUpIcon />}
        position={'fixed'}
        bottom="5"
        right={'5'}
        size="lg"
        borderRadius={'100%'}
        colorScheme="purple"
        variant={'solid'}
        href="#news"
      />
    </Box>
  );
};

export default News;
