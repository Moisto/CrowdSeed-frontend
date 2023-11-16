/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { CrowdSeed, CrowdSeedClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<CrowdSeedGet_campaign
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call get_campaign"
  typedClient={typedClient}
  new_camp={new_camp}
/>
*/
type CrowdSeedGet_campaignArgs = Dao['methods']['get_campaign(string)(string,string,string,uint64,uint64,uint64,address,bool)']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: CrowdSeedClient
  new_camp: CrowdSeedGet_campaignArgs['new_camp']
}

const CrowdSeedGet_campaign = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling get_campaign`)
    await props.typedClient.get_campaign(
      {
        new_camp: props.new_camp,
      },
      { sender },
    )
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default CrowdSeedGet_campaign