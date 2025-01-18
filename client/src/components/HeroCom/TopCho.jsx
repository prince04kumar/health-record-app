import React from 'react'
import { doctors, doctorImages } from '../../assets/doctors'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TopCho = () => {
  const filteredDoctors = doctors.filter(doctor => 
    doctor.rating > 4.5
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2
      }
    })
  };

  return (
    <div className='flex h-full flex-col items-center justify-center bg-blue-500'>
      <h1 className='md:text-7xl text-4xl font-bold text-white m-7 lora'>Top Suggested</h1>
      <div className='flex flex-col md:flex-row justify-center'>
        {filteredDoctors.map((doc, index) => {
          const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
          return (
            <motion.div
              key={doc.id}
              className="flex items-center p-6 border-b bg-[#1b58fe] flex-col m-4 rounded-3xl"
              custom={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              ref={ref}
            >
              <img src={doctorImages[index]} alt={doc.name} className="rounded-full" />
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-lg text-[#fff]">{doc.name}</h4>
                <p className="text-sm text-[#fff]">{doc.specialty}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  )
}

export default TopCho
