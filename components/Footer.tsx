import { NavigationMenu, NavigationMenuLink } from "@radix-ui/react-navigation-menu";

const Footer = () => {
  return (
    <NavigationMenu className="p-4 shadow-md bg-black flex space-x-4 text-white">
        <NavigationMenuLink href="/">Home</NavigationMenuLink>
        <NavigationMenuLink href="/shop">Store</NavigationMenuLink>
        <NavigationMenuLink href="/about">About Us</NavigationMenuLink>
    </NavigationMenu>
  );
};

export default Footer;