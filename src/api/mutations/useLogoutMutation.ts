import { useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import { useSubdomainUrl } from "@shared/frontend";

export const useLogoutMutation = (
	options?: Omit<UseMutationOptions<void, Error, void>, "mutationFn">
) => {
	const authUrl = useSubdomainUrl("auth");

	return useMutation({
		...options,
		mutationFn() {
			return $fetch(`${authUrl.value}/api/signout`, {
				method: "DELETE",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			});
		},
		onSuccess: async () => {
			await navigateTo(authUrl.value, { external: true });
		},
	});
};
