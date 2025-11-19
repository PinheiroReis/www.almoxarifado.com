import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useLogin from '@/hooks/auth/useLogin'
import type Credentials from '@/types/credentials'

export default function SignIn() {
    const { mutate: login } = useLogin()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const credencials: Credentials = {
            username: (data.get('username') as string) || '',
            password: (data.get('password') as string) || '',
        }
        console.log(credencials)
        login(credencials)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // justify horizontally
                alignItems: 'center', // justify vertically
                flexDirection: 'column',
                height: '100vh',
                // width: '100%',
            }}
        >
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Nome de usuário"
                    id="username"
                    name="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    id="password"
                    name="password"
                    type="password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Enviar
                </Button>
            </Box>
        </Box>
    )
}
