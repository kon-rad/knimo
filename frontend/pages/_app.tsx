import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { getProvider } from "../utils/web3";
import Layout from "../components/layout";
import { SEO } from "../components/seo";
import "../styles/Home.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppStateProvider } from "../context/appState";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { getDefaultProvider } from 'ethers';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import "@rainbow-me/rainbowkit/styles.css";
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import ApolloProvider from '../components/apollo';

// /* CSS HEX */
// https://coolors.co/202a25-5f4bb6-86a5d9-26f0f1-c4ebc8
// --dark-jungle-green: #202a25ff;
// --plump-purple: #5f4bb6ff;
// --little-boy-blue: #86a5d9ff;
// --fluorescent-blue: #26f0f1ff;
// --tea-green: #c4ebc8ff;

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  colors: {
    brand: {
      100: "#202a25ff",
      200: "#5f4bb6ff",
      300: "#86a5d9ff",
      lowKeyKool: "var(--lowKeyKool)",
      lowKeyKoolHover: 'var(--lowKeyKoolHover)',
      500: "#c4ebc8ff",
      seduce: "var(--seduce)",
      seduceHover: "var(--seduceHover)",
      lightGreen: 'var(--seduce)',
      900: 'var(--dark-text)',
      darkText: 'var(--dark-text)',
      independence: 'var(--independence)',
      independenceHover: 'var(--independenceHover)',
      confirmed: 'var(--confirmed)',
      active: 'var(--active)',
      activeHover: 'var(--activeHover)',
    },
  },
});

const infuraId = process.env.INFURA_ID

export const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
  4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
  69: "https://kovan.optimism.io/",
  80001: "https://matic-mumbai.chainstacklabs.com/", // mumbai
};

const mumbaiChain = {
  id: 80001,
  name: 'Mumbai',
  network: 'mumbai',
  gas: 2100000,
  gasPrice: 8000000000,
  nativeCurrency: {
    decimals: 18,
    name: 'Matic',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: RPC_URLS[80001],
  },
  testnet: true,
}

const { provider, chains } = configureChains(
  [mumbaiChain,
  // [chain.hardhat],
   chain.polygon],
  [
  infuraProvider({ infuraId }),
  jsonRpcProvider({
    rpc: (chain) => {
      if (chain.id !== mumbaiChain.id) {
        return {
          http: `http://localhost:8545`,
        };
      }
      return { http: chain.rpcUrls.default }
    },
  }),
  ]
)
// const { chains, provider } = configureChains([chain.hardhat], [
//   publicProvider(),
// ])

const { connectors } = getDefaultWallets({
  appName: 'dcom.market',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
        <ApolloProvider>
          <RainbowKitProvider chains={chains} theme={darkTheme({
              accentColor: '#FF3E60',
              accentColorForeground: 'white',
              borderRadius: 'small',
              fontStack: 'system'
            })}>
          <ChakraProvider theme={theme}>
              <AppStateProvider>
              <SEO />
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              </AppStateProvider>
          </ChakraProvider>
          </RainbowKitProvider>
        </ApolloProvider>
    </WagmiConfig>
  );
}


export default MyApp
