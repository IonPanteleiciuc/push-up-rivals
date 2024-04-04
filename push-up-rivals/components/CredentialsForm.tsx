"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function CredentialsForm(): JSX.Element {
	const router = useRouter();

	function getCallbackUrl(url: string | null): string {
		return url?.includes("callbackUrl")
			? url.split("callbackUrl=/")[1]
			: "/";
	}

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const email = event.target.email.value;
		const password = event.target.password.value;

		const response = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (!response) {
			return;
		}

		if (response.status === 401) {
			console.log("Handle error !");
			return;
		}

		const callbackUrl = getCallbackUrl(response.url);
		router.push(callbackUrl);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="email" id="email" name="email" placeholder="email" />
			<input
				type="password"
				id="password"
				name="password"
				placeholder="password"
			/>
			<button type="submit">Sign In</button>
		</form>
	);
}
