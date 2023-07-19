export interface UserInfo {
  id: string;
  name: string;
  email: string;
  occupation: string;
  avatar: string;
}
export interface UserinfoShortcodeAttributes {
  id: string;
}

export interface QuizType{
 id : "single_choice" | "multiple_choice";
}