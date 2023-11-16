/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { CrowdSeed, CrowdSeedClient } from '../contracts/crowdseedClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<CrowdSeedAdd_campaign
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call add_campaign"
  typedClient={typedClient}
  new_camp={new_camp}
  name={name}
  desc={desc}
  image={image}
  goal={goal}
  deadline={deadline}
/>
*/
// type CrowdSeedAdd_campaignArgs = CrowdSeed['methods']['add_campaign(any,any,any,any,any,any)void']['argsObj']

// type Props = {
//   buttonClass: string
//   buttonLoadingNode?: ReactNode
//   buttonNode: ReactNode
//   typedClient: CrowdSeedClient
//   new_camp: CrowdSeedAdd_campaignArgs['new_camp']
//   name: CrowdSeedAdd_campaignArgs['name']
//   desc: CrowdSeedAdd_campaignArgs['desc']
//   image: CrowdSeedAdd_campaignArgs['image']
//   goal: CrowdSeedAdd_campaignArgs['goal']
//   deadline: CrowdSeedAdd_campaignArgs['deadline']
// }

const CrowdSeedAdd_campaign = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling add_campaign`)
    console.log(props.deadline)
    await props.typedClient.addCampaign(
      {
        new_camp: props.new_camp,
        name: props.name,
        desc: props.desc,
        image: props.image,
        goal: props.goal,
        deadline: props.deadline,
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

export default CrowdSeedAdd_campaign
