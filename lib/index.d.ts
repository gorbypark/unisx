import { TextStyle, ViewStyle, ImageStyle, StyleProp } from "react-native";
type UnistylesFunctionalStyle = (...params: any) => ViewStyle | StyleProp<TextStyle> | ImageStyle;
type UnistyleStyles = ViewStyle | StyleProp<TextStyle> | ImageStyle | UnistylesFunctionalStyle;
interface UnisxOptions {
    styles: {
        [key: string]: UnistyleStyles;
    };
    dynamicFunctionParams?: any;
    conditions: (string | {
        [key: string]: boolean | undefined;
    })[];
}
export declare const unisx: ({ styles, dynamicFunctionParams, conditions, }: UnisxOptions) => (ViewStyle | StyleProp<TextStyle> | ImageStyle)[];
export {};
