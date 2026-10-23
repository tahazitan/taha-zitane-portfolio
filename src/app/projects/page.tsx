import SectionPage from "@/components/SectionPage";
import type {Metadata} from "next";
export const metadata:Metadata={title:"Projects | Taha Zitane",description:"Systems, network infrastructure and cybersecurity portfolio — projects.",alternates:{canonical:"/projects/",languages:{en:"/projects/",fr:"/fr/projects/",ar:"/ar/projects/"}}};
export default function Page(){return <SectionPage locale="en" section="projects"/>}
