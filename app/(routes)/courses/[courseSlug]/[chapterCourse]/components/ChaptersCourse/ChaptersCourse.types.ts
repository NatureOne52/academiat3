import { Chapter, UserProgress } from "@prisma/client";

export type ChaptersCourseProps = {
    chapters: Chapter[] | null;
    chapterCourse: string;
    courseSlug: string;
    userProgress: UserProgress[];
}