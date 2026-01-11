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