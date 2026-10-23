import SectionPage from "@/components/SectionPage";
import type {Metadata} from "next";
export const metadata:Metadata={title:"Education | Taha Zitane",description:"Systems, network infrastructure and cybersecurity portfolio — education.",alternates:{canonical:"/education/",languages:{en:"/education/",fr:"/fr/education/",ar:"/ar/education/"}}};
export default function Page(){return <SectionPage locale="en" section="education"/>}
