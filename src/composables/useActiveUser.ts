export const useActiveUser = () => {
	const config = useRuntimeConfig();

	const { data, status } = useFetch<{ login: string }>(
		`${config.public.apiBase}/api/user`,
		{
			server: false,
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		}
	);

	const login = computed(() => {
		if (["pending", "idle"].includes(status.value)) {
			return "Loading user...";
		}

		if (status.value === "error") {
			return "Error loading user";
		}

		return data.value?.login ?? "No login found";
	});

	return { login };
};
