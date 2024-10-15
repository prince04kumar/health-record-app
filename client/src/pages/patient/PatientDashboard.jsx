import React from 'react'
import SidePanel from './patientComponents/sidepannel'
import RightPanel from './patientComponents/rightPannel'

const PatientDashboard = () => {
  return (
    <div className='flex '>
        <SidePanel/>
        <RightPanel/>

    </div>
  )
}

export default PatientDashboard
