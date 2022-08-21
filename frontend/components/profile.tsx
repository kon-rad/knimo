import { gql, useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { Flex, Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useAppState } from '../context/appState'
import { useLazyQuery } from '@apollo/client'
import { GET_PROFILES, GET_DEFAULT_PROFILES } from '../api/queries'
import SidePanel from './sidepanel'
import TopPanel from './toppanel'
import MainPanel from './mainpanel'

export const getDefaultProfile = (ethereumAddress: string) => {
   return apolloClient.query({
    query: gql(GET_DEFAULT_PROFILES),
    variables: {
      request: {
        ethereumAddress
      }
    },
  })
}
interface Props {
    type: string;
}

const Profile = (props: Props) => {
    const { address } = useAccount();
    const { authToken } = useAppState();
    const [getProfiles, profiles] = useLazyQuery(GET_PROFILES)


  useEffect(() => {
    console.log('fetching profiles', address, authToken);
    if (!authToken || !address) return;
    console.log('fetching profiles', address, authToken);
    
    getProfiles({
        variables: {
          request: {
            // profileIds?: string[];
            handles: ['konrad.lens']
            // handles?: string[];
            // whoMirroredPublicationId?: string;
          },
        },
       })

  }, [address, authToken])


//   const {
//     query: { username, type }
//   } = useRouter()
//   const { currentUser } = useAppPersistStore()
//   const [feedType, setFeedType] = useState<string>(
//     type && ['post', 'comment', 'mirror', 'nft'].includes(type as string)
//       ? type?.toString().toUpperCase()
//       : 'POST'
//   )
//   const { data, loading, error } = useQuery(PROFILE_QUERY, {
//     variables: { request: { handle: username }, who: currentUser?.id ?? null },
//     skip: !username,
//     onCompleted(data) {
//       Logger.log(
//         '[Query]',
//         `Fetched profile details Profile:${data?.profile?.id}`
//       )
//     }
//   })

//   const profile = data?.profile
  console.log('profiles ->', profiles);
  

  return (
    <>
        <Flex justify="center" width="100%">
            <SidePanel type={props.type} />
            <Box>
                <TopPanel type={props.type} />
                <MainPanel type={props.type} />
            </Box>
        </Flex>
    </>
  )
}

export default Profile
