import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import { FundCard } from './'

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate()

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  return (
    <div>
      <h1 className="font-semibold text-white text-[18px] text-left">
        {title}({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />}
        {!isLoading && campaigns.length === 0 && (
          <p className="text-[#818183] font-semibold text-[14px] leading-[30px]">No Campaigns Found</p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => <FundCard key={campaign.id} {...campaign} handleClick={() => handleNavigate(campaign)} />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns
