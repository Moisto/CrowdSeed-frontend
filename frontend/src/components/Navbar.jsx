import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo, menu, search, thirdweb } from '../assets'
import { navlinks } from '../constants'
import { Connect } from './'
const Navbar = () => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard')
  const [toggleDrawer, setToggleDrawer] = useState(false)
  // const { connectWallet, isWeb3EnableLoading } = useStateContext()
  const address = 'account'

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[25px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaign"
          className="flex w-full font-normal text-[14px] text-white bg-transparent outline-none"
        />
        <div className="w-[72px]  h-full rounded-[20px] bg-[#8b35d0ff] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        {/* <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect Wallet'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if (address) navigate('create-campaign')
            else connectWallet()
          }}
          disabled={isWeb3EnableLoading}
        /> */}
        <Connect />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain " />
          </div>
        </Link>
      </div>
      {/* small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <a className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
        </a>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondray py-4 ${
            toggleDrawer ? 'translate-y-0' : '-translate-y-[100vh]'
          } transition-all duration-700 `}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 cursor-pointer ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name)
                  setToggleDrawer(false)
                  navigate(link.link)
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px]  h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-semibold text-[14px] ${isActive === link.name ? 'text-[#8b35d0ff]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
            {/* <CustomButton
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect Wallet'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (address) navigate('create-campaign')
                else connectWallet()
              }}
              disabled={isWeb3EnableLoading}
            /> */}
            <Connect />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar
