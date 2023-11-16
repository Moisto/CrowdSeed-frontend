/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { CrowdSeed, CrowdSeedClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<CrowdSeedApproveCampaign
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call approveCampaign"
  typedClient={typedClient}
  new_camp={new_camp}
/>
*/
type CrowdSeedApproveCampaignArgs = Dao['methods']['approveCampaign(string)(string,string,string,uint64,uint64,uint64,address,bool)']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: CrowdSeedClient
  new_camp: CrowdSeedApproveCampaignArgs['new_camp']
}

const CrowdSeedApproveCampaign = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling approveCampaign`)
    await props.typedClient.approveCampaign(
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

export default CrowdSeedApproveCampaign