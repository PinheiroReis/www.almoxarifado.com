import { useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import InventoryIcon from '@mui/icons-material/Inventory'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import Cookies from 'js-cookie'
import { deleteTokens } from '@/utils/auth'

export default function Home() {
    const navigate = useNavigate()
    const username = Cookies.get('username') || 'Usuário'

    const handleLogout = () => {
        deleteTokens()
        Cookies.remove('username')
        navigate('/login')
    }

    const handleNavigateToProducts = () => {
        navigate('/products')
    }

    const handleNavigateToStock = () => {
        navigate('/stock')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Sistema de Controle de Estoque
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        {username}
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleLogout}
                        aria-label="logout"
                    >
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    height: 'calc(100vh - 64px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'grey.100',
                    p: 4,
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        width: '100%',
                        maxWidth: 600,
                        p: 4,
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                        Painel Principal
                    </Typography>
                    
                    <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
                        Sistema de gestão de equipamentos eletrônicos
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            startIcon={<InventoryIcon />}
                            onClick={handleNavigateToProducts}
                            sx={{ py: 2 }}
                        >
                            Cadastro de Produtos
                        </Button>
                        
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            startIcon={<MoveToInboxIcon />}
                            onClick={handleNavigateToStock}
                            sx={{ py: 2 }}
                            color="secondary"
                        >
                            Gestão de Estoque
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}
