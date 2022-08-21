import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import { WidgetProps } from "@worldcoin/id";
// const dynamic = () => {};
// const WorldIDWidget = dynamic<WidgetProps>(
//   () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
//   { ssr: false }
// );



interface Props {
    type: string;
    data: any;
}

const SidePanel = (props: Props) => {
    console.log("props.data ", props.data);
    return (
        <Box className="sidepanel">
            <Text margin="30px" textAlign="center" color="gray.500" fontSize="24">{props.type === 'club' ? 'CLUB' : 'MEMBER'} PROFILE</Text>
            <Flex width="100%" padding="18px" justify="center" align="center">
                <Image src={props.data.profile.picture.original.url} width="160px" borderRadius="50%" />
                <Text marginLeft="60px" color="white" fontSize="20">{props.data.profile.name}</Text>
            </Flex>
            <Flex width="100%" padding="18px" justify="center" align="center" direction="column">
                <Text color="gray.100" fontSize="22">{props.data.profile.handle}</Text>
                <Text color="white" fontSize="18">{props.data.profile.bio}</Text>
                <Button mt="20px" bg="gray.100" color="gray.800" fontSize="18">Follow</Button>
            </Flex>
            {/* <WorldIDWidget
                actionId="wid_staging_20c84cf2a1aa2d955508af55fad3ce11" // obtain this from developer.worldcoin.org
                signal="my_signal"
                enableTelemetry
                onSuccess={(verificationResponse: any) => console.log(verificationResponse)}
                onError={(error: any) => console.error(error)}
            /> */}
        </Box>
    )
}

export default SidePanel;