import { CertificateProps } from "./Certificate.types";

export function Certificate(props: CertificateProps) {
    const { titleCourse, userName, certRef } = props;

    return (
        <div ref={certRef} className="w-full h-[600px] relative bg-[url('/certificado.jpg')] bg-cover text-[#000]">
            <p className="absolute text-4xl tracking-wide font-semibold  top-[50%] left-1/2 transform -translate-x-1/2">{userName}</p>
            <p className="absolute font-semibold tracking-wide text-3xl top-[73%] left-1/2 transform -translate-x-1/2 ">{titleCourse}</p>
            <p className="absolute text-xs bottom-32 right-38">{new Date().toLocaleDateString()}</p>
        </div>
    )
}