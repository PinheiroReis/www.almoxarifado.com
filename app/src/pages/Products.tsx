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
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
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
import api from '@/utils/api'
import type ItemProps from '@/types/item'

export default function Products() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchTerm, setSearchTerm] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [editingProduct, setEditingProduct] = useState<ItemProps | null>(null)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})

    const { data: products, isLoading, error } = useQuery<ItemProps[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await api.get('/items/items/')
            return response.data
        },
    })

    const createMutation = useMutation({
        mutationFn: async (data: Partial<ItemProps>) => {
            return await api.post('/items/items/', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            setOpenDialog(false)
            setEditingProduct(null)
        },
    })

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<ItemProps> }) => {
            return await api.put(`/items/items/${id}/`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            setOpenDialog(false)
            setEditingProduct(null)
        },
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            return await api.delete(`/items/items/${id}/`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })

    const filteredProducts = products?.filter((product) => {
        const term = searchTerm.toLowerCase()
        return (
            product.name.toLowerCase().includes(term) ||
            product.code.toLowerCase().includes(term) ||
            product.manufacturer.toLowerCase().includes(term)
        )
    })

    const handleOpenDialog = (product?: ItemProps) => {
        setEditingProduct(product || null)
        setFormErrors({})
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setEditingProduct(null)
        setFormErrors({})
    }

    const validateForm = (data: FormData): boolean => {
        const errors: Record<string, string> = {}
        
        if (!data.get('name')) errors.name = 'Nome é obrigatório'
        if (!data.get('code')) errors.code = 'Código é obrigatório'
        if (!data.get('manufacturer')) errors.manufacturer = 'Fabricante é obrigatório'
        if (!data.get('price')) errors.price = 'Preço é obrigatório'
        if (!data.get('quantity')) errors.quantity = 'Quantidade é obrigatória'
        if (!data.get('minimum_stock')) errors.minimum_stock = 'Estoque mínimo é obrigatório'

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        if (!validateForm(formData)) {
            return
        }

        const productData: Partial<ItemProps> = {
            name: formData.get('name') as string,
            code: formData.get('code') as string,
            manufacturer: formData.get('manufacturer') as string,
            price: parseFloat(formData.get('price') as string),
            description: formData.get('description') as string,
            quantity: parseInt(formData.get('quantity') as string),
            minimum_stock: parseInt(formData.get('minimum_stock') as string),
            processor: formData.get('processor') as string,
            ram: formData.get('ram') as string,
            storage: formData.get('storage') as string,
            screen_size: formData.get('screen_size') as string,
            camera_resolution: formData.get('camera_resolution') as string,
            operating_system: formData.get('operating_system') as string,
            color: formData.get('color') as string,
            voltage: formData.get('voltage') as string,
            connectivity: formData.get('connectivity') as string,
            ports: formData.get('ports') as string,
            weight: formData.get('weight') as string,
            status: 'AVAILABLE',
        }

        if (editingProduct) {
            updateMutation.mutate({ id: editingProduct.id, data: productData })
        } else {
            createMutation.mutate(productData)
        }
    }

    const handleDelete = (id: number, name: string) => {
        if (window.confirm(`Tem certeza que deseja excluir "${name}"?`)) {
            deleteMutation.mutate(id)
        }
    }

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
                        Cadastro de Produtos
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth
                        label="Buscar produtos"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Digite nome, código ou fabricante..."
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                        sx={{ minWidth: 150 }}
                    >
                        Novo Produto
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Erro ao carregar produtos. Tente novamente.
                    </Alert>
                )}

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Fabricante</TableCell>
                                    <TableCell align="right">Preço</TableCell>
                                    <TableCell align="right">Quantidade</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProducts && filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.code}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.manufacturer}</TableCell>
                                            <TableCell align="right">
                                                R$ {product.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {product.quantity}
                                                {product.is_low_stock && (
                                                    <Chip
                                                        label="Baixo"
                                                        color="warning"
                                                        size="small"
                                                        sx={{ ml: 1 }}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={product.status}
                                                    color={product.status === 'AVAILABLE' ? 'success' : 'default'}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleOpenDialog(product)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            {searchTerm
                                                ? 'Nenhum produto encontrado com esse termo.'
                                                : 'Nenhum produto cadastrado.'}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="h6">Informações Básicas</Typography>
                            <TextField
                                name="name"
                                label="Nome"
                                required
                                fullWidth
                                defaultValue={editingProduct?.name || ''}
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                            />
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    name="code"
                                    label="Código"
                                    required
                                    fullWidth
                                    defaultValue={editingProduct?.code || ''}
                                    error={!!formErrors.code}
                                    helperText={formErrors.code}
                                />
                                <TextField
                                    name="manufacturer"
                                    label="Fabricante"
                                    required
                                    fullWidth
                                    defaultValue={editingProduct?.manufacturer || ''}
                                    error={!!formErrors.manufacturer}
                                    helperText={formErrors.manufacturer}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    name="price"
                                    label="Preço"
                                    type="number"
                                    required
                                    fullWidth
                                    inputProps={{ step: '0.01' }}
                                    defaultValue={editingProduct?.price || ''}
                                    error={!!formErrors.price}
                                    helperText={formErrors.price}
                                />
                                <TextField
                                    name="quantity"
                                    label="Quantidade"
                                    type="number"
                                    required
                                    fullWidth
                                    defaultValue={editingProduct?.quantity || 0}
                                    error={!!formErrors.quantity}
                                    helperText={formErrors.quantity}
                                />
                                <TextField
                                    name="minimum_stock"
                                    label="Estoque Mínimo"
                                    type="number"
                                    required
                                    fullWidth
                                    defaultValue={editingProduct?.minimum_stock || 5}
                                    error={!!formErrors.minimum_stock}
                                    helperText={formErrors.minimum_stock}
                                />
                            </Box>
                            <TextField
                                name="description"
                                label="Descrição"
                                multiline
                                rows={2}
                                fullWidth
                                defaultValue={editingProduct?.description || ''}
                            />

                            <Typography variant="h6" sx={{ mt: 2 }}>Especificações Técnicas</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    name="processor"
                                    label="Processador"
                                    fullWidth
                                    defaultValue={editingProduct?.processor || ''}
                                />
                                <TextField
                                    name="ram"
                                    label="Memória RAM"
                                    fullWidth
                                    defaultValue={editingProduct?.ram || ''}
                                />
                                <TextField
                                    name="storage"
                                    label="Armazenamento"
                                    fullWidth
                                    defaultValue={editingProduct?.storage || ''}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    name="screen_size"
                                    label="Tamanho da Tela"
                                    fullWidth
                                    defaultValue={editingProduct?.screen_size || ''}
                                />
                                <TextField
                                    name="camera_resolution"
                                    label="Câmera"
                                    fullWidth
                                    defaultValue={editingProduct?.camera_resolution || ''}
                                />
                                <TextField
                                    name="operating_system"
                                    label="Sistema Operacional"
                                    fullWidth
                                    defaultValue={editingProduct?.operating_system || ''}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    name="color"
                                    label="Cor"
                                    fullWidth
                                    defaultValue={editingProduct?.color || ''}
                                />
                                <TextField
                                    name="voltage"
                                    label="Voltagem"
                                    fullWidth
                                    defaultValue={editingProduct?.voltage || ''}
                                />
                                <TextField
                                    name="weight"
                                    label="Peso"
                                    fullWidth
                                    defaultValue={editingProduct?.weight || ''}
                                />
                            </Box>

                            <Typography variant="h6" sx={{ mt: 2 }}>Conectividade</Typography>
                            <TextField
                                name="connectivity"
                                label="Conectividade (Wi-Fi, Bluetooth, etc.)"
                                fullWidth
                                defaultValue={editingProduct?.connectivity || ''}
                            />
                            <TextField
                                name="ports"
                                label="Portas (USB, HDMI, etc.)"
                                fullWidth
                                defaultValue={editingProduct?.ports || ''}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={createMutation.isPending || updateMutation.isPending}
                        >
                            {createMutation.isPending || updateMutation.isPending ? (
                                <CircularProgress size={24} />
                            ) : (
                                'Salvar'
                            )}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}
