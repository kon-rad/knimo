import { ethers } from "hardhat";
import { deployedContracts } from "../deployedContracts";
import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const NODE_URL = `https://alchemy.api/${process.env.ALCHEMY_API}` // - change to proper alchemy http
const provider = new ethers.providers.JsonRpcProvider(NODE_URL)

export const retrievePerks = async (followNFTAddress: String, followId: Number) => {

    const _interface = new ethers.utils.Interface([
      "function viewPerks(address followNFTAddress, uint256 followId) external view returns (uint256[] memory)"
    ])

    const PerkStorage =  deployedContracts.perkStorage

    const PerksContract = new ethers.Contract(
        PerkStorage,
        _interface,
        provider
    )

    const perkIds: Array<Number> = await PerksContract.retrievePerks(
        followNFTAddress,
        followId,
    )

    console.log(`Perk Ids: ${perkIds}`)

    const PerksMetadata = []

    for (let i = 0; i < perkIds.length; i++){
        const metadata: Object = await getJSONfromURI(perkIds[i])
        PerksMetadata.push(metadata)
    }

    return PerksMetadata
}

export const getJSONfromURI = async (tokenId: Number) => {

    const _interface = new ethers.utils.Interface([
        "function tokenURI(uint256 tokenId) public view returns (string memory)"
    ])

    const CollectNFT = new ethers.Contract(
        deployedContracts.CollectNFT,
        _interface,
        provider
    )

    // get token URI \\ 
    let uri = await CollectNFT.tokenURI(tokenId)
    
    // format uri \\
    uri = "https://gateway.pinata.cloud/ipfs/".concat(uri.slice(7)) // change the domain "https://gateway..." to whatever is necessary 
    console.log("getting json from", uri)

    // get json \\
    let response = await axios.get(uri)

    // get image url from response \\
    let json = response.data

    const name = json.name
    const description = json.description
    let image = json.image

    // format image \\
    image = "https://gateway.pinata.cloud/ipfs/".concat(image.slice(7)) // change the domain "https://gateway..." to whatever is necessary
    console.log("loading image at", image)

    const metadata: Object = {
        name: name,
        description: description,
        image: image
    }

    return metadata
}

