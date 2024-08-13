export type recipeType = "밥" | "반찬" | "국" | "찌개" | "후식";
export type ManualKey = `MANUAL${
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"}`;

type ManualType = {
  [key in ManualKey]: string;
};

export type RecipeRes = {
  RCP_NM: string;
  ATT_FILE_NO_MAIN: string;
  RCP_PARTS_DTLS: string;
  RCP_NA_TIP: string;
} & ManualType;
