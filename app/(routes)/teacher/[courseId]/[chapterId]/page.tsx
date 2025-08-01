import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ChapterForm } from "./components";


export default async function ChapterPage({
    params,
}: {
    params: Promise<{ courseId: string, chapterId: string }>
}) {

    const { courseId, chapterId } = await params;

    const { userId } = await auth();

    if (!userId) {
        return <p>No tienes permisos para ver este capítulo.</p>;
    }

    const chapter = await prisma.chapter.findUnique({
        where: {
            id: chapterId,
            courseId: courseId,
        },
    });

    if (!chapter) {
        return <p>Este capítulo no existe</p>;
    }

    return (
        <div className="m-6"> 
            <ChapterForm chapter={chapter} courseId={courseId}/>
        </div>
    )
}