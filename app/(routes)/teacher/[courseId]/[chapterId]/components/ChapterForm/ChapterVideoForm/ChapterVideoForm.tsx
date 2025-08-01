"use client"

import { Pencil, Video } from "lucide-react";
import { TitleBlock } from "../../../../components";
import { ChapterVideoFormProps } from "./ChapterVideoForm.types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";


export function ChapterVideoForm(props: ChapterVideoFormProps){

    const {chapterId,courseId, videoUrl} = props
    const [onEditVideo, seetOnEditVideo] = useState(false)
    const router = useRouter()
    const onSubmit = async (url:string) => {

        try {
            
            await axios.patch(`/api/course/${courseId}/chapter/${chapterId}`,{
                videoUrl: url
            });

            toast("Video actualizado 👍")
            router.refresh();
        } catch {
            toast.error("Algo salió mal 😕")
        }
    };
 
    return(
        <div className="mt-6 p-6 bg-white rounded-md"> 
            <TitleBlock title="Añade o modifica el video" icon={Video}/>

            {videoUrl ? (
                <video src={videoUrl} controls className="rounded-md"/>
            ):(
                <p>No hay video</p>
            )}

            <div className="mt-4 p-2 rounded-md border">
                <Button variant="secondary" onClick={() =>seetOnEditVideo(true)}>
                    {onEditVideo ? "Arastra o selecciona el video" : "Editar video"}
                    <Pencil className="m-4 h-4"/>    
                </Button>
                 {onEditVideo && (
                    <UploadButton
                    className="w-full bg-slate-200 rounded-md p-2 mt-2"
                    endpoint="chapterVideo"
                    onClientUploadComplete={(url) => {
                        console.log(url)

                        if(url){
                            onSubmit(url[0].serverData.url)
                        }
                    }}
                    />
                 )}              

            </div>
        </div>
    )
}