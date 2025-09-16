<template>
	<VContainer>
		<VCard width="240" title="Current user" :text="login" />
		<VCard variant="text" class="mt-10" title="Applications" />
		<VSheet class="d-flex ga-4">
			<VCard width="240" title="Budget">
				<template #actions>
					<VBtn text="Open" href="http://budget.mlc.local:3000" />
				</template>
			</VCard>
		</VSheet>
	</VContainer>
</template>

<script lang="ts" setup>
const { login } = useActiveUser();
</script>
