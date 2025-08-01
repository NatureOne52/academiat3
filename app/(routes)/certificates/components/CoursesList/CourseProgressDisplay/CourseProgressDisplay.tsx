import { Progress } from "@/components/ui/progress";
import { CourseProgressDisplayProps } from "./CourseProgressDisplay.types";
import { DowndloadCertificate } from "./DowndloadCertificate";

export function CourseProgressDisplay(props: CourseProgressDisplayProps) {
    const { progress, titleCourse, userName } = props;

    const showProgress = progress == 100;
    return showProgress ? (
        <DowndloadCertificate
            titleCourse={titleCourse}
            userName={userName}
        />
    ):(
        <>
            <Progress value={progress}  className="[&>*]:bg-violet-300"/> 
            <p className="text-xs">{progress} % Completado</p>
        </>
    );
    
}