import { TextStyle, ViewStyle, ImageStyle, PressableStateCallbackType } from "react-native";
type UnistyleFunctionalStyleArg = (params?: any) => ViewStyle | TextStyle | ImageStyle;
type UnistyleStylesArg = ViewStyle | TextStyle | ImageStyle | UnistyleFunctionalStyleArg;
interface UnisxArgs {
    styles: {
        [key: string]: UnistyleStylesArg;
    };
    state?: PressableStateCallbackType;
    conditions: (string | {
        [key: string]: boolean | undefined;
    })[];
}
export declare const unisx: ({ styles, state, conditions, }: UnisxArgs) => (ViewStyle | TextStyle | ImageStyle)[];
export {};
