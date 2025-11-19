import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default function Copyright() {
    return (
        <Typography
            variant="body2"
            align="center"
            sx={{
                color: 'text.secondary',
            }}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/PinheiroReis/">
                João Victor Pinheiro Reis
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    )
}
