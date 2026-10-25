import type {ReactNode} from "react";

/** Content must be visible on first paint, before hydration, intersection events
 * and reduced-motion checks. The global MotionSystem adds gentle decorative
 * entrance animation without ever hiding cards or their interactive controls.
 */
export default function Reveal({children,className=""}:{children:ReactNode;className?:string;delay?:number}){
 return <div className={className}>{children}</div>;
}
