import React, { useContext } from 'react';
import { UserContext } from '../components/UserProvider';
import { NavBar } from '../components/NavBar';
import { Profile } from '../components/Profile'
import { AccountManagement } from '../components/AccountManagement'

export function AccountPage() {

    const { userId, setUserId, email, setEmail, name, setName } = useContext(UserContext);
    const isUserLoggedIn = userId || localStorage.getItem('userId');

    if (userId) {
        return (
            <>
                <NavBar />
                <Profile />
            </>
        );
    } else {
        return (
            <>
                <NavBar />
                <AccountManagement />
            </>
        );
    }
}
