import { TextStyle, ViewStyle, ImageStyle } from "react-native";

// This is the dynamic functional style
type UnistylesFunctionalStyle = (
  ...params: any // Todo: Can this be typed somehow? Not sure how to make a rest param generic...
) => ViewStyle | TextStyle | ImageStyle;

// Non functional style with the above added in
type UnistyleStyles =
  | ViewStyle
  | TextStyle
  | ImageStyle
  | UnistylesFunctionalStyle;

// Unisx options object
interface UnisxOptions {
  styles: { [key: string]: UnistyleStyles };
  dynamicFunctionParams?: any; // Todo: can this be typed somehow?
  conditions: (string | { [key: string]: boolean | undefined })[];
}

export const unisx = ({
  styles,
  dynamicFunctionParams,
  conditions,
}: UnisxOptions): (ViewStyle | TextStyle | ImageStyle)[] => {
  const constructedStyles: (ViewStyle | TextStyle | ImageStyle)[] = [];

  conditions.forEach((condition) => {
    if (typeof condition === "string") {
      const style = styles[condition];
      if (typeof style === "function") {
        constructedStyles.push(style(dynamicFunctionParams));
      } else {
        constructedStyles.push(style);
      }
    } else if (typeof condition === "object") {
      Object.keys(condition).forEach((key) => {
        if (condition[key]) {
          const style = styles[key];
          if (typeof style === "function") {
            constructedStyles.push(style(dynamicFunctionParams));
          } else {
            constructedStyles.push(style);
          }
        }
      });
    }
  });

  return constructedStyles;
};
