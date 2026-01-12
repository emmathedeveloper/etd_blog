// place files you want to import through the `$lib` alias in this folder.


export const formatDate = (date: Date) => date.toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour <= 18) return "afternoon";
  return "night";
}

export const getGreeting = () => {
  const timeOfDay = getTimeOfDay();
  if (timeOfDay === "morning") return "Good morning";
  if (timeOfDay === "afternoon") return "Good afternoon";
  return "Good evening";
}

export async function urlToFile(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
}

export async function uploadFile(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const formData = new FormData();
		formData.append('file', input.files[0]);

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
	}