import { Lock } from "lucide-react";
import { InfoCourseProps } from "./InfoCourse.types";
import { VideoCourse } from "./VideoCourse";
import { ProgressCourse } from "./ProgressCourse";

export function InfoCourse(props: InfoCourseProps) {
    const { infoCourse, chapterCourseId, userProgress, purchaseCourse , videoUrl} = props;

    const {title, description, category} = infoCourse;


    return (
        <div className="w-full relative">
            {!purchaseCourse && (
                <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md gap-y-2 h-full z-30 rounded-md text-secondary">
                    <Lock className="w-8 h-8" />
                    <p className="text-sm">
                        Capítulo bloqueado. Paga el curso para desbloquearlo.
                    </p>
                </div>
            )}
            {videoUrl && (
                <VideoCourse videoUrl={videoUrl} />
            )}
            <ProgressCourse
            userProgress={userProgress}
            chapterCourseId={chapterCourseId}
            infoCourse={infoCourse}
            />

            <div className="mt-4 bg-white rounded-md m-6 p-6 shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
                <div className="w-fit mb-4 px-2 py-1 bg-violet-400 text-white rounded-full text-xs shadow-md">
                    {category}
                </div>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>
    )
}