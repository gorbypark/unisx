---

## Unisx

`unisx` is a tiny (~512 bytes gzipped) React Native utility for Unistyles that simplifies the process of conditional styling. It allows you to apply a set of Unistyle styles based on certain conditions and component states, such as `pressed` or `hovered` by utilizings Unistyles dynamic functions feature. Unisx is loosely inspired by the clsx utility that conditionally concatenates classNames into a string, however this utility's syntax differs and returns an array of styles.

## Installation

To add `unisx` to your project, run the following command:

```sh
npm install unisx --save
# or
yarn add unisx
```

## Usage

Import the `unisx` function into your component:

```javascript
import { unisx } from "unisx";
```

Define styles using Unistyles (see Unistyles docs)

```javascript
const stylesheet = createStyleSheet((theme) => ({
  defaultStyle: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: theme.colors.grey[11],
  },
  primary: ({ pressed }) => ({
    backgroundColor: pressed ? theme.colors.grey[10] : theme.colors.grey[11],
  }),
  rounded: {
    borderRadius: 25,
  },
  disabled: { backgroundColor: theme.colors.grey[7] },
}));
```

Pass your styles into Unistyle's useStyle hook like normal

```javascript
const { styles } = useStyles(stylesheet);
```

Use `unisx` to construct your styles:

```javascript
const dynamicStyles = unisx({
  styles, // This styles from the Unistyles useStyles hook
  conditions: [
    "defaultStyle", // A string means always applied
    { primary: true }, // Will apply styles.primary
    { rounded: true }, // Will apply styles.rounded
    { disabled: false }, // Will NOT apply styles.disabled
  ],
});
```

Apply the constructed styles to your components:

```javascript
const MyComponent = () => {
  return (
    <View style={dynamicStyles}>
      <Text>Dynamic Styles are Awesome!</Text>
    </View>
  );
};

export default MyComponent;
```

For components with state (e.g., `Pressable`), you can pass the state object into the dynamicFunction feature of Unistyles:

```javascript
const MyButton = (dynamicFunctionParams: PressableStateCallbackType) => {
  const dynamicStyles = unisx({
    styles,
    dynamicFunctionParams, // Optional params to pass to Unistyles, great for passing in pressed / hovered states
    conditions: [
      "defaultStyle",
      { rounded: true },
      { primary: true },
      { disabled },
    ],
  });

  return (
    <Pressable onPress={onPress} style={(state) => dynamicStyles(state)}>
      <Text>Press Me</Text>
    </Pressable>
  );
};

export default MyButton;
```

## Example button component

```javascript
import React from "react";
import { PropsWithChildren } from "react";
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  Text,
} from "react-native";
import { useStyles, createStyleSheet } from "react-native-unistyles";
import { unisx } from "unisx";

interface IButton extends PropsWithChildren<PressableProps> {
  asChild?: boolean;
  rounded?: boolean;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onPress?: () => void;
}

export const Button = ({
  children,
  asChild,
  rounded,
  variant = "primary",
  disabled,
  onPress = () => null,
  ...rest
}: IButton) => {
  const { styles } = useStyles(stylesheet);

  const dynamicStyles = (dynamicFunctionParams: PressableStateCallbackType) =>
    unisx({
      styles,
      dynamicFunctionParams,
      conditions: [
        "defaultStyle", // Always applies styles.defaultStyle
        { rounded: rounded === true }, // Applies styles.rounded if rounded (in this case a prop) is true.
        { primary: variant === "primary" }, // Applies styles.primary if variant (in this case a prop) equals 'primary'
        { secondary: variant === "secondary" }, // Applies styles.secondary if variant (in this case a prop) equals 'secondary'
        { disabled }, // Applies styles.disabled if disabled (in this case a prop) equals true
      ],
    });

  return (
    <Pressable
      onPress={() => !disabled && onPress()}
      style={(state) => dynamicStyles(state)}
      {...rest}
    >
      {asChild ? (
        children
      ) : (
        <Text style={styles.buttonText(disabled)}>{children}</Text>
      )}
    </Pressable>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  defaultStyle: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: theme.colors.grey[11],
  },
  primary: ({ pressed }) => ({
    backgroundColor: pressed ? theme.colors.grey[10] : theme.colors.grey[11],
  }),
  secondary: ({ pressed }) => ({
    backgroundColor: pressed ? "green" : "red",
  }),
  disabled: { backgroundColor: theme.colors.grey[7] },
  rounded: {
    borderRadius: 25,
  },
  buttonText: (disabled?: boolean) => ({
    color: disabled ? theme.colors.grey[9] : theme.colors.grey[1],
  }),
}));
```

## Roadmap (possibly upcoming features, PRs welcome!)

- It would be nice to have an optional array syntax to apply more than a single style per condition. Something like:

```javascript
const dynamicStyles = unisx({
  styles,
  conditions: [
   	['style1,', 'style2']: variant === 'primary'}, // Proposed new optional syntax
   	{style1: variant === 'primary'}, // existing syntax
  ]
})
```

Note: Keys must be strings in Javascript objects. Maps can have keys of arrays, however I'm not sure how/if this could be made to work somehow using a map.

- More generic types. Currently, unisx is typed but I have taken some liberties in typing the dynamic function as any. This should probably become a generic that accepts any type.

## Contributing

If you have suggestions for how `unisx` could be improved, or want to report a bug, open an issue! Any and all contributions are welcome.

## License

[MIT](LICENSE) © Mike Hamilton
