import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Flex, Box, Image} from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Box>
      <Box className={styles.container} padding="80px">
        <Flex justify="end">
            <Box margin="40px" mt="140px" >
              <Image src="/images/corner.png" style={{ transform: "rotate(180deg)"}} ml="340px" width="30px"/>
              <Image src="/images/main-text.png" width="300px"/>
              <Image src="/images/corner.png" ml="-70px" width="30px"/>
            </Box>
        </Flex>
        <Flex>
          <Image src="/images/knimo-title.png" width="500px" mt="180px" />
        </Flex>
      </Box>
    </Box>
  )
}

export default Home
