import SectionPage from "@/components/SectionPage";
import type {Metadata} from "next";
export const metadata:Metadata={title:"Expertise | Taha Zitane",description:"Systems, network infrastructure and cybersecurity portfolio — expertise.",alternates:{canonical:"/expertise/",languages:{en:"/expertise/",fr:"/fr/expertise/",ar:"/ar/expertise/"}}};
export default function Page(){return <SectionPage locale="en" section="expertise"/>}
