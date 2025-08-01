"use client";
import { FileImage, Pencil } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import { CourseImageProps } from "./CourseImage.types";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import axios from "axios";

export function CourseImage(props: CourseImageProps) {

    const { idCourse, imageCourse } = props;
    const [isEditing, setIsEditing] = useState(false);
const [image, setImage] = useState(imageCourse);

const onChangeImage= async (imageUrl: string) => {
    console.log(imageUrl);

    try {
        axios.patch(`/api/course/${idCourse}`, {
            imageUrl: imageUrl,
        });
        toast("Imagen actualizada correctamente 🎉");
    } catch  {
        toast.error("Algo salió mal al actualizar la imagen 😕");
    }
};
    return (
        <div className="p-4 rounded-lg bg-white h-fit">
            <TitleBlock title="Imagen del curso" icon={FileImage}/>

            {isEditing ? (
                <div className="bg-slate-300 p-4 mt-2 rounded-lg">
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        onChangeImage(res[0]?.ufsUrl);
                        setImage(res[0]?.ufsUrl)
                        setIsEditing(false);
                    }}
                    onUploadError={() => {
                        toast.error("Error uploading image." );
                    }}
                />
                </div>
            ):(
            <Image src={image || "/default-image-course.webp"} alt="Curso"
            className="w-full h-full rounded-md"
            width={250}
            height={100}/>
            
            )}
            <Button className="w-full mt-4" variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} >
                <Pencil className="w-4 h-4" />
                Editar imagen
            </Button>

        </div>
    );
}