import { TextStyle, ViewStyle, ImageStyle, StyleProp } from "react-native";

// This is the dynamic functional style
type UnistylesFunctionalStyle = (
  ...params: any // Todo: Can this be typed somehow? Not sure how to make a rest param generic...
) => ViewStyle | StyleProp<TextStyle> | ImageStyle;

// Non functional style with the above added in
type UnistyleStyles =
  | ViewStyle
  | StyleProp<TextStyle>
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
}: UnisxOptions): (ViewStyle | StyleProp<TextStyle> | ImageStyle)[] => {
  const constructedStyles: (ViewStyle | StyleProp<TextStyle> | ImageStyle)[] =
    [];

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
