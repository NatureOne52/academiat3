import { getPurchasedCourses } from "@/actions/getPurchasedCourses";
import { ListCourses } from "@/components/shared";

export default async function MyCoursesPage() { 
    const courses = await getPurchasedCourses();
    return (
        <div>
           <ListCourses title="Mis Cursos" courses={courses} />
        </div>
    )
}