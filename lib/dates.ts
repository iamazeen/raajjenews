const DHIVEHI_WEEKDAYS = ["އާދިއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"];
const DHIVEHI_MONTHS = [
  "ޖެނުއަރީ",
  "ފެބްރުއަރީ",
  "މާރިޗު",
  "އޭޕްރީލް",
  "މޭ",
  "ޖޫން",
  "ޖުލައި",
  "އޯގަސްޓް",
  "ސެޕްޓެމްބަރ",
  "އޮކްޓޯބަރ",
  "ނޮވެމްބަރ",
  "ޑިސެމްބަރ"
];

export function formatSiteDate(value: string | Date, language: "dv" | "en", includeTime = false) {
  const date = value instanceof Date ? value : new Date(value);

  if (language === "dv") {
    const weekday = DHIVEHI_WEEKDAYS[date.getDay()];
    const day = String(date.getDate());
    const month = DHIVEHI_MONTHS[date.getMonth()];
    const year = String(date.getFullYear());

    if (!includeTime) {
      return `${weekday}، ${day} ${month} ${year}`;
    }

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${weekday}، ${day} ${month} ${year}، ${hours}:${minutes}`;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {})
  }).format(date);
}
