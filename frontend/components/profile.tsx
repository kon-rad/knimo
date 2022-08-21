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

const PROFILE_DATA = {"profile":{"__typename":"Profile","id":"0x2931","handle":"konrad.lens","ownedBy":"0x7b86F576669f8d20a8244dABEFc65b31d7dEB3f2","name":"Konrad","bio":"Solidity dev - EVM - defi - VR - iOS","metadata":"https://lens.infura-ipfs.io/ipfs/QmZ5SZ7y1EH4dQzSj2fSifSPRov2UHxs5a22bGmVbjYM4z","followNftAddress":"0xaf95081f11754F9e7eBE98e10d4BCA3A23A73ec2","isFollowedByMe":false,"isFollowing":false,"attributes":[{"__typename":"Attribute","key":"location","value":"Nomadic"},{"__typename":"Attribute","key":"website","value":"https://konradgnat.com"},{"__typename":"Attribute","key":"twitter","value":"konrad_gnat"},{"__typename":"Attribute","key":"app","value":"Lenster"}],"onChainIdentity":{"__typename":"OnChainIdentity","ens":{"__typename":"EnsOnChainIdentity","name":"0xmaker.eth"}},"stats":{"__typename":"ProfileStats","totalFollowers":11,"totalFollowing":9,"totalPosts":3,"totalComments":4,"totalMirrors":3},"picture":{"__typename":"MediaSet","original":{"__typename":"Media","url":"https://lens.infura-ipfs.io/ipfs/QmTwxLmB8kURHfEw6CmtwnEbCUiDiayzJ7RtTre6fjzUox"}},"coverPicture":{"__typename":"MediaSet","original":{"__typename":"Media","url":"https://lens.infura-ipfs.io/ipfs/QmRKP7H4TcUsmEVS7ExvHEPNBFtkVCtvmh21yLSDjzSBWx"}},"followModule":null}};
const CLUB_DATA = {"profile":{"__typename":"Profile","id":"0x2931","handle":"sohohouse.lens","ownedBy":"0x7b86F576669f8d20a8244dABEFc65b31d7dEB3f2","name":"SOHO House","bio":"Soho House is a group of private members' clubs originally aimed at those in the arts, politics, and media. ","metadata":"https://lens.infura-ipfs.io/ipfs/QmZ5SZ7y1EH4dQzSj2fSifSPRov2UHxs5a22bGmVbjYM4z","followNftAddress":"0xaf95081f11754F9e7eBE98e10d4BCA3A23A73ec2","isFollowedByMe":false,"isFollowing":false,"attributes":[{"__typename":"Attribute","key":"location","value":"Nomadic"},{"__typename":"Attribute","key":"website","value":"https://konradgnat.com"},{"__typename":"Attribute","key":"twitter","value":"konrad_gnat"},{"__typename":"Attribute","key":"app","value":"Lenster"}],"onChainIdentity":{"__typename":"OnChainIdentity","ens":{"__typename":"EnsOnChainIdentity","name":"0xmaker.eth"}},"stats":{"__typename":"ProfileStats","totalFollowers":11,"totalFollowing":9,"totalPosts":3,"totalComments":4,"totalMirrors":3},"picture":{"__typename":"MediaSet","original":{"__typename":"Media","url":"/images/soho-logo-1.png"}},"coverPicture":{"__typename":"MediaSet","original":{"__typename":"Media","url":"https://lens.infura-ipfs.io/ipfs/QmRKP7H4TcUsmEVS7ExvHEPNBFtkVCtvmh21yLSDjzSBWx"}},"followModule":null}};

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
    const [data, setData] = useState<any>(null);


  useEffect(() => {
    console.log('fetching profiles', address, authToken);
    if (!authToken || !address) return;
    console.log('fetching profiles', address, authToken);
    setData(PROFILE_DATA);
    
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
            <SidePanel type={props.type} data={props.type === 'member' ? PROFILE_DATA : CLUB_DATA} />
            <Box>
                <TopPanel type={props.type} />
                <MainPanel type={props.type} />
            </Box>
        </Flex>
    </>
  )
}

export default Profile
