import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  networks: {
        localhost: {
            url: 'http://127.0.0.1:8545',
            gasPrice: 1000000000,
        },

        // hardhat: {
        //     forking: {
        //         url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API}`,
        //     },
        //     blockGasLimit: 30000000,
        // },

        // mainnet: {
        //     url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API}`,
        //     accounts: [process.env.PRIVATEKEY],
        //     gasPrice: 8000000000, // default is 'auto' which breaks chains without the london hardfork
        // },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API}`,
            accounts: [process.env.PRIVATE_KEY!],
            gasPrice: 80000000000, // default is 'auto' which breaks chains without the london hardfork
        },

        // rinkeby: {
        //   url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API}`,
        //   accounts: [process.env.PRIVATEKEY]
        // }
    },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  }

}

export default config;
