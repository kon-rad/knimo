import { ethers } from 'hardhat';
import * as dotenv from "dotenv";
dotenv.config();

const main = async () => {

    const payees: string[] = [
        process.env.KAREEM!, // 30%
        process.env.KONRAD!,  // 30%
        process.env.KIWI!, // 30%
        process.env.CHRIS! // 10% 
    ]

    const shares = [3000, 3000, 3000, 1000]

    const TREASURY = await ethers.getContractFactory("KnimoPaymentSplitter") 
    const treasury = await TREASURY.deploy(payees, shares)
    console.log(`Transaction hash: ${treasury.deployTransaction.hash}`)
    await treasury.deployed()

    console.log("Treasury deployed to:", treasury.address)
    
    console.log(`Gas Price: ${ethers.utils.formatUnits(treasury.deployTransaction.gasPrice!.toNumber(), 'gwei')} gwei`)
    console.log(`Gas Limit: ${treasury.deployTransaction.gasLimit.toNumber()}`)  
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
  })