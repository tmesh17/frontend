/**What answer type the question expects */
export type QuestionType =
  | "star-rating"
  | "star-rating-optional"
  | "yes-no"
  | "date-range"
  | "text"
  | "multiple-choice"
  | "multi-select"
  | "school-select"
  | "select"; //possible question types that we can filter by

/**Union type of all possible question types */
export type Question =
  | StarRatingQ
  | StarRatingOptionalQ
  | YesNoQ
  | DateRangeQ
  | TextQ
  | MultipleChoiceQ
  | MultiSelectQ
  | SchoolQ
  | SelectQ;

type category =
  | "Demographics"
  | "Rating"
  | "Written"
  | "Step 1"
  | "Step 2"
  | "Step 3"
  | "Step 4"
  | "Step 5"
  | "Step 6";

/**Base interface for all question types*/
export interface BaseQuestion {
  /**Corresponds to the column name in the DB */
  id: string;
  /**The text of the question being asked */
  question: string;
  /**Is this question required to be answered */
  required?: boolean;
  /**Additional help text for the question */
  helpText?: string;
  /**Subtext/description for the question */
  subtext?: string;
  /**Category the question belongs to */
  category?: category;
}

/**Question should be answered with a star rating */
interface StarRatingQ extends BaseQuestion {
  type: "star-rating";
}

/**Question should be answered with an optional star rating (can skip) */
interface StarRatingOptionalQ extends BaseQuestion {
  type: "star-rating-optional";
}

/**Question should be answered with a yes or no radio input */
interface YesNoQ extends BaseQuestion {
  type: "yes-no";
  conditional?: boolean;
  followUpQuestionId?: string;
}

/**Question should be answered with a multiple choice input (single select) */
interface MultipleChoiceQ extends BaseQuestion {
  type: "multiple-choice";
  options: string[];
}

/**Question should be answered with multi-select checkboxes */
interface MultiSelectQ extends BaseQuestion {
  type: "multi-select";
  options: string[];
}

/**Question should be answered with a dropdown select */
interface SelectQ extends BaseQuestion {
  type: "select";
  options: string[];
}

/**Question should be answered with a date range picker */
interface DateRangeQ extends BaseQuestion {
  type: "date-range";
}

interface SchoolQ extends BaseQuestion {
  type: "school-select";
}

/**Question should be answered with a text input */
interface TextQ extends BaseQuestion {
  type: "text";
  /**Is the text input multiline */
  multiline?: boolean;
  /**Maximum length of the text input */
  maxLength?: number;
  /**Placeholder text for the input */
  placeholder?: string;
}

/**What answers to survey questions look like */
export interface Answer {
  /**id must correspond to the column name in the DB */
  [id: string]: string | number | boolean | Date | null | string[];
}
