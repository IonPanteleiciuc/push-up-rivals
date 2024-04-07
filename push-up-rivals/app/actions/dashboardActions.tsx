"use server";
import prisma from "@/lib/prismaClient";
import { Day } from "@prisma/client";
import { AvgPushups, SumPushups } from "./types";

function getAvgFromListOfDays(days: Day[]): number {
	const sum = days.reduce((acc, day) => acc + day.pushups, 0);
	return Math.floor((sum / days.length) * 100) / 100;
}

function getSumFromListOfDays(days: Day[]): number {
	return days.reduce((acc, day) => acc + day.pushups, 0);
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

export async function getTotalPushups(
	userId: string,
	numberOfDays: number
): Promise<SumPushups> {
	const aggregation = await prisma.day.aggregate({
		_sum: {
			pushups: true,
		},
		where: {
			userId: userId,
		},
	});

	const totalPushups = aggregation._sum.pushups
		? aggregation._sum.pushups
		: 0;

	const days = await prisma.day.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			dateTime: "desc",
		},
		take: numberOfDays,
	});

	const evolution = getSumFromListOfDays(days);

	return { totalPushups, evolution };
}

export async function getTodaysPushups(userId: string): Promise<number> {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const day = await prisma.day.findFirst({
		where: {
			userId: userId,
			dateTime: {
				gte: today,
			},
		},
	});

	return day ? day.pushups : 0;
}
