"use client"

import React, { useState } from "react";
import { NavigationMenu, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ShoppingBag } from "lucide-react";
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import Logo from '../public/newpetstore-svg.svg';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Menu } from 'lucide-react';

const Navbar = () => {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <div>
            <NavigationMenu className="p-4 shadow-md bg-black flex items-center text-white justify-between">
                <div className="flex items-center">
                    <button onClick={toggleDrawer} className="mr-4" data-testid="drawer">
                        <Menu size={24} /> {/* Hamburger icon */}
                    </button>
                </div>
                <div className="flex-grow flex justify-center">
                    <NavigationMenuLink href="/" className="flex justify-center">
                        <Image src={Logo} alt="Logo" height={30} width={150} />
                    </NavigationMenuLink>
                </div>
                <div className="ml-auto relative">
                    <NavigationMenuLink href="/cart">
                        <ShoppingBag />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                {itemCount}
                            </span>
                        )}
                    </NavigationMenuLink>
                </div>
            </NavigationMenu>

            {/* Drawer for navigation links */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="left">
                <DrawerTrigger>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col w-64 h-full">
                    <DrawerHeader>
                        <DialogTitle>Menu</DialogTitle>
                        <DialogDescription>Select a link to navigate</DialogDescription>
                    </DrawerHeader>
                    <div className="flex flex-col p-4 h-full justify-center">
                        <NavigationMenu className="flex flex-col space-y-4">
                            <NavigationMenuLink href="/shop" onClick={toggleDrawer} className="block">Store</NavigationMenuLink>
                            <NavigationMenuLink href="/about" onClick={toggleDrawer} className="block">About Us</NavigationMenuLink>
                        </NavigationMenu>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default Navbar;