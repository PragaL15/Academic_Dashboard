import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button'; // To use pi-bars icon
import { toast } from 'react-toastify';

const Sidebar = ({ children }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const itemRenderer = (item) => (
        <div className='p-menuitem-content'>
            <a className="flex align-items-center p-menuitem-link">
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.badge && <Badge className="ml-auto" value={item.badge} />}
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </a>
        </div>
    );

    let items = [
        {
            template: () => (
                <span className="inline-flex align-items-center gap-1 px-2 py-2">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g mask="url(#mask0_2642_713)">
                            {/* SVG paths omitted for brevity */}
                        </g>
                    </svg>
                    <span className="font-medium text-xl font-semibold">
                        PRIME<span className="text-primary">APP</span>
                    </span>
                </span>
            )
        },
        { separator: true },
        {
            label: 'Documents',
            items: [
                { label: 'New', icon: 'pi pi-plus', template: itemRenderer },
                { label: 'Search', icon: 'pi pi-search', template: itemRenderer },
                { label: 'Settings', icon: 'pi pi-cog', template: itemRenderer },
                { label: 'Messages', icon: 'pi pi-inbox', badge: 2, template: itemRenderer },
                { label: 'Logout', icon: 'pi pi-sign-out', template: itemRenderer }
            ]
        },
        { separator: true },
        {
            command: () => {
                toast.current.show({ severity: 'info', summary: 'Info', detail: 'Item Selected', life: 3000 });
            }
        }
    ];

    return (
        <>
            {/* Overlay background when menu is open */}
            {isMenuVisible && <div className="fixed inset-0 bg-black opacity-50 z-40 h-60" onClick={toggleMenu}></div>}
            
            {/* Hamburger menu and logo, hidden when menu is visible */}
            {!isMenuVisible && (
               <div className="card md:hidden relative">
               <Button
                   icon="pi pi-bars"
                   className="p-button-text absolute top-2 left-2"
                   onClick={toggleMenu}
               />
           </div>
            )}

            {/* Menu sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform transform ${isMenuVisible ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex`}>
                <Menu model={items} className="w-64 md:w-15rem p-4  h-full" />
            </div>

            {/* Content area, moved when the menu is open */}
            <div className={`transition-all duration-300 ${isMenuVisible ? 'md:ml-64' : 'md:ml-0'} p-4 w-full`}>
                {children}
            </div>
        </>
    );
};

export default Sidebar;
