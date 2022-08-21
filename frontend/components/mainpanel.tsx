import { Box, Flex, Text, Image } from '@chakra-ui/react';

interface Props {
    type: string;
}

const MEMBERS = [
    {
        name: 'Shahi',
        image: '/images/members/member-1.png'
    },
    {
        name: 'Zakanno',
        image: '/images/members/member-2.png'
    },
    {
        name: 'Naloh',
        image: '/images/members/member-3.jpg'
    }
]

const MainPanel = (props: Props) => {
    return (
        <Box className="mainpanel" padding="20px" >
            <Text textAlign="center" color="gray.500" fontSize="24">{props.type === 'club' ? 'MEMBERS' : 'MY CLUBS'}</Text>
            <Flex height="100%" align="center">
                {
                    props.type === 'club' && MEMBERS.map((e: any, i: number) => {
                        return (
                            <Box key={`key-${i}`}>
                                <Image margin="12px" src={e.image} width="120px" borderRadius="20px" />
                                <Text fontSize="18px" textAlign="center" color="gray.100">{e.name}</Text>
                            </Box>
                        )
                    })
                }
            </Flex>
        </Box>
    )
}

export default MainPanel;