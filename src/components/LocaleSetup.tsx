"use client";
import {useEffect} from "react";
import {Locale} from "@/data/content";
export default function LocaleSetup({locale}:{locale:Locale}){
 useEffect(()=>{document.documentElement.lang=locale;document.documentElement.dir=locale==="ar"?"rtl":"ltr";},[locale]);
 return null;
}
