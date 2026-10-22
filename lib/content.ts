export const business = {
  name: "Attention 2 Detail",
  slogan: "Vehicle valeting & detailing",
  owner: "Mark",
  address: "17 Mardell Way, Overstone, United Kingdom, NN6 0RU",
  phoneDisplay: "07795 215211",
  phoneTel: "+447795215211",
  whatsapp: "https://wa.me/447795215211",
  email: "Mark.attention2detail@gmail.com",
  facebook: "https://www.facebook.com/Mark.Attention2detail",
  facebookReviews: "https://www.facebook.com/Mark.Attention2detail/reviews",
  hours: "9am–5pm, seven days",
  recommendation: "100% recommend",
  reviewCount: 38,
};

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  job: string;
};

export const photos: Record<string, Photo> = {
  van: {
    src: "/photos/van.jpg",
    alt: "Rear of Mark's red Ford van on a tree-lined track, Attention 2 Detail across the back window",
    caption: "Mark’s red Ford van. Vehicle valeting & detailing on the back window.",
    job: "The van",
  },
  discovery: {
    src: "/photos/discovery.jpg",
    alt: "Orange Land Rover Discovery Sport on a block-paved drive, paint wet-looking and finished",
    caption:
      "Discovery Sport, finished. August 2022 on the business photos. No customer name was written on this one.",
    job: "Discovery Sport",
  },
  mercedes: {
    src: "/photos/mercedes.jpg",
    alt: "Black Mercedes saloon with a dealer plate still on the bumper, paint glossy, suds on the tarmac",
    caption:
      "Black Mercedes, dealer plate still on. From the business photos. The closest still to an end-of-lease job.",
    job: "Black Mercedes",
  },
  transporter: {
    src: "/photos/transporter.jpg",
    alt: "Black Volkswagen Transporter on lowered silver wheels, parked on grass under a cedar",
    caption:
      "Black VW Transporter. From the business photos. Not Sam’s Transit Custom — that one isn’t in these stills.",
    job: "VW Transporter",
  },
  x7: {
    src: "/photos/x7.jpg",
    alt: "Dark BMW X7 on a brick driveway beside a house, paint reflecting the sky",
    caption:
      "BMW X7 on a driveway. From the business photos. No job note came with this picture.",
    job: "BMW X7",
  },
  c63: {
    src: "/photos/c63.jpg",
    alt: "Grey Mercedes-AMG C 63 saloon in side profile on a residential road",
    caption:
      "Mercedes-AMG C 63. From the business photos. No job note came with this picture.",
    job: "Mercedes-AMG C 63",
  },
};

export const ticker = [
  "Full valet",
  "Machine polished to remove light scratches and restore the colour",
  "Paintwork prepped",
  "Ceramic Warehouse Graphonix Ultra, 7 year coating",
  "Gtechniq ceramic sealant",
  "Headlights restored",
  "End of lease full valet",
  "Monthly full valets",
];

