import { Card, CardBody, Spinner, Image, Stack, Heading, Text, Box } from '@chakra-ui/react';
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { User } from '../type/User';

const sleep = (sec: number) => new Promise(resolve =>
  setTimeout(resolve, sec * 1000));

const UserHandler = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async (page: number) => {
    const URL = `https://gorest.co.in/public/v2/users?page=${page}`;

    // delay to confirm asynchronous communication 
    await sleep(1.0)
    const response = await fetch(URL);
    const usersList: User[] = await response.json();

    if (usersList.length < 1) {
      setHasMore(false);
      return;
    }
    setUsers([...users, ...usersList]);
  };

  const loader = <Spinner emptyColor='gray.200' key={0} />;

  return (
    <>
      <Heading as='h2' fontSize={{ base: 'md', md: 'lg' }} py='30'>ユーザ一覧</Heading>
      <Box style={{ maxHeight: 620 }}>
        <InfiniteScroll
          loadMore={loadMore} // read next data
          loader={loader}      // component in loading
          hasMore={hasMore}      // scroll more or not
        >
          {users.map((user, num) => (
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              key={num}
            >
              <Image
                objectFit='cover'
                maxW={{ base: 'sm', sm: 'sm' }}
                src='https://source.unsplash.com/random'
                alt='thumnail'
              />
              <Stack w='100%'>
                <CardBody>
                  <Heading fontSize={{ base: 'md', md: 'lg' }} textAlign='center'>{user.name}</Heading>

                  <Text fontSize={{ base: 'md', md: 'lg' }} py='2'>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </Text>
                  <Text fontSize={{ base: 'md', md: 'lg' }} py='2'>{user.gender}</Text>
                  <Text fontSize={{ base: 'md', md: 'lg' }} py='2'>{user.status}</Text>
                </CardBody>
              </Stack>
            </Card>
          ))}
        </InfiniteScroll>
      </Box>
    </>
  )
}

export default UserHandler;