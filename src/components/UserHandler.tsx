import { Card, CardBody, Spinner, Image, Stack, Heading, Text, Box, Link } from '@chakra-ui/react';
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { User } from '../type/User';
// import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';

const UserHandler = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async (page: number) => {
    const URL = `https://gorest.co.in/public/v2/users?&page=${page}`;

    const response = await fetch(URL);
    const usersList: User[] = await response.json()
    console.log(`GET ${URL}  count=${usersList.length}`)
    console.log(page)
    if (usersList.length < 0) {
      setHasMore(false);

      return;
    }

    setUsers([...users, ...usersList]);
  };

  const loader = <Spinner emptyColor='gray.200' key={0} />;

  return (
    <>
      <Heading as='h2' fontSize={{ base: 'md', md: 'lg' }} py='30'>ユーザ一覧</Heading>
      <Box style={{ maxHeight: 720 }}>
        <InfiniteScroll
          pageStart={1}
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
                maxW={{ base: 'md', sm: 'lg' }}
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