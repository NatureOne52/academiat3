import { Chapter, UserProgress } from "@prisma/client";

export type ChaptersListProps = {
    chapters: Chapter[] | null;
    currentChapter: string;
    courseSlug: string;
    userProgress: UserProgress[];
}