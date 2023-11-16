/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { CrowdSeed, CrowdSeedClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<CrowdSeedFund_campaign
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call fund_campaign"
  typedClient={typedClient}
  txn={txn}
  new_camp={new_camp}
/>
*/
type CrowdSeedFund_campaignArgs = Dao['methods']['fund_campaign(pay,string)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: CrowdSeedClient
  txn: CrowdSeedFund_campaignArgs['txn']
  new_camp: CrowdSeedFund_campaignArgs['new_camp']
}

const CrowdSeedFund_campaign = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling fund_campaign`)
    await props.typedClient.fund_campaign(
      {
        txn: props.txn,
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

export default CrowdSeedFund_campaign