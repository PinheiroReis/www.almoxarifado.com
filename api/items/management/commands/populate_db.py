from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from categories.models import Category
from items.models import Item, StockMovement
from datetime import date, timedelta


class Command(BaseCommand):
    help = 'Populate database with sample electronics store data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating database with sample data...')
        
        # Create superuser if doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('Created superuser: admin/admin123'))
        
        # Create categories
        categories_data = [
            'Smartphones',
            'Notebooks',
            'Tablets',
            'Smart TVs',
            'Smartwatches',
            'Acessórios',
        ]
        
        categories = {}
        for cat_name in categories_data:
            cat, created = Category.objects.get_or_create(name=cat_name)
            categories[cat_name] = cat
            if created:
                self.stdout.write(f'Created category: {cat_name}')
        
        # Create sample products
        products_data = [
            # Smartphones
            {
                'name': 'iPhone 15 Pro',
                'code': 'IPH15P-256-BLK',
                'manufacturer': 'Apple',
                'price': 8999.00,
                'description': 'iPhone 15 Pro com design em titânio e chip A17 Pro',
                'quantity': 15,
                'minimum_stock': 5,
                'processor': 'Apple A17 Pro',
                'ram': '8GB',
                'storage': '256GB',
                'screen_size': '6.1 polegadas',
                'camera_resolution': '48MP principal',
                'operating_system': 'iOS 17',
                'color': 'Preto Titânio',
                'voltage': 'USB-C',
                'resolution': '2556x1179',
                'connectivity': 'Wi-Fi 6E, Bluetooth 5.3, 5G',
                'ports': 'USB-C',
                'material': 'Titânio e vidro',
                'weight': '187g',
                'categories': ['Smartphones'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'Samsung Galaxy S24 Ultra',
                'code': 'SAMS24U-512-GRY',
                'manufacturer': 'Samsung',
                'price': 7499.00,
                'description': 'Galaxy S24 Ultra com S Pen e câmera de 200MP',
                'quantity': 8,
                'minimum_stock': 5,
                'processor': 'Snapdragon 8 Gen 3',
                'ram': '12GB',
                'storage': '512GB',
                'screen_size': '6.8 polegadas',
                'camera_resolution': '200MP principal',
                'operating_system': 'Android 14',
                'color': 'Cinza Titânio',
                'voltage': 'USB-C',
                'resolution': '3120x1440',
                'connectivity': 'Wi-Fi 7, Bluetooth 5.3, 5G',
                'ports': 'USB-C',
                'material': 'Alumínio e vidro',
                'weight': '232g',
                'categories': ['Smartphones'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'Xiaomi 13T Pro',
                'code': 'XIA13TP-256-BLU',
                'manufacturer': 'Xiaomi',
                'price': 3999.00,
                'description': 'Xiaomi 13T Pro com carregamento ultrarrápido',
                'quantity': 20,
                'minimum_stock': 8,
                'processor': 'MediaTek Dimensity 9200+',
                'ram': '12GB',
                'storage': '256GB',
                'screen_size': '6.67 polegadas',
                'camera_resolution': '50MP principal',
                'operating_system': 'Android 13',
                'color': 'Azul',
                'voltage': 'USB-C',
                'resolution': '2712x1220',
                'connectivity': 'Wi-Fi 6, Bluetooth 5.4, 5G',
                'ports': 'USB-C',
                'material': 'Plástico e vidro',
                'weight': '200g',
                'categories': ['Smartphones'],
                'status': 'AVAILABLE',
            },
            # Notebooks
            {
                'name': 'MacBook Pro 14"',
                'code': 'MBP14-M3P-512',
                'manufacturer': 'Apple',
                'price': 16999.00,
                'description': 'MacBook Pro 14 polegadas com chip M3 Pro',
                'quantity': 5,
                'minimum_stock': 3,
                'processor': 'Apple M3 Pro (11 núcleos)',
                'ram': '18GB',
                'storage': '512GB SSD',
                'screen_size': '14.2 polegadas',
                'operating_system': 'macOS Sonoma',
                'color': 'Cinza Espacial',
                'voltage': '127V/220V (bivolt)',
                'resolution': '3024x1964',
                'connectivity': 'Wi-Fi 6E, Bluetooth 5.3',
                'ports': 'HDMI, 3x Thunderbolt 4, SD Card',
                'material': 'Alumínio',
                'weight': '1.55kg',
                'categories': ['Notebooks'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'Dell XPS 15',
                'code': 'DELLXPS15-1TB',
                'manufacturer': 'Dell',
                'price': 12499.00,
                'description': 'Dell XPS 15 com tela OLED 4K',
                'quantity': 7,
                'minimum_stock': 4,
                'processor': 'Intel Core i7-13700H',
                'ram': '32GB',
                'storage': '1TB SSD',
                'screen_size': '15.6 polegadas',
                'operating_system': 'Windows 11 Pro',
                'color': 'Prata',
                'voltage': '127V/220V (bivolt)',
                'resolution': '3840x2400',
                'connectivity': 'Wi-Fi 6E, Bluetooth 5.2',
                'ports': 'USB-C, Thunderbolt 4, SD Card',
                'material': 'Alumínio',
                'weight': '1.86kg',
                'categories': ['Notebooks'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'Lenovo IdeaPad Gaming 3',
                'code': 'LENVIP3G-512',
                'manufacturer': 'Lenovo',
                'price': 4999.00,
                'description': 'Notebook gamer com RTX 3050',
                'quantity': 12,
                'minimum_stock': 6,
                'processor': 'AMD Ryzen 5 5600H',
                'ram': '16GB',
                'storage': '512GB SSD',
                'screen_size': '15.6 polegadas',
                'operating_system': 'Windows 11 Home',
                'color': 'Preto',
                'voltage': '127V/220V (bivolt)',
                'resolution': '1920x1080',
                'connectivity': 'Wi-Fi 6, Bluetooth 5.1',
                'ports': 'USB-C, 3x USB-A, HDMI, Ethernet',
                'material': 'Plástico',
                'weight': '2.25kg',
                'categories': ['Notebooks'],
                'status': 'AVAILABLE',
            },
            # Tablets
            {
                'name': 'iPad Pro 12.9"',
                'code': 'IPADP129-256',
                'manufacturer': 'Apple',
                'price': 9499.00,
                'description': 'iPad Pro com chip M2 e display Liquid Retina XDR',
                'quantity': 6,
                'minimum_stock': 3,
                'processor': 'Apple M2',
                'ram': '8GB',
                'storage': '256GB',
                'screen_size': '12.9 polegadas',
                'camera_resolution': '12MP principal',
                'operating_system': 'iPadOS 17',
                'color': 'Cinza Espacial',
                'resolution': '2732x2048',
                'connectivity': 'Wi-Fi 6E, Bluetooth 5.3',
                'ports': 'USB-C Thunderbolt',
                'material': 'Alumínio',
                'weight': '682g',
                'categories': ['Tablets'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'Samsung Galaxy Tab S9',
                'code': 'SAMTABS9-256',
                'manufacturer': 'Samsung',
                'price': 4499.00,
                'description': 'Galaxy Tab S9 com S Pen inclusa',
                'quantity': 10,
                'minimum_stock': 5,
                'processor': 'Snapdragon 8 Gen 2',
                'ram': '8GB',
                'storage': '256GB',
                'screen_size': '11 polegadas',
                'camera_resolution': '13MP principal',
                'operating_system': 'Android 13',
                'color': 'Bege',
                'resolution': '2560x1600',
                'connectivity': 'Wi-Fi 6E, Bluetooth 5.3',
                'ports': 'USB-C',
                'material': 'Alumínio',
                'weight': '498g',
                'categories': ['Tablets'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'Xiaomi Pad 6',
                'code': 'XIAPAD6-128',
                'manufacturer': 'Xiaomi',
                'price': 1999.00,
                'description': 'Tablet com tela de 144Hz',
                'quantity': 15,
                'minimum_stock': 8,
                'processor': 'Snapdragon 870',
                'ram': '6GB',
                'storage': '128GB',
                'screen_size': '11 polegadas',
                'camera_resolution': '13MP principal',
                'operating_system': 'Android 13',
                'color': 'Cinza',
                'resolution': '2880x1800',
                'connectivity': 'Wi-Fi 6, Bluetooth 5.2',
                'ports': 'USB-C',
                'material': 'Metal',
                'weight': '490g',
                'categories': ['Tablets'],
                'status': 'AVAILABLE',
            },
            # Smart TVs
            {
                'name': 'Samsung Neo QLED 65"',
                'code': 'SAMQLED65-4K',
                'manufacturer': 'Samsung',
                'price': 5999.00,
                'description': 'Smart TV Neo QLED 65" 4K com Quantum Mini LED',
                'quantity': 8,
                'minimum_stock': 3,
                'processor': 'Neural Quantum Processor 4K',
                'screen_size': '65 polegadas',
                'operating_system': 'Tizen OS',
                'voltage': '127V/220V (bivolt)',
                'resolution': '3840x2160 (4K)',
                'connectivity': 'Wi-Fi 5, Bluetooth 5.2, Ethernet',
                'ports': '4x HDMI 2.1, 2x USB, Ethernet, Óptico',
                'weight': '21.3kg',
                'categories': ['Smart TVs'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'LG OLED 55"',
                'code': 'LGOLED55-4K',
                'manufacturer': 'LG',
                'price': 6499.00,
                'description': 'Smart TV OLED 55" 4K com webOS',
                'quantity': 5,
                'minimum_stock': 2,
                'processor': 'α9 AI Processor Gen6',
                'screen_size': '55 polegadas',
                'operating_system': 'webOS 23',
                'voltage': '127V/220V (bivolt)',
                'resolution': '3840x2160 (4K)',
                'connectivity': 'Wi-Fi 6, Bluetooth 5.1, Ethernet',
                'ports': '4x HDMI 2.1, 3x USB, Ethernet, Óptico',
                'weight': '15.9kg',
                'categories': ['Smart TVs'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'TCL 50" 4K Google TV',
                'code': 'TCL50-GOOGLETV',
                'manufacturer': 'TCL',
                'price': 2299.00,
                'description': 'Smart TV 50" 4K com Google TV',
                'quantity': 18,
                'minimum_stock': 8,
                'screen_size': '50 polegadas',
                'operating_system': 'Google TV',
                'voltage': '127V/220V (bivolt)',
                'resolution': '3840x2160 (4K)',
                'connectivity': 'Wi-Fi 5, Bluetooth 5.0, Ethernet',
                'ports': '3x HDMI 2.0, 2x USB, Ethernet',
                'weight': '9.8kg',
                'categories': ['Smart TVs'],
                'status': 'AVAILABLE',
            },
            # Smartwatches
            {
                'name': 'Apple Watch Series 9',
                'code': 'AWSE9-45-ALU',
                'manufacturer': 'Apple',
                'price': 4299.00,
                'description': 'Apple Watch Series 9 com tela sempre ativa',
                'quantity': 12,
                'minimum_stock': 6,
                'processor': 'Apple S9',
                'screen_size': '45mm',
                'operating_system': 'watchOS 10',
                'color': 'Meia-noite',
                'resolution': '396x484',
                'connectivity': 'Wi-Fi, Bluetooth 5.3',
                'material': 'Alumínio',
                'weight': '38.7g',
                'categories': ['Smartwatches'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'Samsung Galaxy Watch 6',
                'code': 'SAMGW6-44',
                'manufacturer': 'Samsung',
                'price': 2199.00,
                'description': 'Galaxy Watch 6 com monitoramento avançado de saúde',
                'quantity': 15,
                'minimum_stock': 7,
                'processor': 'Exynos W930',
                'screen_size': '44mm',
                'operating_system': 'Wear OS 4',
                'color': 'Grafite',
                'resolution': '480x480',
                'connectivity': 'Wi-Fi, Bluetooth 5.3',
                'material': 'Alumínio',
                'weight': '33.3g',
                'categories': ['Smartwatches'],
                'status': 'AVAILABLE',
            },
            {
                'name': 'Amazfit GTR 4',
                'code': 'AMAZGTR4',
                'manufacturer': 'Amazfit',
                'price': 1299.00,
                'description': 'Smartwatch com GPS e bateria de longa duração',
                'quantity': 25,
                'minimum_stock': 10,
                'screen_size': '46mm',
                'operating_system': 'Zepp OS',
                'color': 'Preto',
                'resolution': '466x466',
                'connectivity': 'Bluetooth 5.0',
                'material': 'Alumínio',
                'weight': '48g',
                'categories': ['Smartwatches'],
                'status': 'AVAILABLE',
            },
        ]
        
        created_items = []
        for prod_data in products_data:
            cat_names = prod_data.pop('categories')
            item, created = Item.objects.get_or_create(
                code=prod_data['code'],
                defaults=prod_data
            )
            
            if created:
                for cat_name in cat_names:
                    item.categories.add(categories[cat_name])
                created_items.append(item)
                self.stdout.write(f'Created product: {item.name}')
        
        # Create stock movements for some products
        if created_items:
            today = date.today()
            movements = [
                {
                    'item': created_items[0],
                    'movement_type': 'ENTRADA',
                    'quantity': 10,
                    'date': today - timedelta(days=7),
                    'notes': 'Estoque inicial'
                },
                {
                    'item': created_items[0],
                    'movement_type': 'SAIDA',
                    'quantity': 2,
                    'date': today - timedelta(days=3),
                    'notes': 'Venda'
                },
                {
                    'item': created_items[1],
                    'movement_type': 'ENTRADA',
                    'quantity': 15,
                    'date': today - timedelta(days=10),
                    'notes': 'Compra de fornecedor'
                },
            ]
            
            for mov_data in movements:
                StockMovement.objects.create(**mov_data)
                self.stdout.write(f'Created stock movement for {mov_data["item"].name}')
        
        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
        self.stdout.write(self.style.SUCCESS('Superuser credentials: admin / admin123'))
