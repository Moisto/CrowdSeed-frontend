import { createContext, useContext, useEffect } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { ethers } from '../constants/ethers-5.1.esm.min.js'
import { contractAbi, contractAddresses } from '../constants/index.js'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  const { chainId: chainIdHex, enableWeb3, Moralis, isWeb3Enabled, isWeb3EnableLoading, account, deactivateWeb3 } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const target = (createCampaignForm) => {
    if (createCampaignForm.target > 0) {
      return ethers.utils.parseUnits(createCampaignForm.target, 18)
    } else {
      return 0
    }
  }
  const { runContractFunction } = useWeb3Contract()
  const createCampaign = async (createCampaignForm) => {
    const params = {
      abi: contractAbi,
      contractAddress: contractAddress,
      functionName: 'createCampaign',
      params: {
        _title: createCampaignForm.title,
        _description: createCampaignForm.description,
        _target: target(createCampaignForm),
        _deadline: new Date(createCampaignForm.deadline).getTime(),
        _image: createCampaignForm.image,
      },
    }

    await runContractFunction({
      params: params,
      onError: (error) => {
        alert(error)
        console.log(error)
      },
    })
  }

  const donateToCampaign = async (id, amount) => {
    const params = {
      abi: contractAbi,
      contractAddress: contractAddress,
      functionName: 'donateToCampaign',
      msgValue: ethers.utils.parseEther(amount),
      params: {
        _id: id,
      },
    }
    await runContractFunction({
      params: params,
      onError: (error) => {
        alert(error)
        console.log(error)
      },
    })
  }

  const getDonators = async (id) => {
    const params = {
      abi: contractAbi,
      contractAddress: contractAddress,
      functionName: 'getDonators',
      params: {
        _id: id,
      },
    }

    const donators = await runContractFunction({
      params: params,
      onSuccess: () => {
        console.log('success')
        console.log(id)
      },
      onError: (error) => {
        alert(error)
        console.log(error)
      },
    })
    return donators
  }

  const { runContractFunction: getCampaigns } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: contractAddress,
    functionName: 'getCampaigns',
  })

  const connectWallet = async () => {
    await enableWeb3()
    if (typeof window != 'undefined') {
      window.localStorage.setItem('Connected', 'Injected')
    }
  }
  const disconnect = () => {
    window.localStorage.removeItem('Connected')
    deactivateWeb3()
  }

  const checkIfWeb3IsEnabled = async () => {
    if (typeof window != 'undefined') {
      if (window.localStorage.getItem('Connected')) {
        connectWallet()
      }
    }
  }
  async function callContract() {
    // const so = await getDonators("0");
    // console.log(so);
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns()
    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner == '0xB8930654A42b97f99A9e627090aaA30246df8435')
    console.log(account.toUpperCase())
    return filteredCampaigns
  }

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (account == null) {
        disconnect()
      }
    })
    checkIfWeb3IsEnabled()
    // callContract();
  }, [])
  useEffect(() => {
    if (isWeb3Enabled) {
      callContract()
    }
    // callContract();
  }, [isWeb3Enabled])

  return (
    <StateContext.Provider
      value={{
        contractAddress,
        createCampaign,
        donateToCampaign,
        connectWallet,
        account,
        isWeb3EnableLoading,
        getCampaigns,
        getUserCampaigns,
        getDonators,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
