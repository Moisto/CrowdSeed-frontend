/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { CrowdSeed, CrowdSeedClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<CrowdSeedDeposit
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call deposit"
  typedClient={typedClient}
  txn={txn}
/>
*/
type CrowdSeedDepositArgs = Dao['methods']['deposit(pay)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: CrowdSeedClient
  txn: CrowdSeedDepositArgs['txn']
}

const CrowdSeedDeposit = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling deposit`)
    await props.typedClient.deposit(
      {
        txn: props.txn,
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

export default CrowdSeedDeposit