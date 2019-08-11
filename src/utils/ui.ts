import { Side } from "../domain/order";

export const themes = [
    {
      name: "Light",
      value: "light"
    },
    {
      name: "Dark",
      value: "dark"
    }
  ]


export const colors = {
    green: "#159f49",
    red: "#df4249"
}


export function color(side: Side) {
    return side === Side.Buy ? "green" : "red";
}

export function getBase(productId: string) {
    return productId ? productId.split("-")[0] : "";
}

export function getQuote(productId: string) {
    return productId ? productId.split("-")[1] : "";
}

export function setTheme(id: string) {
    switch (id) {
        case "light":
            jQuery("body").removeClass("dark");
            jQuery(".ui").not(".dimmer").not(".button").not(".text").removeClass("inverted");
            break;
        case "dark":
            jQuery("body").addClass("dark");
            jQuery(".ui").not(".dimmer").not(".button").not(".text").addClass("inverted");
            break;
    }
}