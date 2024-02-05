"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unisx = void 0;
const unisx = ({ styles, state, conditions, }) => {
    const constructedStyles = [];
    conditions.forEach((condition) => {
        if (typeof condition === "string") {
            const style = styles[condition];
            if (typeof style === "function") {
                constructedStyles.push(style(state));
            }
            else {
                constructedStyles.push(style);
            }
        }
        else if (typeof condition === "object") {
            Object.keys(condition).forEach((key) => {
                if (condition[key]) {
                    const style = styles[key];
                    if (typeof style === "function") {
                        constructedStyles.push(style(state));
                    }
                    else {
                        constructedStyles.push(style);
                    }
                }
            });
        }
    });
    return constructedStyles;
};
exports.unisx = unisx;
