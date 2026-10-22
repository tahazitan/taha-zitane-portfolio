import Home from "@/components/Home";
import type {Metadata} from "next";
export const metadata:Metadata={
 title:{absolute:"Taha Zitane | Systems, Networks & IT Infrastructure"},
 description:"Professional IT portfolio of Taha Zitane in Morocco: systems and network administration, infrastructure projects, security architecture, Windows Server, remote IT support and interactive 3D network designs.",
 alternates:{canonical:"/",languages:{en:"/",fr:"/fr/",ar:"/ar/"}}
};
export default function Page(){return <Home locale="en"/>;}
