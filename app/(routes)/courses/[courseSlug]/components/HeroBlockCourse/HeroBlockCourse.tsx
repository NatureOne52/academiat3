"use client";
import { useState } from "react";
import { HeroBlockCourseProps } from "./HeroBlockCourse.types";
import { useRouter } from "next/navigation";
import { IconBadge } from "@/components/shared";
import { Calendar, ChartNoAxesColumn, Timer } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

export function HeroBlockCourse(props: HeroBlockCourseProps) {

    const { course, purchaseCourse } = props;
    const { title, id, description, imageUrl, price, updatedAt, slug, level, chapters } = course;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const enrollCourse = async () => {
        setIsLoading(true);
        if (price == "Gratis") {
            try {
                await axios.post(`/api/course/${id}/enroll`)
                toast("Inscripción exitosa 🎉");
                router.push(`/courses/${slug}/${chapters[0].id}`);
            } catch (error) {
                toast("Error al susbribirse 😕")
                console.log(error);
            }finally{

                setIsLoading(true);
            }
        }else{
            try {
                const response = await axios.post(`/api/course/${id}/checkout`);
                window.location.assign(response.data.url) ;
            } catch {
                toast("Error al susbribirse 😕")
            }finally{
                setIsLoading(false);
            }

        }

    }

    const redirectToCourse = () => {
        router.push(`/courses/${slug}/${chapters[0].id}`);
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
                <h2 className="text-3xl font-semibold">{title}</h2>
                <p className="text-balance mt-2">{description}</p>
                <div className="flex flex-col gap-3 mt-5 text-gary-600">
                    <IconBadge icon={Timer} text="7h 40min" />
                    <IconBadge icon={Calendar} text={`Última actualización: ${new Date(updatedAt).toLocaleDateString("es-MX")}`} />
                    <IconBadge icon={ChartNoAxesColumn} text={level || ""} />
                </div>
                <h2 className="text-xl font-semibold my-4"> {formatPrice(price)}</h2>
                {purchaseCourse ? (
                    <Button className="hover:bg-violet-400 text-white font-semibold" disabled={isLoading} onClick={redirectToCourse}>
                        Ver curso
                    </Button>
                ) : (
                    <Button className="hover:bg-violet-400 text-white font-semibold" disabled={isLoading} onClick={enrollCourse}>
                        Inscribirse ahora
                    </Button>
                )}
            </div>
            <Image src={imageUrl || "/default-image-course.webp"} alt={title} width={500} height={400} className="rounded-md" />
        </div>
    )
}

