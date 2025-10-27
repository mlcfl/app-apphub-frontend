import { useQuery } from "@tanstack/vue-query";

export const useActiveUserQuery = () => {
	const config = useRuntimeConfig();

	return useQuery<{ login: string }>({
		queryKey: ["user/active"],
		queryFn: () =>
			$fetch(`${config.public.apiBase}/api/user`, {
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			}),
	});
};