export type Service = {
  number: string;
  title: string;
  body: string;
  photo: Photo;
  missing: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Full valet",
    body: "His posts just say “fully valeted”. Lately that’s been Dan and Adele’s in Moulton, Ryan and Sammy’s, the Russell family fleet, and Kez’s Mercedes GLC with Adam’s Range Rover Sport. Katie, Hannah and Kian had theirs done the same way.",
    photo: photos.discovery,
    missing:
      "Dan and Adele’s post is a video, and Ryan and Sammy’s album didn’t come down as a still. This Discovery Sport is the closest finished car in the photos I could save.",
  },
  {
    number: "02",
    title: "Machine polish",
    body: "On Sam’s Transit Custom he wrote: machine polished to remove some light scratches and restore the colour, then topped with Gtechniq ceramic sealant. The Audi R8 got the same — fully valeted, machine polished, Gtechniq on top.",
    photo: photos.mercedes,
    missing:
      "No still of Sam’s Transit or the R8. The black Mercedes is the closest paint I have. There isn’t a photo of the machine itself.",
  },
  {
    number: "03",
    title: "Paint prep and ceramic",
    body: "Ben’s Tiguan R Line: fully valeted, machine polished, paintwork prepped and ceramic coated with The Ceramic Warehouse Graphonix Ultra 7 year coating. Linda McQueen had a ceramic on a Honda.",
    photo: photos.x7,
    missing:
      "No photo of Ben’s Tiguan or Linda’s Honda. The BMW X7 is the closest finished paint on the page.",
  },
  {
    number: "04",
    title: "End of lease",
    body: "An end of lease full valet on Serena’s RS5 and Rah’s Ranger and M3, for their monthlys. A 2023 Range Rover P400 HSE, done at the Overstone address, “all ready to be returned to Jaguar Land Rover.”",
    photo: photos.mercedes,
    missing:
      "The Range Rover return is a video. This Mercedes still has the dealer plate on, so it’s the closest still.",
  },
  {
    number: "05",
    title: "Headlights",
    body: "A 2007 Porsche 911 C4S with the rare factory aero kit: fully valeted, and the headlights restored.",
    photo: photos.discovery,
    missing:
      "No photo of that 911. The Discovery’s lamps are the closest shot on this page.",
  },
];

export const jobs: Photo[] = [
  photos.discovery,
  photos.mercedes,
  photos.transporter,
  photos.x7,
  photos.c63,
  photos.van,
];

export type Review = {
  quote: string;
  name: string;
  date: string;
  source: string;
};

export const reviews: Review[] = [
  {
    quote:
      "Mark really takes pride in his work and very reasonably priced too. Excellent job done.",
    name: "Roy Trasler",
    date: "21 August 2026",
    source: "Facebook",
  },
  {
    quote:
      "Mark at Attention to Detail is simply outstanding. His attention to detail and level of service are second to none. I’ve handed over some truly filthy cars and every time they come back looking and smelling brand new. What really impressed me, though, was the little extra touches. On my last visit, my golf trolley had left the boot in a right state. Without being asked, Mark cleaned that too. I was genuinely speechless. You can tell he takes real pride in his work. If you want your car treated with care and brought back to life properly, this is the place to go.",
    name: "Rob Cary",
    date: "23 February 2026",
    source: "Google",
  },
  {
    quote:
      "This geezer is my go-to whenever we're returning a lease car, or if we just want to see a car shine like new once again. The job he's done on my beloved MG this week is seriously top class, and I've fallen in love with it all over again. In addition to being meticulous, he's even a nice guy! Would recommend unreservedly 👍",
    name: "Lol Scott",
    date: "23 February 2026",
    source: "Google",
  },
  {
    quote:
      "Mark has made a brilliant job of ceramic coating to our Honda looks really great.  Really nice guy  to deal with would absolutely recommend going to him.",
    name: "Linda McQueen",
    date: "April 2026",
    source: "Google",
  },
  {
    quote:
      "Mark is always friendly and professional.  My cars look fantastic after he has valeted them  Highly recommended",
    name: "Paul Honeywell",
    date: "19 February 2026",
    source: "Google",
  },
];

export const steps = [
  {
    number: "01",
    title: "Ring him",
    body: "07795 215211. Same number on WhatsApp. Or email Mark.attention2detail@gmail.com.",
  },
  {
    number: "02",
    title: "Say the car and the job",
    body: "Full valet, machine polish, ceramic, headlights, or an end of lease. Postcode helps.",
  },
  {
    number: "03",
    title: "He comes to you",
    body: "Recent runs: Moulton, Overstone, Rushden, Chapel Brampton, Walgrave, Brixworth, Spratton, Kettering, Milton Malsor.",
  },
  {
    number: "04",
    title: "Pin a time",
    body: "The Google listing says 9am to 5pm, seven days. Agree the slot when you book.",
  },
];

export const jobTypes = [
  "Full valet",
  "Machine polish",
  "Paint prep and ceramic coating",
  "End of lease full valet",
  "Headlight restoration",
  "Not sure yet",
];
