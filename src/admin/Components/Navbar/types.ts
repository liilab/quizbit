export interface MenuProps {
    menus: {
        name: string;
        path: string;
    }[];
}

export interface NavbarProps {
    menus: MenuProps["menus"];
    border_color: "purple" | "blue";
}