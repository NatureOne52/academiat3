import prisma from '@/lib/prisma';
import { subMonths, startOfMonth, format, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale'; // 'es' está definido pero no se usa.

export async function getRevenueByMonth() {
    const now = new Date();

    const months = Array.from({ length: 6 }, (_, i) => subMonths(now, 5 - i));

    const result = await Promise.all( // 'result' se asigna pero no se usa.
        months.map(async (monthDate) => {
            const start = startOfMonth(monthDate);
            const end = endOfMonth(monthDate);

            const purchases = await prisma.purchase.findMany({ // 'purchases' se asigna pero no se usa.
                where: {
                    createdAt: {
                        gte: start,
                        lte: end,
                    },
                },
                include: {
                    course: {
                        select: {
                            price: true,
                        },
                    },
                },
            });
            const totalRevenue = purchases.reduce((sum, purchase) => {
                const priceString = purchase.course.price ?? '';
                const coursePrice = Number.isFinite(parseFloat(priceString))
                    ? parseFloat(priceString)
                    : 0;

                return sum + coursePrice;
            }, 0);
            return {
                month: format(start, 'MMMM', { locale: es }),
                revenue: Number(totalRevenue.toFixed(2)),
            };
        })
    );
    return result;
}