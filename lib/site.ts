export const siteConfig = {
  name: "Hurghada Vacation Homes",
  description:
    "Book vacation homes, apartments, villas, and private transfers in Hurghada with local support from Hurghada Vacation Homes.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hurghadavacationhomes.com",
  locale: "en_US",
  phone: "+201273613935",
  displayPhone: "+20 12 73613935",
  whatsappUrl: "https://wa.me/201273613935",
  address: {
    streetAddress: "El Kawther",
    addressLocality: "Hurghada",
    addressRegion: "Red Sea Governorate",
    addressCountry: "EG",
    label: "Hurghada, El Kawther",
  },
  logo: "/logo-green.png",
  ogImage: "/homepage/heroSection1/HeroImage.png",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
