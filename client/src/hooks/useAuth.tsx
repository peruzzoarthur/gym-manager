export const useAuth = () => {
    const signIn = () => {
        localStorage.setItem('isAuthenticated', 'true')
    }

    const signOut = () => {
        localStorage.removeItem('isAuthenticated')
        // localStorage.setItem('accessToken', '')
    }

    const isLogged = () =>
        localStorage.getItem('isAuthenticated') === 'true' &&
        localStorage.getItem('refreshToken')

    return { signIn, signOut, isLogged }
}

export type AuthContext = ReturnType<typeof useAuth>
