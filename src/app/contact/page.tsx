import { Card } from '@/components/helperFunctions'
import React from 'react'

const Contacts = () => {
  return (
    <div className='bg-theme'>
      <div className='text-4xl text-white font-extrabold py-4 px-9 bg-red-400'> Contact Us</div>
      <div><p className='text-white py-6'>At Bright DiGi Gold, we value the opinion of our customers. Our Customer support service is here to support you if you need any assistance with your account or just want to provide your valuable feedback.</p></div>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
        <Card imageUrl="https://www.brightdigigold.com/images/telephone-call.png" title="CALL US" description='+91 9289480033' linkTo="www.google.com" />
        <Card imageUrl="https://www.brightdigigold.com/images/email.png" title="MAIL US" description='support@brightdigigold.com' linkTo="www.google.com" />
        <Card imageUrl="https://www.brightdigigold.com/images/placeholder.png" title="REACH US" description="BRIGHT DIGI GOLD PRIVATE LIMITED 501, 5th Floor, World Trade Center, Babar Road, New Delhi - 110001" linkTo="/your-link-url"
        />
      </div>
      <p className='text-white py-4'>Our Team is Open to feedback and suggestions. If you wish to share your reviews with us, you are most welcome to do so. We strive to continually improve and provide the best possible experience for our customers.</p>
      <p className='text-white py-2'>Thank you for choosing Bright DiGi Gold. We look forward to hearing from you.</p>
    </div>
  )
}

export default Contacts