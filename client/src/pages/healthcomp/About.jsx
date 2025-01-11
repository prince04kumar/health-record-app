import React from 'react'

const About = () => {
  return (
    <div className='w-[90%] rounded-3xl mt-6 flex justify-center items-center mb-7' style={{backgroundImage: 'url(/About.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '90vh',opacity:''}}>
      <div className=" text-8xl  flex flex-col justify-center items-center">
        <h1 className='text-[#1a1e39] font-bold z-20'>About Us</h1>
        <p className='text-xl text-wrap w-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem provident dolores blanditiis adipisci cumque, commodi delectus fuga aliquam quae accusantium. Ducimus magnam esse iste omnis. Delectus exercitationem ex porro sit reprehenderit. Recusandae, omnis unde. Autem impedit ut hic facilis possimus.</p>
      </div>
    </div>
  )
}

export default About
