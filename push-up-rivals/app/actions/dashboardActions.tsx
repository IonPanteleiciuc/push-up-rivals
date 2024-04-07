"use server";
import prisma from "@/lib/prismaClient";
import { Day } from "@prisma/client";

type AvgPushups = {
	lastNDaysAvg: number;
	evolution: number;
};

function getAvgFromListOfDays(days: Day[]): number {
	const sum = days.reduce((acc, day) => acc + day.pushups, 0);
	return Math.floor((sum / days.length) * 100) / 100;
}

export async function getAvgPushups(
	userId: string,
	numberOfDays: number
): Promise<AvgPushups> {
	const days = await prisma.day.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			dateTime: "desc",
		},
		take: 2 * Number(numberOfDays),
	});

	const lastNDaysAvg = getAvgFromListOfDays(
		days.slice(0, Number(numberOfDays))
	);
	const previousNDaysAvg = getAvgFromListOfDays(
		days.slice(Number(numberOfDays), 2 * Number(numberOfDays))
	);

	const evolution = Math.floor((lastNDaysAvg / previousNDaysAvg - 1) * 100);

	return {
		lastNDaysAvg,
		evolution: evolution ? evolution : 0,
	};
}
