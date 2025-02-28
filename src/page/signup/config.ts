
export const SIGNUP_STEPS = [
  "휴대전화 번호를 인증해주세요",
  "아이디를 입력해주세요",
  "비밀번호를 입력해주세요",
] as const;

export type SignupStep = 0 | 1 | 2;