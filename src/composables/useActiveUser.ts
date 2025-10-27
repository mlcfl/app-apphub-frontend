import { useActiveUserQuery } from "~/api";

export const useActiveUser = () => {
	const { data, isPending, isError } = useActiveUserQuery();

	const login = computed(() => {
		if (isPending.value) {
			return "Loading user...";
		}

		if (isError.value) {
			return "Error loading user";
		}

		return data.value?.login ?? "No login found";
	});

	return { login };
};
