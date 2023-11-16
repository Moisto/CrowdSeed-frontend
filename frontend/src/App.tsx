import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet'
import { Route, Routes } from 'react-router-dom'
import { Navbar, Sidebar } from './components'
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages'
// import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders, useWallet } from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import algosdk from 'algosdk'
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'
function App() {
  let providersArray: ProvidersArray
  if (import.meta.env.VITE_ALGOD_NETWORK === '') {
    const kmdConfig = getKmdConfigFromViteEnvironment()
    providersArray = [
      {
        id: PROVIDER_ID.KMD,
        clientOptions: {
          wallet: kmdConfig.wallet,
          password: kmdConfig.password,
          host: kmdConfig.server,
          token: String(kmdConfig.token),
          port: String(kmdConfig.port),
        },
      },
    ]
  } else {
    providersArray = [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.EXODUS },
      // If you are interested in WalletConnect v2 provider
      // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
    ]
  }

  const algodConfig = getAlgodConfigFromViteEnvironment()

  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  })

  return (
    <WalletProvider value={walletProviders}>
      <div className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row font-epilogue">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
        </div>
      </div>
    </WalletProvider>
  )
}

export default App
