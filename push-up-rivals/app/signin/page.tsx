import CredentialsForm from "@/components/CredentialsForm";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function SignIn() {
	const session = await getServerSession(options);

	if (session) {
		return <div>Already signed in as {session?.user?.email}</div>;
	}

	return (
		<div>
			<h1>Sign In</h1>
			<CredentialsForm />
		</div>
	);
}
