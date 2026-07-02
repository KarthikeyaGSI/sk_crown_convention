export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  content: string;
  date: string;
}

export const featuredReview: Review = {
  id: "featured-1",
  author: "Aravind Reddy",
  role: "Groom's Father",
  rating: 5,
  content: "SK Crown Convention exceeded all our expectations for my son's wedding. The grandeur of the stage, the hospitality of the catering team, and the absolute beauty of the decor left our guests in awe. It is hands down the most luxurious and well-managed venue in Warangal.",
  date: "2 weeks ago",
};

export const reviewsList: Review[] = [
  {
    id: "review-1",
    author: "Pranitha Sharma",
    role: "Bride",
    rating: 5,
    content: "The decor was magical and matched exactly what I had envisioned. The support staff took care of every detail, making it a stress-free experience for us.",
    date: "1 month ago",
  },
  {
    id: "review-2",
    author: "Siddharth Rao",
    role: "Event Organizer",
    rating: 5,
    content: "From an operations perspective, SK Crown is a dream. The air conditioning is robust, parking is massive, and the 24/7 staff support is extremely helpful.",
    date: "3 weeks ago",
  },
  {
    id: "review-3",
    author: "Meera Deshmukh",
    role: "Corporate Event Host",
    rating: 5,
    content: "We hosted our corporate annual gala here. High-class audio-visual setup, elegant dining arrangements, and very professional team.",
    date: "2 months ago",
  },
];
