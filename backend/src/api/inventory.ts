import { Router, Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { databaseConnection } from '../connections/DBConnection';

const router = Router();

// TypeScript interfaces for inventory data
interface InventoryItem {
  inventory_id: number;
  itemName: string;
  itemDescription: string;
  quantity: number;
  manufacturingDate: Date;
  expiryDate: Date;
  lotNo: string;
  associated_Illnesses: string;
  category: string;
  created_at: Date;
}

// Get all inventory items
router.get('/', (req: Request, res: Response) => {
  const query = 'SELECT * FROM inventory';

  console.log('Executing query:', query);

  databaseConnection.query(query, (err, data: RowDataPacket[]) => {
    if (err)
      return res.status(500).json({
        error: err.message,
        message: 'Failed to retrieve inventory items',
      });
    return res.json(data);
  });
});

// Get a specific inventory item by ID
router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = 'SELECT * FROM inventory WHERE inventory_id = ?';
  const id = parseInt(req.params.id);

  console.log('Executing query:', query);

  databaseConnection.query(
    query,
    [id],
    (err, data: RowDataPacket[] | ResultSetHeader) => {
      if (err) return res.status(500).json({ error: err.message });

      // Type guard to ensure data is RowDataPacket[]
      if (Array.isArray(data) && data.length > 0) {
        return res.json(data[0]);
      }

      return res.status(404).json({ message: 'Inventory item not found' });
    },
  );
});

// Add a new inventory item
router.post('/create', (req: Request, res: Response) => {
  const query = `
    INSERT INTO inventory (inventory_id, itemName, itemDescription, quantity, manufacturingDate, expiryDate, lotNo, associated_Illnesses, category, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const {
    inventory_id,
    itemName,
    itemDescription,
    quantity,
    manufacturingDate,
    expiryDate,
    lotNo,
    associated_Illnesses,
    category,
    created_at,
  } = req.body as InventoryItem;

  const values = [
    inventory_id,
    itemName,
    itemDescription,
    quantity,
    manufacturingDate,
    expiryDate,
    lotNo,
    associated_Illnesses,
    category,
    created_at,
  ];

  databaseConnection.query(query, values, (err, data: ResultSetHeader) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    return res.json({
      ...data,
      message: 'Successfully added inventory item',
      status: 'success',
    });
  });
});

// Update an existing inventory item
router.put('/update/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = `
    UPDATE inventory 
    SET itemName = ?, 
        itemDescription = ?, 
        quantity = ?, 
        manufacturingDate = ?, 
        expiryDate = ?, 
        lotNo = ?, 
        associated_Illnesses = ?, 
        category = ?
    WHERE inventory_id = ?
  `;

  const {
    itemName,
    itemDescription,
    quantity,
    manufacturingDate,
    expiryDate,
    lotNo,
    associated_Illnesses,
    category,
  } = req.body as Partial<InventoryItem>;

  const values = [
    itemName,
    itemDescription,
    quantity,
    manufacturingDate,
    expiryDate,
    lotNo,
    associated_Illnesses,
    category,
    parseInt(req.params.id),
  ];

  databaseConnection.query(query, values, (err, data: ResultSetHeader) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Database update failed' });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    return res.json({
      message: 'Successfully updated inventory item',
      status: 'success',
    });
  });
});

// Delete an inventory item
router.delete('/delete/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = 'DELETE FROM inventory WHERE inventory_id = ?';
  const id = parseInt(req.params.id);

  databaseConnection.query(query, [id], (err, data: ResultSetHeader) => {
    if (err) return res.status(500).json({ error: err.message });

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    return res.json({
      message: 'Successfully deleted inventory item',
      status: 'success',
    });
  });
});

// Get specific student by student_id_code (for scan functionality)
router.get('/scan/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = 'SELECT * FROM students WHERE student_id_code = ?';
  const id = req.params.id;

  databaseConnection.query(
    query,
    [id],
    (err, data: RowDataPacket[] | ResultSetHeader) => {
      if (err) return res.status(500).json({ error: err.message });

      if (Array.isArray(data) && data.length > 0) {
        return res.json(data[0]);
      }

      return res.status(404).json({ message: 'Student not found' });
    },
  );
});

export const inventoryRouter = router;
