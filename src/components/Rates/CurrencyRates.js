import React, { useState, useEffect } from "react";
import { readExchangeRates } from '../../api/bank';
import { Collapse, List, ListItem, ListItemText } from "@mui/material";
import classes from './currencyRates.module.css';
import { Button } from "@mui/material";

const CurrencyRates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fiatData = await readExchangeRates();
        setRates(fiatData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Exchange Rates</h1>
      <Button variant='text' onClick={toggleExpand} className={classes.toggleButton}>
        {expanded ? "Collapse" : "Expand"}
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <List className={classes.list}>
            {rates.map((rate) => (
              <ListItem key={rate.cc} className={classes.rateItem}>
                <ListItemText primary={rate.cc} />
                <ListItemText primary={rate.rate.toFixed(2)} className={classes.rightItem} />
              </ListItem>
            ))}
          </List>
        )}
      </Collapse>
    </div>
  );
};

export default CurrencyRates;
