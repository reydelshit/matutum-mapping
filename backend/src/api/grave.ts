import { Router, Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { databaseConnection } from '../connections/DBConnection';

const router = Router();

// TypeScript interface for grave data
interface GraveItem {
  grave_id: number;
  fullname: string;
  birthday: Date;
  date_of_death: Date;
  age: number;
  created_at: Date;
  plot_no: number;
}

// Get all graves
router.get('/', (req: Request, res: Response) => {
  const query = 'SELECT * FROM graves';

  //   console.log('Executing query:', query);

  databaseConnection.query(query, (err, data: RowDataPacket[]) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to retrieve graves',
      });
    }
    return res.json(data);
  });
});

// Get a specific grave by plot number
router.get('/:plot_no', (req: Request<{ plot_no: string }>, res: Response) => {
  const query = 'SELECT * FROM graves WHERE plot_no = ?';
  const plot_no = req.params.plot_no;

  //   console.log('Executing query:', query);

  databaseConnection.query(
    query,
    [plot_no],
    (err, data: RowDataPacket[] | ResultSetHeader) => {
      if (err) return res.status(500).json({ error: err.message });

      if (Array.isArray(data) && data.length > 0) {
        return res.json(data);
      }

      return res.status(404).json({ message: 'Grave not found' });
    },
  );
});

router.get('/speci/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = 'SELECT * FROM graves WHERE grave_id = ?';
  const id = req.params.id;

  //   console.log('Executing query:', query);

  databaseConnection.query(
    query,
    [id],
    (err, data: RowDataPacket[] | ResultSetHeader) => {
      if (err) return res.status(500).json({ error: err.message });

      if (Array.isArray(data) && data.length > 0) {
        return res.json(data[0]);
      }

      return res.status(404).json({ message: 'Grave not found' });
    },
  );
});

// Add a new grave
router.post('/create', (req: Request, res: Response) => {
  const query = `
    INSERT INTO graves (grave_id, fullname, birthday, date_of_death, age, created_at, plot_no) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const created_at = new Date();

  const { grave_id, fullname, birthday, date_of_death, age, plot_no } =
    req.body as GraveItem;

  const values = [
    grave_id,
    fullname,
    birthday,
    date_of_death,
    age,
    created_at,
    plot_no,
  ];

  databaseConnection.query(query, values, (err, data: ResultSetHeader) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    return res.json({
      ...data,
      message: 'Successfully added grave',
      status: 'success',
    });
  });
});

// Update an existing grave
router.put('/update/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = `
    UPDATE graves 
    SET fullname = ?, 
        birthday = ?, 
        date_of_death = ?, 
        age = ?,
        plot_no = ?
    WHERE grave_id = ?
  `;

  const { fullname, birthday, date_of_death, age, plot_no } =
    req.body as Partial<GraveItem>;

  const values = [
    fullname,
    birthday,
    date_of_death,
    age,
    plot_no,
    parseInt(req.params.id),
  ];

  databaseConnection.query(query, values, (err, data: ResultSetHeader) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Database update failed' });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Grave not found' });
    }

    return res.json({
      message: 'Successfully updated grave',
      status: 'success',
    });
  });
});

// Delete a grave
router.delete('/delete/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = 'DELETE FROM graves WHERE grave_id = ?';
  const id = parseInt(req.params.id);

  databaseConnection.query(query, [id], (err, data: ResultSetHeader) => {
    if (err) return res.status(500).json({ error: err.message });

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Grave not found' });
    }

    return res.json({
      message: 'Successfully deleted grave',
      status: 'success',
    });
  });
});

export const graveRouter = router;
