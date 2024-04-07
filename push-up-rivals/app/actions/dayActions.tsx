"use server";

import prisma from "@/lib/prismaClient";

export const createToday = async (userId: string): Promise<void> => {
	await prisma.day.create({
		data: {
			userId,
		},
	});
};

export const createFromLastDayToToday = async (userId: string) => {
	const days = await prisma.day.findMany({
		where: {
			userId,
		},
		orderBy: { dateTime: "desc" },
	});

	const lastDay = getMidnightDate(days[0].dateTime);
	const today = getMidnightDate(
		new Date(new Date().toLocaleDateString("fr-FR"))
	);

	if (today <= lastDay) {
		return;
	}

	if (today > lastDay) {
		console.log("starting at: ", lastDay);

		while (lastDay < today) {
			lastDay.setDate(lastDay.getDate() + 1);
			await prisma.day.create({
				data: {
					dateTime: lastDay,
					userId,
				},
			});
		}
	}
};

// TODO: Delete
export async function createNdays(userId: string, n: number, today: Date) {
	while (n > 0) {
		today.setDate(today.getDate() - 1);
		await prisma.day.create({
			data: {
				dateTime: today,
				userId: userId,
				pushups: Math.floor(Math.random() * 101),
			},
		});
		n--;
	}
}

function getMidnightDate(date: Date): Date {
	return new Date(date.toLocaleDateString("fr-FR"));
}
