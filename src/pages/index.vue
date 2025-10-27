<template>
	<VContainer>
		<VCard
			elevation="0"
			class="border-thin"
			width="240"
			title="Current user"
			:text="login"
		/>
		<VCard variant="text" class="mt-10" title="Applications" />
		<VSheet class="d-flex ga-4">
			<VCard elevation="0" class="border-thin" width="240" title="Budget">
				<template #actions>
					<VBtn text="Open" :href="budgetUrl" />
				</template>
			</VCard>
		</VSheet>
	</VContainer>
</template>

<script lang="ts" setup>
import { useSubdomainUrl } from "@shared/frontend";

const { login } = useActiveUser();
const budgetUrl = useSubdomainUrl("budget");
</script>
