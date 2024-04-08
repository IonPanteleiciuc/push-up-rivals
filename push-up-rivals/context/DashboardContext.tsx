"use client";
import { AvgPushups, SumPushups } from "@/app/actions/types";
import React, { createContext } from "react";

// Type for the context data
interface DashboardDataContextValue {
	fetchData: (userId: string, numberOfdays: number) => void;
	totalPushups: SumPushups;
	avgPushups: AvgPushups;
	todaysPushups: number;
	options: string[];
	optionsNumbered: number[];
	selectedIndex: number;
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Creating the context with an undefined default value, this will be set in the provider
const DashboardContext = createContext<DashboardDataContextValue | undefined>(
	undefined
);

export default DashboardContext;
