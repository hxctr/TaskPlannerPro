const express = require('express')
const routes = express.Router();


routes.get('/', (req, res) => {
    req.getConnection((err, conn) =>{
        if (err){
            return res.send(err);
        }else{
            conn.query('SELECT * FROM activity', (err, rows) => {
                if (err) {
                    return res.send(err);
                }else{
                    res.json(rows);
                }
            })
        }
    })
})

//insert a to-do
routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err)
        } else {
            conn.query('INSERT INTO activity set ?', [req.body], (err, rows) => {
                if (err) {
                    return res.send(err)
                } else {
                    res.status(200).json({ message: 'Successful request', data: [req.body] });
                    console.log('----------------')
                    console.log('|to-do inserted|')
                    console.log('----------------')
                    // return res.send('to-do inserted')
                }
            })
        }
    })

})


routes.patch('/', (req, res) => {
    const id = req.body.id;
    const updatedDescription = req.body.description;
  
    req.getConnection((err, conn) => {
      if (err) {
        return res.send(err);
      } else {
        conn.query(
          'UPDATE activity SET description = ? WHERE id = ?',
          [updatedDescription, id],
          (err, rows) => {
            if (err) {
              return res.send(err);
            } else {
              res.status(200).json({
                message: 'Successful request',
                data: {
                  id: id,
                  description: updatedDescription,
                },
              });
              console.log('----------------');
              console.log('| to-do updated |');
              console.log('----------------');
            }
          }
        );
      }
    });
  });

  //delete to-do
  routes.delete('/', (req, res) => {
    const todoId = req.body.id;  
    req.getConnection((err, conn) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      conn.query('DELETE FROM activity WHERE id = ?', [todoId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error deleting item' });
        }
  
        // Verifica si se eliminó correctamente el item
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Item not found' });
        }
  
        res.status(200).json({ message: 'to-do deleted successfully' });
        console.log('----------------');
          console.log('| todo deleted |');
          console.log('----------------');
      });
    });
  });

  //edit state
  routes.patch('/state', (req, res) => {
  const id = req.body.id;
  const newState = req.body.state;

  req.getConnection((err, conn) => {
    if (err) {
      return res.send(err);
    } else {
      conn.query('UPDATE activity SET state = ? WHERE id = ?', [newState, id], (err, rows) => {
        if (err) {
          return res.send(err);
        } else {
          res.status(200).json({ message: 'State updated successfully' });
           console.log('----------------');
          console.log('| state changed |');
          console.log('----------------');
        }
      });
    }
  });
});

  
  











module.exports = routes;