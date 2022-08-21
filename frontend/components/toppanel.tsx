import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
    type: string;
}

const TopPanel = (props: Props) => {
    return (
        <Box className="toppanel" padding="20px" >
            <Text textAlign="center" color="gray.500" fontSize="24">{props.type === 'club' ? 'CLUB' : 'MEMBER'} PERKS</Text>
        </Box>
    )
}

export default TopPanel;