import SectionPage from "@/components/SectionPage";
import type {Metadata} from "next";
export const metadata:Metadata={title:"Contact | Taha Zitane",description:"Systems, network infrastructure and cybersecurity portfolio — contact.",alternates:{canonical:"/contact/",languages:{en:"/contact/",fr:"/fr/contact/",ar:"/ar/contact/"}}};
export default function Page(){return <SectionPage locale="en" section="contact"/>}
