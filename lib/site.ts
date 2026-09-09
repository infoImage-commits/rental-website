export const siteConfig = {
  name: "Hurghada Vacation Homes",
  description:
    "Discover and book verified vacation homes, holiday apartments, beach chalets, studios, and private airport transfers in Hurghada with local host support.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hurghadavacationhomes.com",
  locale: "en_US",
  phone: "+201273613935",
  displayPhone: "+20 12 73613935",
  email: "info@hurghadavacationhomes.com",
  whatsappUrl: "https://wa.me/201273613935",
  address: {
    streetAddress: "El Kawther",
    addressLocality: "Hurghada",
    addressRegion: "Red Sea Governorate",
    addressCountry: "EG",
    label: "Hurghada, El Kawther",
  },
  logo: "/logo-green.png",
  ogImage: "/logo-green.png",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
