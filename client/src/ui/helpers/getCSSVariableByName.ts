import { CSSVariables, ICssVariable } from "../types";

export default (variables: ICssVariable[], name: CSSVariables): string | undefined => {
  return variables.find(cssVar => cssVar.name === name)?.value
}