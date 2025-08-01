
"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export function ExploreCourses() {

    const router = useRouter();
    return (
        <div>
            <div className="my-4 mx-6 border rounded-lg bg-white">
                <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4">
                    <div className="p-6 flex flex-col gap-3">
                        <h1 className="text-4xl font-semibold">Explora todos los cursos 👋</h1>
                        <p className="text-balance max-w-2xl">
                            Aprende a programar desde cero, sin complicaciones ni requisitos raros. No necesitas experiencia previa ni una supercomputadora.
                            Solo ganas de aprender... y quizá un poco de café ☕.
                        </p>
                        <Button className="w-fit" onClick={() => router.push("/courses")}>
                            Empezar a aprender
                        </Button>
                    </div>
                    <div className="flex items-end">
                        <Image src="/explore.png"  alt="Explora todos los cursos" width={300} height={200}/>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}