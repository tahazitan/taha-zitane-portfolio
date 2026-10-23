import SectionPage from "@/components/SectionPage";
import type {Metadata} from "next";
export const metadata:Metadata={title:"Services | Taha Zitane",description:"IT support, VPS administration, infrastructure reviews and network security services.",alternates:{canonical:"/services/",languages:{en:"/services/",fr:"/fr/services/",ar:"/ar/services/"}}};
export default function Page(){return <SectionPage locale="en" section="services"/>}
