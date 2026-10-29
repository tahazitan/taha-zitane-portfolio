import Home from "@/components/Home";
import type {Metadata} from "next";
export const metadata:Metadata={
 title:{absolute:"Taha Zitane | Remote IT Support & Systems Infrastructure"},
 description:"International remote IT Support and Systems Infrastructure portfolio of Taha Zitane, with practical professional experience, Windows Server, Active Directory, network operations and documented labs.",
 alternates:{canonical:"/",languages:{en:"/",fr:"/fr/",ar:"/ar/"}}
};
export default function Page(){return <Home locale="en"/>;}
