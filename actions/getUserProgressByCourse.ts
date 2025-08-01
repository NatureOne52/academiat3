import prisma from "@/lib/prisma";

export const getUserProgressByCourse = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });

    if (!purchase) {
      return 0;
    }

    const totalChapters = await prisma.chapter.count({
      where: {
        courseId: courseId,
      },
    });

    if(!totalChapters) return 0;

    const completedChapters = await prisma.userProgress.count({
      where: {
        userId: userId,
        isCompleted: true,
        chapter:{
            courseId: courseId,
        }
      },
    });

    const progressPrecentage = (completedChapters / totalChapters) * 100;
    return progressPrecentage;
  } catch (error) {
    console.log("[GET_USER_PROGRESS_BY_COURSE]", error);
    return 0;
  }
};
