export const SITE = {
  brand: "G_GLAMS NATURALS",
  tagline: "Skincare that helps your skin look and feel its best.",
  instagram: "https://instagram.com/g_glamsnaturals",
  instagramHandle: "@g_glamsnaturals",
  tiktok: "https://www.tiktok.com/@g_glamsnaturals",
  tiktokHandle: "@g_glamsnaturals",
  // [REPLACE WITH REAL WHATSAPP NUMBER — international format, no +]
  whatsappNumber: "2348082639469",
  whatsappMessage:
    "Hi G_Glams Naturals, I'd like help choosing the right skincare products for my skin.",
  // [INSERT CONTACT EMAIL]
  email: "hello@gglamsnaturals.com",
  // [INSERT CONTACT PHONE]
  phone: "",
};

export const waLink = (msg) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    msg || SITE.whatsappMessage
  )}`;
