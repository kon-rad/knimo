import { Box, Flex, Text, Image } from '@chakra-ui/react';

interface Props {
    type: string;
}

const PERKS = [
    {
        name: 'Monday Drinks',
        image: '/images/perk-1.png',
    },
    {
        name: 'membership',
        image: '/images/perk-2.png',
    },
    {
        name: '3 Friends',
        image: '/images/perk-3.png',
    },
    {
        name: '50% off',
        image: '/images/perk-4.png',
    }
]

const TopPanel = (props: Props) => {
    return (
        <Box className="toppanel" padding="12px" >
            <Text textAlign="center" color="gray.500" fontSize="24">{props.type === 'club' ? 'CLUB' : 'MEMBER'} PERKS</Text>
            <Flex justify="space-around" mt="0px">
                {
                    props.type === 'club' && PERKS.map((e: any, i: number) => {
                        return (
                            <Flex  key={`key-${i}`} direction="column" justify="center" align="center">
                                <Image src={e.image} width="120px" borderRadius="20px" m="8px" />
                                <Text mt="2px" color="gray.100" fontSize="12px">{e.name}</Text>
                            </Flex>
                        )
                    })
                }
            </Flex>
        </Box>
    )
}

export default TopPanel;