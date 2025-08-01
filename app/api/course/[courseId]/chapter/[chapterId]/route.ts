import prisma from "@/lib/prisma";// 'prisma' está definido pero no se usa.
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; // 'NextResponse' está definido pero no se usa.

export async function PATCH(
    req: Request,
    {params}: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { userId } = await auth(); // 'userId' se asigna pero no se usa.
        const { courseId, chapterId } = await params; // 'courseId' y 'chapterId' se asignan pero no se usan.
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await prisma.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId,
            },
            data: {
                ...values,
            },
        });
        return NextResponse.json(course);
    } catch (error) {

        console.log("[COURSE_CHAPTER_UPDATE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request, {params}:
    {params: Promise<{courseId:string; chapterId:string}>}
){
    try {
        const {userId} = await auth()
        const {courseId, chapterId} = await params;

        if(!userId) {
            return new NextResponse("Unauthorized", {status:401})
        }

        const chapter = await prisma.chapter.delete({
            where: {
                id: chapterId,
                courseId: courseId,
            }
        })

        return NextResponse.json(chapter)
    } catch (error) {
        console.log("[COURSE_CHAPTER_DELETE]", error);
        return new NextResponse("Internal Server Error", {status:500})
    }
        

}
    


