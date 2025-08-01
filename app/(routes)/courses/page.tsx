import { getHomeCourses } from "@/actions/getHomeCourses";
import { ListCourses } from "@/components/shared";

export default  async function CoursePage() {

    const listCourses = await getHomeCourses();
    return (
        <div>
            <ListCourses title="Todos los cursos" courses={listCourses} />
        </div>
    )
}