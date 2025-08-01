import { getHomeCourses } from "@/actions/getHomeCourses";
import { ExploreCourses } from "./components";
import { ListCourses } from "@/components/shared";

export default async function Home() {

  const listCourses = await getHomeCourses();
  return (

    <div>
      <ExploreCourses/>
      <ListCourses title="Top cursos" courses={listCourses} />
    </div>
  );
}