import {sectionMetadata} from "@/data/sectionSeo";
import SectionPage from "@/components/SectionPage";
import type {Metadata} from "next";
export const metadata:Metadata=sectionMetadata("en","expertise");
export default function Page(){return <SectionPage locale="en" section="expertise"/>}
