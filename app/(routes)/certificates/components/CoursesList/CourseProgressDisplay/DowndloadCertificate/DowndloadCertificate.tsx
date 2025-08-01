
"use client"
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Download } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas-pro";
import { DowndloadCertificateProps } from "./DowndloadCertificate.types";
import { Certificate } from "./Certificate";

export function DowndloadCertificate(props: DowndloadCertificateProps) {

    const { titleCourse, userName } = props;

    const certRef = useRef<HTMLDivElement>(null);
    const handleDowndload= async () =>{
        if(!certRef.current) return;
        const canvas  = await html2canvas(certRef.current, {
            scale:1,
        })
        const link =  document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `certificado-${titleCourse}.png`;
        link.click();

    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                
            <Button variant="outline">
                Descargar certificado
                <Download className="w-4 h-4 ml-2"/>
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full !max-w-[900px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Descarga tu certificado</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                       <Certificate titleCourse={titleCourse} userName={userName} certRef={certRef} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDowndload}>Descargar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}