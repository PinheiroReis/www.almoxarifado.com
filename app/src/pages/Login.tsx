import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import useLogin from '@/hooks/auth/useLogin'
import type Credentials from '@/types/credentials'

export default function SignIn() {
    const { mutate: login, isPending, error } = useLogin()
    const [validationError, setValidationError] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setValidationError('')

        const data = new FormData(event.currentTarget)
        const credentials: Credentials = {
            username: (data.get('username') as string) || '',
            password: (data.get('password') as string) || '',
        }

        if (!credentials.username || !credentials.password) {
            setValidationError('Por favor, preencha todos os campos.')
            return
        }

        login(credentials)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
                bgcolor: 'grey.100',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <Typography component="h1" variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                    Sistema de Estoque
                </Typography>
                
                <Typography component="h2" variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
                    Login
                </Typography>

                {(error || validationError) && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {validationError || 'Falha na autenticação. Verifique suas credenciais e tente novamente.'}
                    </Alert>
                )}

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
                        disabled={isPending}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Senha"
                        id="password"
                        name="password"
                        type="password"
                        disabled={isPending}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isPending}
                    >
                        {isPending ? <CircularProgress size={24} /> : 'Entrar'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}
