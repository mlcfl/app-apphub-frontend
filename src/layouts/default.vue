<template>
	<VLayout>
		<VAppBar>
			<VAppBarTitle>Application Hub</VAppBarTitle>
			<template #append>
				<VBtn variant="outlined" class="mr-5" :loading="loading" @click="logout"
					>Logout</VBtn
				>
			</template>
		</VAppBar>
		<VMain>
			<slot />
		</VMain>
		<VSnackbar
			v-model="toastVisible"
			timeout="4000"
			color="error"
			location="bottom right"
		>
			{{ toastMessage }}
		</VSnackbar>
	</VLayout>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const loading = ref(false);
const { toastVisible, toastMessage, showToast } = useToast();

// Redirect url
const url = useRequestURL();
const authUrl = computed(() => {
	const { protocol, host } = url;
	const domain = host.split(".").slice(-2).join(".");

	return `${protocol}//auth.${domain}`;
});

// Handle logout
const logout = async () => {
	loading.value = true;

	try {
		const { apiBase } = config.public;
		await $fetch(`${apiBase}/api/signout`, {
			method: "POST",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		});

		await navigateTo(authUrl.value, { external: true });
	} catch (e) {
		console.error(e);
		showToast(e instanceof Error ? e.toString() : String(e));
	}

	loading.value = false;
};
</script>
