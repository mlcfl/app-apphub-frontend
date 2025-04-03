<template>
	<div class="text-center">
		<div class="text-h5">Welcome to the "AppHub" page</div>
		<div
			v-if="['pending', 'idle'].includes(status)"
			class="mt-2 text-body-2 text-info"
		>
			Loading user...
		</div>
		<div v-if="status === 'success'" class="mt-2 text-body-2 text-success">
			Current user is: {{ JSON.stringify(user) }}
		</div>
		<div v-if="status === 'error'" class="mt-2 text-body-2 text-error">
			Loading user error: {{ userError }}
		</div>
		<div class="d-flex justify-center ga-2">
			<VBtn
				variant="outlined"
				class="mt-4"
				:loading="loading"
				@click="checkCookie"
				>Check cookie</VBtn
			>
			<VBtn
				variant="outlined"
				class="mt-4"
				:loading="loading"
				@click="refreshToken"
				>Refresh token</VBtn
			>
			<VBtn variant="outlined" class="mt-4" :loading="loading" @click="logout"
				>Logout</VBtn
			>
		</div>
		<div v-if="error" class="mt-2 text-body-2 text-error">{{ error }}</div>
		<div v-if="result" class="mt-2 text-body-2 text-info">{{ result }}</div>
	</div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const loading = ref(false);
const error = ref("");
const result = ref("");

const {
	data: user,
	status,
	error: userError,
} = useFetch(`${config.public.apiBase}/api/user`, {
	server: false,
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
});

const checkCookie = async () => {
	error.value = "";
	result.value = "";
	loading.value = true;

	try {
		console.log("Cookies", document.cookie);

		const { apiBase } = config.public;
		const response = await $fetch(`${apiBase}/api/check-cookie`);

		console.log("response", response);
		result.value = String(response);
	} catch (e) {
		console.error(e);
		error.value = e instanceof Error ? e.toString() : String(e);
	}

	loading.value = false;
};

const url = useRequestURL();
const authUrl = computed(() => {
	const { protocol, host } = url;
	const domain = host.split(".").slice(-2).join(".");

	return `${protocol}//auth.${domain}`;
});

const refreshToken = async () => {
	error.value = "";
	result.value = "";
	loading.value = true;

	try {
		const { apiBase } = config.public;
		const response = await $fetch(`${apiBase}/api/refresh-token`, {
			method: "POST",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		});

		console.log("response", response);
		result.value = String(response);
	} catch (e) {
		console.error(e);
		error.value = e instanceof Error ? e.toString() : String(e);
	}

	loading.value = false;
};

const logout = async () => {
	error.value = "";
	result.value = "";
	loading.value = true;

	try {
		const { apiBase } = config.public;
		const response = await $fetch(`${apiBase}/api/signout`, {
			method: "POST",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		});

		console.log("response", response);
		result.value = String(response);

		await navigateTo(authUrl.value, { external: true });
	} catch (e) {
		console.error(e);
		error.value = e instanceof Error ? e.toString() : String(e);
	}

	loading.value = false;
};
</script>
