import { requireActiveSession } from "@/lib/helperFunctions";
import { Session } from "next-auth";

export default async function Home() {
	const session: Session = await requireActiveSession();

	return <div>Connected user: {session.user?.email}</div>;
}
