"use client";
import {
	getAvgPushups,
	getTodaysPushups,
	getTotalPushups,
} from "@/app/actions/dashboardActions";
import { AvgPushups, SumPushups } from "@/app/actions/types";
import React, { createContext, useContext, ReactNode, useState } from "react";

// Type for the context data
interface DashboardDataContextValue {
	fetchData: (userId: string, numberOfdays: number) => void;
	totalPushups: SumPushups;
	avgPushups: AvgPushups;
	todaysPushups: number;
}

// Creating the context with an undefined default value, this will be set in the provider
const DashboardDataContext = createContext<
	DashboardDataContextValue | undefined
>(undefined);

// Custom hook to use the dashboard data context
export function useDashboardData() {
	const context = useContext(DashboardDataContext);

	if (context === undefined) {
		throw new Error(
			"useDashboardData must be used within a DashboardDataProvider"
		);
	}
	return context;
}

// DashboardDataProvider component
export default function DashboardDataProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [totalPushups, setTotalPushups] = useState<SumPushups>({
		totalPushups: 0,
		evolution: 0,
	});
	const [avgPushups, setAvgPushups] = useState<AvgPushups>({
		lastNDaysAvg: 0,
		evolution: 0,
	});
	const [todaysPushups, setTodaysPushups] = useState<number>(0);

	async function fetchData(userId: string, numberOfdays: number) {
		const total = await getTotalPushups(userId, numberOfdays);
		const avg = await getAvgPushups(userId, numberOfdays);
		const today = await getTodaysPushups(userId);

		setTotalPushups(total);
		setAvgPushups(avg);
		setTodaysPushups(today);
	}

	return (
		<DashboardDataContext.Provider
			value={{ fetchData, totalPushups, avgPushups, todaysPushups }}
		>
			{children}
		</DashboardDataContext.Provider>
	);
}
