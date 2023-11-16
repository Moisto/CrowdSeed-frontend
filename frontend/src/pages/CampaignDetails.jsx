import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { thirdweb } from '../assets'
import { CountBox, CustomButton, Loader } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'

const CampaignDetails = () => {
  const { state } = useLocation()
  // const {
  //   getDonations,
  //   contractAddress,
  //   account,
  //   donateToCampaign,
  //   getDonators,
  // } = useStateContext();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [donators, setDonators] = useState([])

  const remainingDays = daysLeft(state.deadline)

  // const fetchDonators = async () => {
  //   const data = await getDonators(state.pId)
  //   const numberOfDonations = data[0].length
  //   const parsedDonations = []
  //   for (let i = 0; i < numberOfDonations; i++) {
  //     parsedDonations.push({
  //       donator: data[0][i],
  //       donation: ethers.utils.formatEther(data[1][i].toString()),
  //     })
  //   }
  //   setDonators(parsedDonations)
  // }
  const handleDonate = async () => {
    // setIsLoading(true)
    // await donateToCampaign(state.pId, amount)
    // setIsLoading(false)
    // setAmount('')
    // navigate('/')
  }

  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaignImg" className="w-full h-[410px] object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2 rounded-[10px]">
            <div
              className="absolute h-full bg-[#4acd8d] rounded-[10px]"
              style={{
                width: `${calculateBarPercentage(state.target, state.amountCollected)}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-semibold text-[18px] text-white uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="logo" className="w-[60%] h-[60%] object-contain" />
              </div>
              <div>
                <h4 className="font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-normal text-[12px] text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] text-white uppercase">Story</h4>
            <div className="mt-[20px]">
              <p className="font-normal text-[16px] leading-[26px] text-justify text-[#808191]">{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] text-white uppercase">Donators</h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((items, index) => (
                  <div key={index} className="flex justify-between items-center gap-4">
                    <p className="font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                      {index + 1}. {items.donator}
                    </p>
                    <p className="font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">{items.donation} ETH</p>
                  </div>
                ))
              ) : (
                <p className="font-normal text-[16px] leading-[26px] text-justify text-[#808191]">No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-[18px] text-white uppercase">fund</h4>
          <div className="mt-[20px] flex flex-col p-4 rounded-[10px] bg-[#1c1c24] ">
            <p className="font-medium text-[20px] leading-[30px] text-center text-[#808191]">Fund the campaign</p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="mt-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-semibold text-[14px] leading-[22px] text-white">Back it because you believe on it.</h4>
                <p className="mt-[20px] font-normal leading-[22px] text-[#808191] ">
                  Support the project for no reward, just because it speaks to you.
                </p>
              </div>
              <CustomButton btnType="button" title="Fund Campaign" styles="w-full bg-[#8c6dfd] mt-[20px]" handleClick={handleDonate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CampaignDetails
