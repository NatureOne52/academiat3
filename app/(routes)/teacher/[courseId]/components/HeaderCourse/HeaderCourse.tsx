"use client";

import { useRouter } from "next/navigation";
import { HeaderCourseProps } from "./HeaderCourse.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoveLeft, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export function HeaderCourse(props: HeaderCourseProps) {
    const { idCourse, isPublished } = props;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onPublished = async (state:boolean) => {
        setIsLoading(true);
        try {
            axios.patch(`/api/course/${idCourse}`,{
                isPublished:state
            })
            toast(state ? "Curso publicado 🚀" : "Curso oculto 👀");
            router.refresh();
        } catch   {
            toast("Algo salió mal 😕");
            
        }
        setIsLoading(false);
    };

    const removeCourse = async () => {
        axios.delete(`/api/course/${idCourse}`)
        toast("Curso eliminado correctamente🎉");

        router.push('/teacher');
    }
    return (
        <div >
            <div className="mb-4">
                <div className="flex -flex-col md:flex-row items-center justify-between">
                    <Button onClick={() => router.push('/teacher')}>
                        <MoveLeft/>
                        Volver a todos los cursos 
                    </Button>
                    <div className="gap-2 flex items-center">
                        {isPublished ? (
                            <Button variant="outline" onClick={() => onPublished(false)}>
                                Despublicar

                                <EyeOff/>

                            </Button>
                        ):(
                            <Button disabled={isLoading} onClick={() => onPublished(true)} >
                                Publicar
                                <Eye/>
                            </Button>
                        )}
                        <Button variant="destructive" onClick={removeCourse}>
                            <Trash/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}