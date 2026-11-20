import { Question } from "@/types/review_qa";

/**
 * NEW Review form questions (5 steps - steps 2, 3, 4 consolidated)
 * Step 1: University and Role
 * Step 2: Overall Ratings, Written Experience, Topics (consolidated)
 * Step 3: Category Ratings
 * Step 4: Reviewer Context (optional)
 */
export const reviewQuestions: Question[] = [
  // ====== STEP 1: University and Role ======
  {
    id: "college_slug",
    category: "Step 1",
    type: "school-select",
    question: "Which university are you reviewing?",
    required: true,
  },
  {
    id: "relationship_to_university",
    category: "Step 1",
    type: "select",
    question: "What is your relationship to this university?",
    options: [
      "Current student",
      "Former student / Alumni",
      "Faculty",
      "Staff",
      "Other",
    ],
    required: true,
  },
  {
    id: "attendance_years",
    category: "Step 1",
    type: "date-range",
    question: "What years did you attend or work at this university?",
    required: true,
  },

  // ====== STEP 2: Overall Rating, Experience, Topics (Consolidated) ======
  {
    id: "accessibility_rating",
    category: "Step 2",
    type: "star-rating",
    question:
      "How would you rate the overall accessibility of this university?",
    required: true,
  },
  {
    id: "safety_rating",
    category: "Step 2",
    type: "star-rating",
    question: "How safe do you feel on this campus?",
    required: true,
  },
  {
    id: "inclusivity_rating",
    category: "Step 2",
    type: "star-rating",
    question: "How inclusive do you feel this university is?",
    required: true,
  },

  {
    id: "experience_text",
    category: "Step 2",
    type: "text",
    question:
      "What would you want another student to know about your experience at this university?",
    subtext:
      "Consider mentioning what worked well, what barriers you encountered, and what you wish had been different.",
    multiline: true,
    placeholder: "Share your experience here...",
    required: true,
  },

  {
    id: "topics",
    category: "Step 2",
    type: "multi-select",
    question: "What does your review discuss?",
    subtext: "Select all topics that apply to your review",
    options: [
      "Disability services",
      "Physical accessibility",
      "Housing",
      "Transportation",
      "LGBTQ+ inclusion",
      "Safety",
      "Academic accommodations",
      "Campus culture",
    ],
    required: true,
  },

  // ====== STEP 3: Category Ratings ======
  {
    id: "disability_services_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Disability Services",
    subtext:
      "Support and accommodations provided for students with disabilities",
  },
  {
    id: "academic_accomodations_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Academic Accommodations",
    subtext: "Accommodations for class attendance, testing, and coursework",
  },
  {
    id: "physical_accessibility_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Physical Accessibility",
    subtext: "Accessible buildings, ramps, elevators, and campus layout",
  },
  {
    id: "accessible_housing_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Accessible Housing",
    subtext: "Housing options for students with accessibility needs",
  },
  {
    id: "transportation_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Transportation",
    subtext: "Campus shuttle, parking, or public transit accessibility",
  },
  {
    id: "digital_accessibility_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Digital Accessibility",
    subtext:
      "Accessibility of websites, learning platforms, and course materials",
  },
  {
    id: "lgbtq_inclusion_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "LGBTQ+ Inclusion",
    subtext: "Support and inclusivity for LGBTQ+ students",
  },
  {
    id: "racial_cultural_inclusion_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Racial and Cultural Inclusion",
    subtext: "Inclusivity for students of color and from different cultures",
  },
  {
    id: "religious_tolerance_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Religious Tolerance",
    subtext: "Support for students of different faith backgrounds",
  },
  {
    id: "campus_diversity_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Campus Diversity",
    subtext: "Overall diversity of student body and campus community",
  },
  {
    id: "peer_support_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Peer Support",
    subtext: "Support from other students and community on campus",
  },
  {
    id: "liberal_climate_rating",
    category: "Step 3",
    type: "star-rating-optional",
    question: "Liberal Climate",
    subtext: "Openness to diverse perspectives and free expression",
  },

  // ====== STEP 4: Reviewer Context (All Optional) ======
  {
    id: "age_category",
    category: "Step 4",
    type: "select",
    question: "Age (optional)",
    subtext:
      "This information is optional and will appear publicly with your review if shared",
    options: ["18-25", "26-35", "36-50", "50+"],
  },
  {
    id: "race_ethnicity",
    category: "Step 4",
    type: "select",
    question: "Race/Ethnicity (optional)",
    subtext:
      "This information is optional and will appear publicly with your review if shared",
    options: [
      "White",
      "Black / African American",
      "Hispanic / Latino",
      "Asian",
      "Native American / Alaska Native",
      "Native Hawaiian / Pacific Islander",
      "Middle Eastern / North African",
      "Mixed race / Multiracial",
      "Other",
    ],
  },
  {
    id: "race_ethnicity_text",
    category: "Step 4",
    type: "text",
    question: "Please specify (optional)",
    placeholder: "Enter additional details...",
  },
  {
    id: "first_generation_student",
    category: "Step 4",
    type: "yes-no",
    question: "Are you a first-generation college student? (optional)",
    subtext:
      "This information is optional and will appear publicly with your review if shared",
  },
  {
    id: "disability_identity",
    category: "Step 4",
    type: "text",
    question: "Disability identity (optional)",
    subtext:
      "This information is optional and will appear publicly with your review if shared",
    placeholder: "e.g., Deaf, blind, mobility disability, ADHD, etc.",
  },
  {
    id: "lgbtq_identity",
    category: "Step 4",
    type: "text",
    question: "LGBTQ+ identity (optional)",
    subtext:
      "This information is optional and will appear publicly with your review if shared",
    placeholder: "e.g., She/her, bisexual; He/him, gay; etc.",
  },
];
