export interface Size {
  id: string;
  size: string;
  available: boolean;
}

export interface Product {
  id: string;
  name?: string;
  price?: number;
  sizes?: Size[];
}

export const products: Product[] = [
  {
    id: '4af05e86-ff57-4ac4-b032-439faec37b80'
  },
  {
    id: 'a36b69de-4050-444f-a258-cc9e138f1d1a'
  },
  {
    id: 'dff03ebc-a032-4688-8f58-c761304b32ba'
  },
  {
    id: '685b03db-0e2b-4a31-bd52-27a4c487f85b'
  },
  {
    id: '256f4848-3a89-45a0-8fc1-d4ef54751f71'
  },
  {
    id: '634d667d-1496-4218-a394-128c39ce97df'
  },
  {
    id: 'ca59c019-bc85-4982-a987-6dc3d3c32820'
  },
  {
    id: 'b2979d89-44cb-4b49-9ff8-b89d2a6ad5d6'
  },
  {
    id: '9fdfb7b9-1503-4836-949f-06ecbb18bdfb'
  },
  {
    id: '73bc2509-12b1-42ca-b12b-d907e91c6c3e'
  },
  {
    id: 'ce3be120-6b79-46c6-a4b1-932fb1602405'
  },
  {
    id: 'd3495524-dbff-4238-8837-55a703c2d7e5'
  },
  {
    id: 'cc5c5374-1fac-44b2-acb9-d52c43423a7c'
  },
  {
    id: '10776a28-c4b0-4fe9-978b-34731df9fa79'
  },
  {
    id: 'ad5df6f6-95a9-4cfb-a8e9-14af8207654f'
  },
  {
    id: '39a26ee2-04e1-465d-b4d6-2d66356668f2'
  },
  {
    id: '301f489d-3e21-4eaa-8579-253eb5c9020d'
  },
  {
    id: 'd20efc98-b07c-45b6-a95f-1e6d9f681e46'
  },
  {
    id: '909adc52-2bb0-43e2-9bc6-7feb15f90f8e'
  },
  {
    id: 'b030b162-35fb-4564-9301-98a9ca988565'
  }
];

export const findProductById = async (id: string): Promise<Product | undefined> => {
  return products.find(product => product.id === id);
};

export const getRandomeProduct = (): Product => {
  return products[Math.floor(Math.random() * products.length)];
};