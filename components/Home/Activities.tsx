import React from "react";
import Link from "next/link"
import Image from "next/image"
import Competition from "../../images/comp_isro.webp"
import RandD from "../../images/basanti.webp"
import Workshop from "../../images/workshop_2024.webp"

const ZineActivities = () => {
    return(
        <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 px-12 lg:px-24 xl:px-48 gap-8 pt-8">
                <a href="/achievements">
                    <div className="col-span-1 bg-gray-100 rounded-xl p-4 shadow-xl hover:bg-gray-200 transition duration-500 ease-in-out">
                        <Image src={Competition} className="rounded-lg object-cover" />
                        <h1 className="text-xl lg:h-10 py-4 font-semibold">Competitions</h1>
                        <p className="lg:h-88 xl:h-84 2xl:h-72 lg:pt-9 ">Our team has participated and emerged victorious in various national and international robotics events for the past decade owing to the skills and commitment of our members. We firmly believe that having participated in various national and international level events has lended us valuable experience and a knack for victory competing alongside the most premiere robotics teams of India.</p>
                    </div>
                </a>
                <a href="/projects">
                    <div className="col-span-1 bg-gray-100 rounded-xl p-4 shadow-xl hover:bg-gray-200 transition duration-500 ease-in-out">
                        <Image src={RandD} className="rounded-lg"/>
                        <h1 className="text-xl lg:h-10 py-4 font-semibold">Research and Development</h1>
                        <p className="lg:h-88 xl:h-84 2xl:h-72 lg:pt-9 ">Our research falls in many domains including Artifical Intelligence, Controls and System, Gait Analysis, Human Robot Interaction, Algorithm Development and many more. Spanning all domains, ZINE Robotics has 16+ patents and multiple papers in reputed IEEE Journals. ZINE has also collaborated with several hospitals for research and development.</p>
                    </div>
                </a>
                <Link href="/workshops">
                    <div className="col-span-1 bg-gray-100 rounded-xl p-4 shadow-xl hover:bg-gray-200 transition duration-500 ease-in-out">
                        <Image src={Workshop} className="rounded-lg"/>
                        <h1 className="text-xl lg:h-10 py-4 font-semibold">Workshop</h1>
                        <p className="lg:h-88 xl:h-84 2xl:h-72 lg:pt-9 ">Our team conducts a workshop that guides the incoming freshers into the field of robotics, along with lectures on various other engineering skills such as Android app development, Website Development, Ethical hacking and many basic lectures which are required to enhance your skills in Robotics. Every year our team had successfully delivered the impactful lectures and practicals to more than 300 freshers.</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
// Responsiveness done
export default ZineActivities;