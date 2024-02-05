import {
  TextStyle,
  ViewStyle,
  ImageStyle,
  PressableStateCallbackType,
} from "react-native";

type UnistyleFunctionalStyleArg = (
  params?: any
) => ViewStyle | TextStyle | ImageStyle;

type UnistyleStylesArg =
  | ViewStyle
  | TextStyle
  | ImageStyle
  | UnistyleFunctionalStyleArg;

interface UnisxArgs {
  styles: { [key: string]: UnistyleStylesArg };
  state?: PressableStateCallbackType;
  conditions: (string | { [key: string]: boolean | undefined })[];
}

export const unisx = ({
  styles,
  state,
  conditions,
}: UnisxArgs): (ViewStyle | TextStyle | ImageStyle)[] => {
  const constructedStyles: (ViewStyle | TextStyle | ImageStyle)[] = [];

  conditions.forEach((condition) => {
    if (typeof condition === "string") {
      const style = styles[condition];
      if (typeof style === "function") {
        constructedStyles.push(style(state));
      } else {
        constructedStyles.push(style);
      }
    } else if (typeof condition === "object") {
      Object.keys(condition).forEach((key) => {
        if (condition[key]) {
          const style = styles[key];
          if (typeof style === "function") {
            constructedStyles.push(style(state));
          } else {
            constructedStyles.push(style);
          }
        }
      });
    }
  });

  return constructedStyles;
};
