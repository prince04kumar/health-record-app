import React from 'react'
import { doctors, doctorImages } from '../../assets/doctors'

const TopCho = () => {
  const filteredDoctors = doctors.filter(doctor => 
    doctor.rating > 4.5
  );
  return (
    <div className='flex h-full flex-col  items-center justify-center w-[91%]'>
        <h1 className='md:text-9xl text-4xl font-bold text-fuchsia-600 m-7'>Top Suggested</h1>
     <div className='flex flex-col md:flex-row justify-center'> {
        filteredDoctors.map((doc, index) => (
          <div key={doc.id} className="flex items-center p-4 border-b bg-[#9999dc] flex-col m-2 rounded-3xl">
            <img src={doctorImages[index]} alt={doc.name} className=" rounded-full" />
            <div className="ml-4">
              <h4 className="font-semibold">{doc.name}</h4>
              <p className="text-sm text-gray-600">{doc.specialty}</p>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default TopCho
