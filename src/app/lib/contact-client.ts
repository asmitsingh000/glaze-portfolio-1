export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

export async function sendContactMessage(message: ContactMessage): Promise<void> {
  const response = await fetch("https://formsubmit.co/ajax/glaze0999@gmail.com", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: message.name,
      email: message.email,
      message: message.message,
      _subject: `Portfolio contact from ${message.name}`,
      _replyto: message.email,
      _honey: message.website ?? "",
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to send your message right now. Please try again or email me directly.");
  }
}
