export const useToast = (): {
	toastVisible: Ref<boolean>;
	toastMessage: Ref<string>;
	showToast: (text: string) => void;
} => {
	const toastVisible = useState<boolean>("toastVisible", () => false);
	const toastMessage = useState<string>("toastMessage", () => "");

	const showToast = (text: string) => {
		toastMessage.value = text;
		toastVisible.value = true;
	};

	return { toastVisible, toastMessage, showToast };
};
