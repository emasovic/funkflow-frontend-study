import { MantineThemeOverride, } from "@mantine/core";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        building: {
            main: string;
            edge: string;
            selected: string;
        }
        scene: {
            background: string;
            grid: string;
            gizmo: {
                x: string;
                y: string;
                z: string;
            }
        }
    }
}

export const theme: MantineThemeOverride = {
    primaryColor: "blue",
    fontFamily: "Roboto, sans-serif",
    colors: {
        building: [
            '#F1F3F5', // 0
            '#F1F3F5', // 1
            '#F1F3F5', // 2 - main
            '#868E96', // 3 - edge
            '#228BE6', // 4 - selected
            '#F1F3F5', // 5
            '#F1F3F5', // 6
            '#F1F3F5', // 7
            '#F1F3F5', // 8
            '#F1F3F5', // 9
        ],
        scene: [
            '#F8F9FA', // 0 - background
            '#F8F9FA', // 1 - grid
            '#FA5252', // 2 - gizmo x
            '#12B886', // 3 - gizmo y
            '#228BE6', // 4 - gizmo z
            '#F8F9FA', // 5
            '#F8F9FA', // 6
            '#F8F9FA', // 7
            '#F8F9FA', // 8
            '#F8F9FA', // 9
        ],
    },
    components: {
        Button: {
            defaultProps: {
                variant: "filled",
            },
            styles: {
                root: {
                    backgroundColor: "#FFFFFF",
                    color: "#228BE6",
                    border: "1px solid #E9ECEF",
                    borderRadius: "8px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease",

                    "&:hover": {
                        backgroundColor: "#F8F9FA",
                        transform: "translateY(-1px)",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    },

                    "&:active": {
                        transform: "translateY(0)",
                    },
                },
            },
        },
    },
};
