import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faTwitter, faInstagram, faLinkedin, faGithub,  faWordpress} from '@fortawesome/free-brands-svg-icons';
import team from "../../images/team.jpeg"
import RajeshSir from "../../images/rajeshsir.webp"
import anupam from "../../images/founders/anupam.webp"
import arpit from "../../images/founders/arpit.webp"
import himanshu from "../../images/founders/himanshu.webp"
import soniya from "../../images/founders/soniya.webp"
import apoorva from "../../images/thirdyear/apoorva.webp";
import aryaman from "../../images/thirdyear/aryaman.webp";
import chirayu from "../../images/thirdyear/chirayu.webp";
import darshan from "../../images/thirdyear/darshan.webp";
import devansh from "../../images/thirdyear/devansh.webp";
import harshit from "../../images/thirdyear/harshit.webp";
import avatar from "../../images/thirdyear/images.jpg";
import ishika from "../../images/thirdyear/ishika.webp";
import pavnesh from "../../images/thirdyear/pavnesh.webp";
import puneet from "../../images/thirdyear/puneet.webp";
import rahul from "../../images/thirdyear/rahul.webp";
import vinamra from "../../images/secondyear/vinamra.webp";
import divyansh from "../../images/secondyear/divyansh.webp";
import nishant from "../../images/secondyear/nishant.webp";
import abhinav from "../../images/secondyear/abhinav.webp";
import sudeshna from "../../images/secondyear/sudeshna.webp";
import aman from "../../images/secondyear/aman.webp";
import mahak from "../../images/secondyear/mahak.webp";
import pranjali from "../../images/secondyear/pranjali.webp";
import ashok from "../../images/secondyear/ashok.webp";
import piyush from "../../images/alumni/piyush.jpeg";
import kriti from "../../images/alumni/kriti.jpeg";
import nimesh from "../../images/alumni/nimesh.jpeg";
import devnath from "../../images/alumni/devnath.jpeg";
import vikalp from "../../images/alumni/vikalp.jpeg"
import priyansh from '../../images/firstyear/priyansh.webp'
import jaydeep from '../../images/firstyear/jaydeep.webp'
import granth from '../../images/firstyear/granth.webp'
import rupesh from '../../images/firstyear/rupesh.webp'
import harshitS from '../../images/firstyear/harshit.webp'
import meet from '../../images/firstyear/meet.webp'
import yug from '../../images/firstyear/yug.png'
// interface pic_detail {
//   name: string;
//   image: StaticImageData;
//   desc: string;
//   github: string;
//   linkedin: string;
//   twitter: string;
//   instagram: string;
//   facebook: string;
// }

const founders= [
  {
    name: "HIMANSHU GOTHWAL",
    image: himanshu,
    desc: "Software Developer Epic",
    github: "",
    linkedin: "https://www.linkedin.com/in/himanshu-gothwal-8a61a816/",
    twitter: "",
    instagram: "",
    facebook: "https://www.facebook.com/hims333"
  },
  {
    name: "ARPIT JAIN",
    image: arpit,
    desc: "Co-Founder Engineer's Garage",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "https://www.facebook.com/arpit.jain.37604"
  },
  {
    name: "ANUPAM KUMAR",
    image: anupam,
    desc: "Signal Engineer Indian Railway Services",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "https://www.facebook.com/anupamkrmeena"
  },
  {
    name: "SONIYA JAIN",
    image: soniya,
    desc: "Works at DRDO",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "https://www.facebook.com/soniya.jain.583671"
  }
];

