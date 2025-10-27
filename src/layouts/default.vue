<template>
	<VLayout>
		<VAppBar elevation="0" class="border-b-thin">
			<VAppBarTitle>AppHub</VAppBarTitle>
			<template #append>
				<VBtn
					variant="outlined"
					class="mr-5"
					:loading="isLogoutPending"
					@click="logout"
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
import { useLogoutMutation } from "~/api";

useHead({ title: "MLC | AppHub" });

const { toastVisible, toastMessage, showToast } = useToast();

// Handle logout
const { mutate: logout, isPending: isLogoutPending } = useLogoutMutation({
	onError(e: Error) {
		console.error(e);
		showToast(e instanceof Error ? e.toString() : String(e));
	},
});
</script>
