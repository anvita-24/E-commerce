import React, { createContext, useState } from 'react'

export const Logincontext = createContext(null);

const Contextprovider = ({ children }) => {

    const [account, setAccount] = useState("");
    const [searchText, setSearchText] = useState("");  // ✅ add this

    return (
        <>
            <Logincontext.Provider value={{ account, setAccount, searchText, setSearchText }}>
                {children}
            </Logincontext.Provider>
        </>
    )
}

export default Contextprovider;