// doctors.js

const doctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      experience: "10 years",
      location: "New York, NY",
      contact: "john.doe@example.com",
      rating: 4.5,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "Dermatologist",
      experience: "8 years",
      location: "Los Angeles, CA",
      contact: "jane.smith@example.com",
      rating: 4.7,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "Pediatrician",
      experience: "12 years",
      location: "Chicago, IL",
      contact: "emily.johnson@example.com",
      rating: 4.8,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Dr. Mark Brown",
      specialty: "Neurologist",
      experience: "15 years",
      location: "Houston, TX",
      contact: "mark.brown@example.com",
      rating: 4.6,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Dr. Susan Davis",
      specialty: "Oncologist",
      experience: "20 years",
      location: "Phoenix, AZ",
      contact: "susan.davis@example.com",
      rating: 4.9,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Dr. Robert Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "13 years",
      location: "Philadelphia, PA",
      contact: "robert.wilson@example.com",
      rating: 4.4,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      name: "Dr. Michael Clark",
      specialty: "Urologist",
      experience: "9 years",
      location: "San Antonio, TX",
      contact: "michael.clark@example.com",
      rating: 4.3,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      name: "Dr. Laura Martinez",
      specialty: "Gynecologist",
      experience: "7 years",
      location: "San Diego, CA",
      contact: "laura.martinez@example.com",
      rating: 4.6,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      name: "Dr. Steven White",
      specialty: "Endocrinologist",
      experience: "18 years",
      location: "Dallas, TX",
      contact: "steven.white@example.com",
      rating: 4.5,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 10,
      name: "Dr. Jessica Lee",
      specialty: "Psychiatrist",
      experience: "11 years",
      location: "San Jose, CA",
      contact: "jessica.lee@example.com",
      rating: 4.7,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 11,
      name: "Dr. William Harris",
      specialty: "Pulmonologist",
      experience: "14 years",
      location: "Austin, TX",
      contact: "william.harris@example.com",
      rating: 4.6,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 12,
      name: "Dr. Karen Robinson",
      specialty: "Rheumatologist",
      experience: "16 years",
      location: "Jacksonville, FL",
      contact: "karen.robinson@example.com",
      rating: 4.8,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 13,
      name: "Dr. Brian Lewis",
      specialty: "Gastroenterologist",
      experience: "12 years",
      location: "Columbus, OH",
      contact: "brian.lewis@example.com",
      rating: 4.7,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 14,
      name: "Dr. Amy Walker",
      specialty: "Ophthalmologist",
      experience: "10 years",
      location: "Charlotte, NC",
      contact: "amy.walker@example.com",
      rating: 4.5,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 15,
      name: "Dr. Richard King",
      specialty: "Anesthesiologist",
      experience: "22 years",
      location: "San Francisco, CA",
      contact: "richard.king@example.com",
      rating: 4.9,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 16,
      name: "Dr. Patricia Scott",
      specialty: "Nephrologist",
      experience: "13 years",
      location: "Indianapolis, IN",
      contact: "patricia.scott@example.com",
      rating: 4.4,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 17,
      name: "Dr. James Green",
      specialty: "Allergist",
      experience: "6 years",
      location: "Seattle, WA",
      contact: "james.green@example.com",
      rating: 4.3,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 18,
      name: "Dr. Barbara Adams",
      specialty: "Plastic Surgeon",
      experience: "17 years",
      location: "Denver, CO",
      contact: "barbara.adams@example.com",
      rating: 4.7,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 19,
      name: "Dr. David Baker",
      specialty: "Radiologist",
      experience: "9 years",
      location: "Washington, DC",
      contact: "david.baker@example.com",
      rating: 4.5,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 20,
      name: "Dr. Linda Carter",
      specialty: "Hematologist",
      experience: "11 years",
      location: "Boston, MA",
      contact: "linda.carter@example.com",
      rating: 4.8,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 21,
      name: "Dr. Frank Hernandez",
      specialty: "Immunologist",
      experience: "19 years",
      location: "Detroit, MI",
      contact: "frank.hernandez@example.com",
      rating: 4.6,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 22,
      name: "Dr. Elizabeth Clark",
      specialty: "Infectious Disease Specialist",
      experience: "10 years",
      location: "Nashville, TN",
      contact: "elizabeth.clark@example.com",
      rating: 4.7,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 23,
      name: "Dr. George Martinez",
      specialty: "Vascular Surgeon",
      experience: "21 years",
      location: "Portland, OR",
      contact: "george.martinez@example.com",
      rating: 4.9,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 24,
      name: "Dr. Michelle Allen",
      specialty: "Neurosurgeon",
      experience: "15 years",
      location: "Memphis, TN",
      contact: "michelle.allen@example.com",
      rating: 4.8,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 25,
      name: "Dr. Charles Wright",
      specialty: "Geriatrician",
      experience: "23 years",
      location: "Las Vegas, NV",
      contact: "charles.wright@example.com",
      rating: 4.7,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 26,
      name: "Dr. Deborah Young",
      specialty: "Occupational Therapist",
      experience: "12 years",
      location: "Louisville, KY",
      contact: "deborah.young@example.com",
      rating: 4.6,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 27,
      name: "Dr. Matthew Hall",
      specialty: "Speech Therapist",
      experience: "8 years",
      location: "Baltimore, MD",
      contact: "matthew.hall@example.com",
      rating: 4.4,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 28,
      name: "Dr. Nancy Evans",
      specialty: "Geneticist",
      experience: "18 years",
      location: "Milwaukee, WI",
      contact: "nancy.evans@example.com",
      rating: 4.9,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 29,
      name: "Dr. Kevin Lopez",
      specialty: "Podiatrist",
      experience: "10 years",
      location: "Albuquerque, NM",
      contact: "kevin.lopez@example.com",
      rating: 4.5,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 30,
      name: "Dr. Lisa Turner",
      specialty: "Chiropractor",
      experience: "5 years",
      location: "Tucson, AZ",
      contact: "lisa.turner@example.com",
      rating: 4.4,
      image: "https://via.placeholder.com/150",
    },
  ];
  


import background from './background.png';
import background1 from './background1.jpg';
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import loderbackground from './loderbackground.png'
export default {
  
    background,
    background1,
    loderbackground

}


const doctorImages = [
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
    doc9,
    doc10,
    doc11,
    doc12,
    doc13,

    doc14,
    doc15,
]

export { doctors,doctorImages };


 
  