import { Box, Card, CardBody, Spinner, Image, Stack, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { User } from '../type/User';

const UserHandler = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async (page: number) => {
    const URL = `https://gorest.co.in/public/v2/users?page=${page}`;

    const response = await fetch(URL);
    const usersList: User[] = await response.json()

    console.log(`GET ${URL}  count=${usersList.length}`)

    if (usersList.length < 0) {
      setHasMore(false);

      return;
    }

    setUsers([...users, ...usersList]);
  };

  const loader = <Spinner emptyColor='gray.200' key={0} />;

  return (
    <>
    <Heading as='h2' py='30'>ユーザ一覧</Heading>
    <Box h="720px" overflow="auto">
      <InfiniteScroll
        loadMore={loadMore} // read next data
        loader={loader}      // component in loading
        hasMore={hasMore}      // scroll more or not 
        useWindow={false}
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
              maxW={{ base: '100%', sm: '200px' }}
              src='https://source.unsplash.com/random'
              alt='thumnail'
            />
            <Stack>
              <CardBody>
                <Heading size='md'>{user.name}</Heading>

                <Text py='2'>{user.email}</Text>
                <Text py='2'>{user.gender}</Text>
                <Text py='2'>{user.status}</Text>
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