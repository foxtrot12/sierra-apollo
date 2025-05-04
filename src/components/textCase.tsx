import { FC, memo, useMemo } from "react";

type TextCaseMode = "upper" | "lower" | "sentence" | "capitalize";

interface TextCaseProps {
  children: string;
  mode: TextCaseMode;
}

const toSentenceCase = (str: string) => {
  if (!str) return "";
  const lower = str.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const toCapitalizedWords = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function TextCase({ children, mode }: TextCaseProps) {
  const transformed = useMemo(() => {
    switch (mode) {
      case "upper":
        return children.toUpperCase();
      case "lower":
        return children.toLowerCase();
      case "sentence":
        return toSentenceCase(children);
      case "capitalize":
        return toCapitalizedWords(children);
      default:
        return children;
    }
  }, [children, mode]);

  return <>{transformed}</>;
}

export default memo(TextCase);
