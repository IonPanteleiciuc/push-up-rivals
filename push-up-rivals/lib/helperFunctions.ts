import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export function getRedirectionUrlWithCallback(page: string): string {
	return `sign-in?callbackUrl=/${page}`;
}

export function getCallbackUrl(url: string | null): string {
	return url?.includes("callbackUrl") ? url.split("callbackUrl=/")[1] : "/";
}

export async function disallowOnActiveSession(): Promise<void> {
	const session = await getServerSession(options);
	if (session) {
		redirect("/");
	}
}

export async function requireActiveSession(): Promise<Session> {
	const session = await getServerSession(options);
	if (!session) {
		redirect("/sign-in");
	}

	return session;
}
