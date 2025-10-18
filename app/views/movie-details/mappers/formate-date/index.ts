export function formatDate(date: string) {
	const newDate = new Date(date);

	newDate.setDate(newDate.getDate() + 1);

	const formattedDate = new Intl.DateTimeFormat("pt-BR", {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(newDate);

	return formattedDate;
}