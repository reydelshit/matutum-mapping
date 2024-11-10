import { Router, Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { databaseConnection } from '../connections/DBConnection';

const router = Router();

// TypeScript interface for reservation data
interface ReservationItem {
  reservation_id: number;
  fullname: string;
  plot_no: number;
  contact_info: string;
  date: Date;
  created_at: Date;
  message: string;
}

// Get all reservations
router.get('/', (req: Request, res: Response) => {
  const query = 'SELECT * FROM reservations ORDER BY created_at DESC';

  databaseConnection.query(query, (err, data: RowDataPacket[]) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to retrieve reservations',
      });
    }
    return res.json(data);
  });
});

// Get a specific reservation by ID
router.get('/speci/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = 'SELECT * FROM reservations WHERE reservation_id = ?';
  const id = req.params.id;

  databaseConnection.query(
    query,
    [id],
    (err, data: RowDataPacket[] | ResultSetHeader) => {
      if (err) return res.status(500).json({ error: err.message });

      if (Array.isArray(data) && data.length > 0) {
        return res.json(data[0]);
      }

      return res.status(404).json({ message: 'Reservation not found' });
    },
  );
});

// Add a new reservation
router.post('/create', (req: Request, res: Response) => {
  const query = `
    INSERT INTO reservations (fullname, plot_no, contact_info, date, created_at, message, status) 
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `;

  const created_at = new Date();

  const { fullname, plot_no, contact_info, date, message } =
    req.body as ReservationItem;

  const values = [fullname, plot_no, contact_info, date, created_at, message];

  console.log(req.body);

  databaseConnection.query(query, values, (err, data: ResultSetHeader) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    return res.json({
      ...data,
      message: 'Successfully added reservation',
      status: 'success',
    });
  });
});

// Update an existing reservation
router.put('/update/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = `
    UPDATE reservations 
    SET fullname = ?, 
        plot_no = ?, 
        contact_info = ?, 
        date = ?,
        message = ?
    WHERE reservation_id = ?
  `;

  const { fullname, plot_no, contact_info, date, message } =
    req.body as Partial<ReservationItem>;

  const values = [
    fullname,
    plot_no,
    contact_info,
    date,
    message,
    parseInt(req.params.id),
  ];

  databaseConnection.query(query, values, (err, data: ResultSetHeader) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Database update failed' });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.json({
      message: 'Successfully updated reservation',
      status: 'success',
    });
  });
});

// Delete a reservation
router.delete('/delete/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = 'DELETE FROM reservations WHERE reservation_id = ?';
  const id = parseInt(req.params.id);

  databaseConnection.query(query, [id], (err, data: ResultSetHeader) => {
    if (err) return res.status(500).json({ error: err.message });

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.json({
      message: 'Successfully deleted reservation',
      status: 'success',
    });
  });
});

// Update reservation status
router.put('/status/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = `
    UPDATE reservations 
    SET status = ?
    WHERE reservation_id = ?
  `;

  const { status } = req.body as { status: string };

  const values = [status, parseInt(req.params.id)];

  databaseConnection.query(query, values, (err, data: ResultSetHeader) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Database update failed' });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.json({
      message: 'Successfully updated reservation',
      status: 'success',
    });
  });
});

export const reservationRouter = router;
