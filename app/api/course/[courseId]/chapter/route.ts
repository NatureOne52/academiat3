import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: {params: Promise<{ courseId: string }>}) {
    try {
    const { userId } = await auth();
    const { courseId } = await params;

    const { title } = await req.json(); // 'title' is assigned a value but never used.

    if(!userId) {
        return new NextResponse("Unauthorized", {status: 401});
    }

    const course = await prisma.course.findUnique({
        where: {
            id: courseId,
            userId: userId
        }
    });

    if(!course) {
        return new NextResponse("Course not found", {status: 404});
    }
    const chapterCount = await prisma.chapter.count({
        where: {
            courseId: course.id
        }
    })
    const chapter = await prisma.chapter.create({
        data: {
            title,
            courseId: course.id,
            position: chapterCount + 1, // Increment the order based on existing chapters
        }
    })
    return NextResponse.json(chapter);
    } catch (error) {
        console.log("[COURSE_CHAPTER]", error);
        return new NextResponse("Internal Server Error", {status: 500});
        // 'error' is defined but never used.
    }
}