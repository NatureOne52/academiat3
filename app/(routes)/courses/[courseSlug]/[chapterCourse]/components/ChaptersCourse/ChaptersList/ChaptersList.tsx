import { Eye, Lock } from "lucide-react";
import { ChaptersListProps } from "./ChapterList.types";
import Link from "next/link";

export function ChaptersList(props: ChaptersListProps) {
  const { chapters, currentChapter, courseSlug, userProgress } = props;

  if (!chapters) {
    return null;
  }

  return (
    <div className="grid gap-4">
  {chapters.map((chapter) => {
    const isCurrent = chapter.id === currentChapter;
    const isCompleted = userProgress?.some(
        (progress) => progress.chapterId === chapter.id && progress.isCompleted
    )

    return (
      <Link
        href={`/courses/${courseSlug}/${chapter.id}`}
        key={chapter.id}
        className={`flex items-center justify-between border-gray-200 rounded-md transition-all duration-300 
          ${isCurrent ? "bg-violet-400" : "hover:bg-violet-200 hover:shadow-lg"}`}
      >
        <div className="flex items-center gap-2 border shadow-md w-full justify-between rounded-md p-2">
          <span>{chapter.title}</span>
          {isCompleted ? (
              <Eye className="h-4 w-4 shrink-0" />
            ) : (
              <Lock className="h-4 w-4 shrink-0" />
            )}
        </div>
      </Link>
    );
  })}
</div>

  );
}
                                      