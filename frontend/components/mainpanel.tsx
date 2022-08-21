import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
    type: string;
}

const MainPanel = (props: Props) => {
    return (
        <Box className="mainpanel" padding="20px" >
            <Text textAlign="center" color="gray.500" fontSize="24">{props.type === 'club' ? 'MEMBERS' : 'MY CLUBS'}</Text>
        </Box>
    )
}

export default MainPanel;