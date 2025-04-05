import { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import './App.css';

function App() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [stocks, setStocks] = useState([]);

  const addStock = () => {
    if (!stockSymbol || !quantity || !purchasePrice) {
      alert('Please fill in all fields!');
      return;
    }

    const newStock = {
      stockSymbol,
      quantity: Number(quantity),
      purchasePrice: Number(purchasePrice),
      currentPrice: 69,
    };

    setStocks([...stocks, newStock]);
    setStockSymbol('');
    setQuantity('');
    setPurchasePrice('');
  };

  return (
    <div className="app-container">
      {/* Left Side Banner */}
      <Drawer
        variant="permanent"
        sx={{
          width: 200,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
            padding: '20px 10px',
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', padding: '10px 0' }}>
          You're Broke
        </Typography>
        <List>
          {['Home', 'Account', 'Dashboard'].map(
            (text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>

      {/* Main Content */}
      <div className="content">
        <div className="header">
          <h1>Finance Dashboard</h1>
        </div>

        <div className="interactiveFields">
          <TextField
            label="Stock Symbol"
            variant="outlined"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            size="small"
          />
          <TextField
            label="Quantity"
            type="number"
            inputProps={{ min: 0 }}
            variant="outlined"
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) setQuantity(value);
            }}
            size="small"
          />
          <TextField
            label="Purchase Price"
            type="number"
            inputProps={{ min: 0 }}
            variant="outlined"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            size="small"
          />
          <Button variant="contained" onClick={addStock}>
            Add Stock
          </Button>
        </div>

        <div className="stockList">
          <h1>Stock List</h1>
          <div className="stock-scroll">
            {stocks.length === 0 ? (
              <p>No stocks added yet.</p>
            ) : (
              stocks.map((stock, index) => {
                const profitLoss =
                  (Number(stock.currentPrice) - Number(stock.purchasePrice)) *
                  Number(stock.quantity);
                return (
                  <Card key={index} sx={{ maxWidth: 400, margin: '10px 0' }}>
                    <CardContent>
                      <Typography variant="body1">
                        <strong>Symbol:</strong> {stock.stockSymbol}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Quantity:</strong> {stock.quantity}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Purchase Price:</strong> ${stock.purchasePrice.toFixed(2)}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Current Price:</strong> ${stock.currentPrice.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', color: profitLoss >= 0 ? 'green' : 'red' }}
                      >
                        <strong>Profit/Loss:</strong> {profitLoss >= 0 ? '+' : '-'}
                        ${Math.abs(profitLoss).toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
