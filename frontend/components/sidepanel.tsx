import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
    type: string;
}

const SidePanel = (props: Props) => {
    return (
        <Box className="sidepanel">
            <Text margin="30px" textAlign="center" color="gray.500" fontSize="24">{props.type === 'club' ? 'CLUB' : 'MEMBER'} PROFILE</Text>
        </Box>
    )
}

export default SidePanel;