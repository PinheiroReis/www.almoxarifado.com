import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import api from '@/utils/api'
import type ItemProps from '@/types/item'
import type { StockMovementProps } from '@/types/item'

export default function StockManagement() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<ItemProps | null>(null)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [lowStockAlert, setLowStockAlert] = useState<string>('')

    const { data: products, isLoading } = useQuery<ItemProps[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await api.get('/items/items/')
            return response.data.sort((a: ItemProps, b: ItemProps) => 
                a.name.localeCompare(b.name)
            )
        },
    })

    const { data: movements } = useQuery<StockMovementProps[]>({
        queryKey: ['movements'],
        queryFn: async () => {
            const response = await api.get('/items/movements/')
            return response.data
        },
    })

    const createMovementMutation = useMutation({
        mutationFn: async (data: Partial<StockMovementProps>) => {
            return await api.post('/items/movements/', data)
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['movements'] })
            
            // Check if stock is low after a SAIDA movement
            if (variables.movement_type === 'SAIDA' && selectedProduct) {
                const newQuantity = selectedProduct.quantity - (variables.quantity || 0)
                if (newQuantity <= selectedProduct.minimum_stock) {
                    setLowStockAlert(
                        `ALERTA: O estoque de "${selectedProduct.name}" está abaixo do mínimo! ` +
                        `Quantidade atual: ${newQuantity} | Mínimo: ${selectedProduct.minimum_stock}`
                    )
                }
            }
            
            setOpenDialog(false)
            setSelectedProduct(null)
        },
        onError: (error: any) => {
            if (error.response?.data) {
                const errorMsg = JSON.stringify(error.response.data)
                setFormErrors({ submit: errorMsg })
            }
        },
    })

    const handleOpenDialog = (product: ItemProps) => {
        setSelectedProduct(product)
        setFormErrors({})
        setLowStockAlert('')
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setSelectedProduct(null)
        setFormErrors({})
    }

    const validateForm = (data: FormData): boolean => {
        const errors: Record<string, string> = {}
        
        if (!data.get('movement_type')) errors.movement_type = 'Tipo de movimentação é obrigatório'
        if (!data.get('quantity')) errors.quantity = 'Quantidade é obrigatória'
        if (!data.get('date')) errors.date = 'Data é obrigatória'

        const quantity = parseInt(data.get('quantity') as string)
        if (quantity <= 0) errors.quantity = 'Quantidade deve ser maior que zero'

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        if (!validateForm(formData) || !selectedProduct) {
            return
        }

        const movementData: Partial<StockMovementProps> = {
            item: selectedProduct.id,
            movement_type: formData.get('movement_type') as 'ENTRADA' | 'SAIDA',
            quantity: parseInt(formData.get('quantity') as string),
            date: formData.get('date') as string,
            notes: formData.get('notes') as string,
        }

        createMovementMutation.mutate(movementData)
    }

    const lowStockProducts = products?.filter(p => p.is_low_stock) || []

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => navigate('/')}
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Gestão de Estoque
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 3 }}>
                {lowStockAlert && (
                    <Alert severity="warning" sx={{ mb: 2 }} onClose={() => setLowStockAlert('')}>
                        {lowStockAlert}
                    </Alert>
                )}

                {lowStockProducts.length > 0 && (
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            ⚠️ Produtos com estoque baixo:
                        </Typography>
                        {lowStockProducts.map(p => (
                            <Typography key={p.id} variant="body2">
                                • {p.name} (Código: {p.code}) - Quantidade: {p.quantity} / Mínimo: {p.minimum_stock}
                            </Typography>
                        ))}
                    </Alert>
                )}

                <Typography variant="h5" sx={{ mb: 3 }}>
                    Produtos (ordem alfabética)
                </Typography>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Fabricante</TableCell>
                                    <TableCell align="right">Preço</TableCell>
                                    <TableCell align="right">Quantidade</TableCell>
                                    <TableCell align="center">Estoque</TableCell>
                                    <TableCell align="center">Ação</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products && products.length > 0 ? (
                                    products.map((product) => (
                                        <TableRow
                                            key={product.id}
                                            sx={{
                                                bgcolor: product.is_low_stock ? 'warning.light' : 'inherit'
                                            }}
                                        >
                                            <TableCell>{product.code}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.manufacturer}</TableCell>
                                            <TableCell align="right">
                                                R$ {product.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {product.quantity}
                                            </TableCell>
                                            <TableCell align="center">
                                                {product.is_low_stock ? (
                                                    <Chip
                                                        label="BAIXO"
                                                        color="warning"
                                                        size="small"
                                                    />
                                                ) : (
                                                    <Chip
                                                        label="OK"
                                                        color="success"
                                                        size="small"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={<MoveToInboxIcon />}
                                                    onClick={() => handleOpenDialog(product)}
                                                >
                                                    Movimentar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            Nenhum produto cadastrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {movements && movements.length > 0 && (
                    <>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Últimas Movimentações
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell align="center">Tipo</TableCell>
                                        <TableCell align="right">Quantidade</TableCell>
                                        <TableCell>Observações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {movements.slice(0, 10).map((movement) => (
                                        <TableRow key={movement.id}>
                                            <TableCell>
                                                {new Date(movement.date).toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell>{movement.item_name}</TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={movement.movement_type}
                                                    color={
                                                        movement.movement_type === 'ENTRADA'
                                                            ? 'success'
                                                            : 'error'
                                                    }
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                {movement.quantity}
                                            </TableCell>
                                            <TableCell>{movement.notes || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Movimentação de Estoque
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        {selectedProduct && (
                            <>
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    <Typography variant="body2">
                                        <strong>Produto:</strong> {selectedProduct.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Código:</strong> {selectedProduct.code}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Quantidade atual:</strong> {selectedProduct.quantity}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Estoque mínimo:</strong> {selectedProduct.minimum_stock}
                                    </Typography>
                                </Alert>

                                {formErrors.submit && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {formErrors.submit}
                                    </Alert>
                                )}

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <FormControl fullWidth required error={!!formErrors.movement_type}>
                                        <InputLabel>Tipo de Movimentação</InputLabel>
                                        <Select name="movement_type" defaultValue="" label="Tipo de Movimentação">
                                            <MenuItem value="ENTRADA">Entrada</MenuItem>
                                            <MenuItem value="SAIDA">Saída</MenuItem>
                                        </Select>
                                        {formErrors.movement_type && (
                                            <Typography variant="caption" color="error">
                                                {formErrors.movement_type}
                                            </Typography>
                                        )}
                                    </FormControl>

                                    <TextField
                                        name="quantity"
                                        label="Quantidade"
                                        type="number"
                                        required
                                        fullWidth
                                        inputProps={{ min: 1 }}
                                        error={!!formErrors.quantity}
                                        helperText={formErrors.quantity}
                                    />

                                    <TextField
                                        name="date"
                                        label="Data"
                                        type="date"
                                        required
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        defaultValue={new Date().toISOString().split('T')[0]}
                                        error={!!formErrors.date}
                                        helperText={formErrors.date}
                                    />

                                    <TextField
                                        name="notes"
                                        label="Observações"
                                        multiline
                                        rows={3}
                                        fullWidth
                                    />
                                </Box>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={createMovementMutation.isPending}
                        >
                            {createMovementMutation.isPending ? (
                                <CircularProgress size={24} />
                            ) : (
                                'Confirmar'
                            )}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}
