export const normalizeWhatsApp = (whatsapp: string) => {
  let cleanWhatsApp = whatsapp.replace(/[+\s-]/g, "");
  if (!cleanWhatsApp.startsWith("58") && cleanWhatsApp.length > 0) {
    if (cleanWhatsApp.startsWith("0")) {
      cleanWhatsApp = "58" + cleanWhatsApp.substring(1);
    } else {
      cleanWhatsApp = "58" + cleanWhatsApp;
    }
  }
  return cleanWhatsApp;
};

export const normalizeName = (value: string) => value.trim().replace(/\s+/g, " ");