const alumni = [
  {
    name: "Piyush Jha",
    desc: "MASc Student at University of Waterloo\nArtificial Intelligence R&D Engineer @Quadrical.ai",
    image: piyush,
    linkedin: "https://linkedin.com/in/piyush-j/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Kriti Gupta",
    desc: "Software Developer at Apple\nGraduate Services Assistant at Arizona State University",
    image: kriti,
    linkedin: "https://www.linkedin.com/in/kritigupta13/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Nimesh Khandelwal",
    desc: "Ph.D. Graduate Student at Indian Institute of Technology, Kanpur",
    image: nimesh,
    linkedin: "https://www.linkedin.com/in/nimesh-khandelwal-464b6a125/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Devnath Nair",
    desc: "Robotics Engineer in Autonomous Guided Vehicles at Addverb Technologies, Australia",
    image: devnath,
    linkedin: "https://www.linkedin.com/in/devnath-nair/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Vikalp Saini",
    desc: "ESE 2020 - AIR 23,\nPosting - Assistant Director,\nCentral Electricity Authority,\nMinistry of Power",
    image: vikalp,
    linkedin: "https://www.linkedin.com/in/vikalp-saini-3750961b2/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  
  {
    name: "Vasanth Reddy",
    desc: "Graduate Research Assistant at Virginia Tech",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/vasanth-reddy-778816108/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Divyam Aditya Singh",
    desc: "Rakuten Symphony",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/divyam-aditya-singh-870369140/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Puru Lokendra Singh",
    desc: "SDE at Publicis Sapient",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/puru-lokendra-singh-b9a948134/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Samidha Verma",
    desc: "SDE at Amazon",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/samidhaverma/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "MD SAIF",
    desc: "Senior Product Engineer at Tredence Inc.",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/md-saif-111267128/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Mrigakshi Pandey",
    desc: "Software Engineer at Fidelity Investments",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/mrigakshipandey/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Rahul Ravichandran",
    desc: "Robotics Engineer at Turftank",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/rahul-ravichandran-b89363129/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Akshay Kumar",
    desc: "Computer Vision Engineer at Invisible AI | Roboticist",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/kumarakshay324/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Ayush Jhalani",
    desc: "Software Developer at Honeywell Intelligrated",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/ayushjhalani/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Devang Anant Darode",
    desc: "R&D intern at BEC Robotics",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/devangdarode/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Jatin Verma",
    desc: "AI Scientist at WaveScan Technologies Pte. Ltd.",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/jverma205/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Sarthak Jain",
    desc: "MS Software Engineering, San Jose State Univ, USA",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/sarthak-jain29/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Karsh Tharayani",
    desc: "Robotics Algorithm Developer at MathWorks",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/karsh-tharyani-264a48104/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Shubham Tripathi",
    desc: "Applied Researcher, Microsoft",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/stripathi08/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Saatvik Shah",
    desc: "Software Engineer at IMC Trading",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/saatvikshah/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Sanjay Thakur",
    desc: "Founder and CEO at Rydesafely",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/sanjay-thakur-49a704176/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Anshul Mittal",
    desc: "Founding Member at SALT - mysaltapp",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/anshulmittal712/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Avinash Sharma",
    desc: "Imaging Scientist at Algolux",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/avinash-sharma-561335a3/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Akash Shah",
    desc: "Product & Growth @ OYO",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/akash-shah-604/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Anirudha Kumar",
    desc: "Assistant Commissioner, State Tax at Government of Bihar",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/anirudha-kumar-151635a0/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Mihika Gupta",
    desc: " Experienced AssociateExperienced Associate",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/avinash-sharma-561335a3/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Avinash Sharma",
    desc: "Imaging Scientist at Algolux",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/avinash-sharma-561335a3/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Alok Agrawal",
    desc: "Sr. Software Controls Engineer at Medtronic",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/agrawalalok1/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Nirmala  Kunwar",
    desc: "Electronics Engineer",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/nirmala-kunwar-ranawat/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Rohit Saxena",
    desc: "Associate Manager - Demand Planning",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/rohit-saxena-692094189/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""
  },
  {
    name: "Ankita Gupta",
    desc: "Associate Manager - Demand Planning",
    image: avatar,
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "https://www.facebook.com/ankita.gupta.39142/about_work_and_education",
    github: ""
  },

  {
    name: "Anirudh Kumar",
    desc: "	Assistant Commissioner, State Tax at Government of Bihar",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/anirudha-kumar-151635a0/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Maitreyee mehta",
    desc: "",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/mihika-gupta-a57846171/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Rajat Kumar Arya",
    desc: "Saint-Gobain",
    image: avatar,
    linkedin: "	https://www.linkedin.com/in/rajk21feb/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Piyush Chauhan",
    desc: "Investment Banking Analyst at Bank of America	",
    image: avatar,
    linkedin: "	https://www.linkedin.com/in/piyush-chauhan-b91704138/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Paresh Anand",
    desc: "Senior Associate at PwC, MBA, IIM K ",
    image: avatar,
    linkedin: "	https://www.linkedin.com/in/paresh-anand/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Sharad Garg",
    desc: "Project Leader at De Shaw",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/sharad-garg-6b191194/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Vaibhav Jainya",
    desc: "SMTS at Salesforce",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/vaibhavjainvj/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Akshay Kumar",
    desc: "Computer Vision Engineer at Invisible AI | Roboticist, MS, Robotics Engineering, Worcester Polytechnic Insitute, Massachusetts, US",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/kumarakshay324/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Ayush Jhalani",
    desc: "Software Developer at Honeywell Intelligrated, MS, Robotic System Development, Carnegie Mellon University, US",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/ayushjhalani/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Devang Anant Darode",
    desc: "R&D intern at BEC Robotics, M. Sc. Robotic Systems Engineering, RWTH Aachen, Germany",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/devangdarode/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },
  {
    name: "Jatin Verma",
    desc: "AI Scientist at WaveScan Technologies Pte. Ltd, ME, Nanyang Technological University, Singapore",
    image: avatar,
    linkedin: "https://www.linkedin.com/in/jverma205/",
    twitter: "",
    instagram: "",
    facebook: "",
    github: ""

  },

 
];



const finalyear = [
  {
    name: "APOORVA RAJ",
    image: apoorva,
    desc: "Mechanical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/apoorva-raj-840a871ab",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "ARYAMAN SINGH",
    image: aryaman,
    desc: "Electrical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/aryaman-singh-kushwaha-a139491b0/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "CHIRAYU RANKAWAT",
    image: chirayu,
    desc: "Mechanical Engineering",
    github: "",
    linkedin: "https://in.linkedin.com/in/chirayu-rankawat",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "DARSHAN DUSAD",
    image: darshan,
    desc: "Computer Science Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/darshan-dusad-22b96b1ab/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "DEVANSH GARG",
    image: devansh,
    desc: "Mechanical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/DevanshGarg31",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "HARSHIT GARG",
    image: harshit,
    desc: "Mechanical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/harshitgrg",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  // {
  //   name: "ISHIKA PANWAR",
  //   image: ishika,
  //   desc: "Computer Science Engineering",
  //   github: "",
  //   linkedin: "https://www.linkedin.com/in/ishika-panwar-23a5551a1/",
  //   twitter: "",
  //   instagram: "",
  //   facebook: ""
  // },
  {
    name: "PAVNESH CHATURVEDI",
    image: pavnesh,
    desc: "Electronics and Communication Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/pavnesh-chaturvedi-208b15197/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "PUNEET SINGH",
    image: puneet,
    desc: "Electronics and Communication Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/puneet-singh-2001/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "RAHUL RAJ",
    image: rahul,
    desc: "Mechanical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/rahul-raj-4b6a271ba/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
];

const thirdyear = [
  {
    name: "VINAMRA VASHISHTH",
    image: vinamra,
    desc: "Computer Science Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/vinamra-vashishth-721785201/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
   name: "NISHANT GARG",
    image: nishant,
    desc: "Computer Science Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/nishant-garg-968205208/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "DIVYANSH GARG",
    image: divyansh,
    desc: "Electronics and Communication Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/dggrx/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "ABHINAV KUMAR",
    image: abhinav,
    desc: "Electrical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/abhinav-kumar-5b2097205/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "SUDESHNA SONKAR",
    image: sudeshna,
    desc: "Mechanical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/sudeshna-sonkar-56b481209/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "PRANJALI SRIVASTAVA",
    image: pranjali,
    desc: "Mechanical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/pranjali-srivastava-b229b8223/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "MAHAK GARG",
    image: mahak,
    desc: "Electrical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/mahak-garg-825213212/",
    twitter: "",
    instagram: "",
    facebook: ""

  },
  // {
  //   name: "AMAN MITTAL",
  //   image: aman,
  //   desc: "Computer Science Engineering",
  //   github: "",
  //   linkedin: "https://www.linkedin.com/in/aman-mittal-9851b31b9/",
  //   twitter: "",
  //   instagram: "",
  //   facebook: ""
  // },
  {
    name: "ASHOK KUMAR SAINI",
    image: ashok,
    desc: "Electrical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/ashok-kumar-saini-505b9b202/",
    twitter: "",
    instagram: "",
    facebook: ""

  }
]

const secondyear = [
  {
    name: "Priyansh Kothari",
    image: priyansh,
    desc: "Computer Science Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/priyansh-kothari-648a161a5/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "Jaydeep Singh",
    image: jaydeep,
    desc: "Civil Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/jaydeep-singh-8ab748226/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
 
 
  {
    name: "Harshit Sandilya",
    image: harshitS,
    desc: "Computer Science Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/harshit-sandilya-625a47230/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "Rupesh Yadav",
    image: rupesh,
    desc: "Electronics and Communication Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/rupesh-yadav-634879229/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "Meet Kasvala",
    image: meet,
    desc: "Electrical Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/meet-kasvala-8302a4223/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "Yug Modi",
    image: yug,
    desc: "Computer Science Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/yug-modi-27b965215/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
  {
    name: "Granth Gupta",
    image: granth,
    desc: "Computer Science Engineering",
    github: "",
    linkedin: "https://www.linkedin.com/in/granth-gupta-3b9648238/",
    twitter: "",
    instagram: "",
    facebook: ""
  },
]


const Team = () => {
    return(
      <div className="text-black bg-white w-screen justify-center">
        <div className="keen-slider__slide number-slide11 h-60 md:h-100 lg:h-130 mb-4">
          <div className="absolute left-8 pl-16 text-xl md:text-3xl lg:text-5xl">
            <p>Team</p>
          </div>
        </div>
        <h1 className="pt-8 text-4xl text-center px-12 lg:px-24">Our Founders: The Roots Of Our Tree</h1>
        <div className="pt-16 grid grid-cols-1 lg:grid-cols-2 px-12 lg:px-24">
          <div className="col-span-1 w-48 member-hover lg:w-80 justify-self-center">
            <Image className="rounded-full" src={RajeshSir} placeholder="blur"/>
            <div className="text-center grid mt-4 justify-evenly grid-cols-3">
              <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href="https://drrajeshkumar.wordpress.com/"><FontAwesomeIcon icon={faWordpress} className="text-black mr-4" size="2x" /></Link></div>
              <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href="https://www.linkedin.com/in/drrajeshkumar/"><FontAwesomeIcon icon={faLinkedin} className="text-blue-600 mr-4" size="2x" /></Link></div>
              <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href="https://www.facebook.com/rkumar.ee"><FontAwesomeIcon icon={faFacebook} className="text-blue-800 mr-4" size="2x" /></Link></div>
            </div>
          </div>
          <div className="col-span-1 my-auto">
            <h1 className="text-2xl text-center font-bold">DR. RAJESH KUMAR</h1>
            <p className="text-center">Fellow IET (UK), Fellow IETE, Fellow IE (India),  SMIEEE (USA), LMCSI,  LMISTE</p>
            <p className="text-center">Professor, Department of Electrical Engineering</p>
            <p className="text-center">Malaviya National Institute of Technology, Jaipur</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-16 px-12 lg:px-24">
        {founders.map((item, index) => (
          <div key={index} className="col-span-1">
            <h1 className="text-black py-2 font-nunito text-center">
              <div className="w-48 mx-auto member-hover">
                <Image className="rounded-full" src={item.image} placeholder="blur"/>
              </div>
              <p className="text-center text-xl font-bold">{item.name}</p>
              <p className="text-center text-md text-gray-600">{item.desc}</p>
              <div className="text-center">
              <div className="grid grid-flow-col auto-cols-auto w-64 mt-2 mx-auto justify-evenly px-8">
                {item.github !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.facebook}><FontAwesomeIcon icon={faGithub} className="text-black mr-4" size="2x" /></Link></div> : <></>}
                {item.linkedin !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.linkedin}><FontAwesomeIcon icon={faLinkedin} className="text-blue-600 mr-4" size="2x" /></Link></div> : <></>}
                {item.instagram !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.twitter}><FontAwesomeIcon icon={faInstagram} className="text-red-500 mr-4" size="2x" /></Link></div> : <></>}
                {item.facebook !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.facebook}><FontAwesomeIcon icon={faFacebook} className="text-blue-800 mr-4" size="2x" /></Link></div> : <></>}
              </div>
              </div>
            </h1>
          </div>
        ))}
        </div>
        { <h1 className="pt-12 text-center font-bold text-4xl px-12 lg:px-24">FINAL YEAR</h1> }
         { <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-16 px-12 lg:px-24">
        {
        finalyear.map((item, index) => (
          <div key={index} className="col-span-1">
            <h1 className="text-black py-2 font-nunito text-center">
              <div className="w-48 mx-auto member-hover">
                <Image className="rounded-full" src={item.image} placeholder="blur"></Image>
              </div>
              <p className="text-center text-xl font-bold">{item.name}</p>
              <p className="text-center text-gray-600 text-md">{item.desc}</p>
              <div className="text-center">
              <div className="grid grid-flow-col auto-cols-auto mt-2 w-64 mx-auto">
                {item.github !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.facebook}><FontAwesomeIcon icon={faGithub} className="text-black mr-4" size="2x" /></Link></div> : <></>}
                {item.linkedin !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.linkedin}><FontAwesomeIcon icon={faLinkedin} className="text-blue-600 mr-4" size="2x" /></Link></div> : <></>}
                {item.instagram !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.twitter}><FontAwesomeIcon icon={faInstagram} className="text-red-500 mr-4" size="2x" /></Link></div> : <></>}
                {item.facebook !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.facebook}><FontAwesomeIcon icon={faFacebook} className="text-blue-800 mr-4" size="2x" /></Link></div> : <></>}
              </div>
              </div>
            </h1>
          </div>
        ))
        }
        </div> }
      
        <h1 className="pt-12 text-center font-bold text-4xl px-12 lg:px-24">THIRD YEAR</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-16 px-12 lg:px-24">
        {thirdyear.map((item, index) => (
          <div key={index} className="col-span-1">
            <h1 className="text-black py-2 font-nunito text-center">
              <div className="w-48 mx-auto member-hover">
                <Image className="rounded-full" src={item.image} placeholder="blur"></Image>
              </div>
              <p className="text-center text-xl font-bold">{item.name}</p>
              <p className="text-center text-md text-gray-600">{item.desc}</p>
              <div className="text-center">
              <div className="grid grid-flow-col auto-cols-auto mt-2 w-64 mx-auto">
                {item.github !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.facebook}><FontAwesomeIcon icon={faGithub} className="text-black mr-4" size="2x" /></Link></div> : <></>}
                {item.linkedin !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.linkedin}><FontAwesomeIcon icon={faLinkedin} className="text-blue-600 mr-4" size="2x" /></Link></div> : <></>}
                {item.instagram !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.twitter}><FontAwesomeIcon icon={faInstagram} className="text-red-500 mr-4" size="2x" /></Link></div> : <></>}
                {item.facebook !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.facebook}><FontAwesomeIcon icon={faFacebook} className="text-blue-800 mr-4" size="2x" /></Link></div> : <></>}
              </div>
              </div>
            </h1>
          </div>
        ))}
        </div>

        <h1 className="pt-12 text-center font-bold text-4xl px-12 lg:px-24">SECOND YEAR</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-16 px-12 lg:px-24">
        {secondyear.map((item, index) => (
          <div key={index} className="col-span-1">
            <h1 className="text-black py-2 font-nunito text-center">
              <div className="w-48 mx-auto member-hover">
                <Image className="rounded-full" src={item.image} placeholder="blur"></Image>
              </div>
              <p className="text-center text-xl font-bold">{item.name}</p>
              <p className="text-center text-md text-gray-600">{item.desc}</p>
              <div className="text-center">
              <div className="grid grid-flow-col auto-cols-auto mt-2 w-64 mx-auto">
                {item.github !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.facebook}><FontAwesomeIcon icon={faGithub} className="text-black mr-4" size="2x" /></Link></div> : <></>}
                {item.linkedin !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.linkedin}><FontAwesomeIcon icon={faLinkedin} className="text-blue-600 mr-4" size="2x" /></Link></div> : <></>}
                {item.instagram !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.twitter}><FontAwesomeIcon icon={faInstagram} className="text-red-500 mr-4" size="2x" /></Link></div> : <></>}
                {item.facebook !== "" ? <div className="cursor-pointer transform-gpu transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={item.facebook}><FontAwesomeIcon icon={faFacebook} className="text-blue-800 mr-4" size="2x" /></Link></div> : <></>}
              </div>
              </div>
            </h1>
          </div>
        ))}
        </div>

      </div>
    )
}

export default Team;

// float effect on image hover.
