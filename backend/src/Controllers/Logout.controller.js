export const closeSession = (req, res) => {
    if (!req.cookies.jwt) {
        return res.status(400).json({ message: 'No hay sesión activa' });
    }

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/',
    });

    res.status(200).json({ message: 'Logout exitoso' });
};
