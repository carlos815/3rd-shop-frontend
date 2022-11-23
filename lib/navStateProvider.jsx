import { createContext, useContext, useState, useEffect } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function NavStateProvider({ children }) {
    const [cartOpen, setCartOpen] = useState(false);

    function toggleCart() {
        setCartOpen(!cartOpen);
    }

    function closeCart() {
        setCartOpen(false);
    }

    function openCart() {
        setCartOpen(true);
    }

    const [sideMenu, setSideMenu] = useState(false);

    function toggleSideMenu() {
        setSideMenu(!sideMenu);
    }

    function closeSideMenu() {
        setSideMenu(false);
    }

    function openSideMenu() {
        setSideMenu(true);
    }

    return (
        <LocalStateProvider
            value={{
                cartOpen,
                setCartOpen,
                toggleCart,
                closeCart,
                openCart,
                sideMenu: sideMenu,
                toggleSideMenu,
                closeSideMenu,
                openSideMenu,
            }}
        >
            {children}
        </LocalStateProvider>
    );
}

// make a custom hook for accessing the cart local state
function useNav() {
    // We use a consumer here to access the local state
    const all = useContext(LocalStateContext);
    return all;
}
export { NavStateProvider, useNav };
