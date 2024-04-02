import React, { useState } from 'react';

const TokenSwap = () => {
  const [tokenA, setTokenA] = useState(0);
  const [tokenB, setTokenB] = useState(0);
  const RATE = 1.5; // Constant rate for swapping tokenA to tokenB

  const handleTokenAChange = (event) => {
    const value = parseFloat(event.target.value);
    setTokenA(value);
    setTokenB(value * RATE);
  };

  const handleTokenBChange = (event) => {
    const value = parseFloat(event.target.value);
    setTokenB(value);
    setTokenA(value / RATE);
  };

  return (
    <div>
      <h2>Token Swap</h2>
      <div>
        <label>
          Token A:
          <input type="number" value={tokenA} onChange={handleTokenAChange} />
        </label>
      </div>
      <div>
        <label>
          Token B:
          <input type="number" value={tokenB} onChange={handleTokenBChange} />
        </label>
      </div>
    </div>
  );
};

export default TokenSwap;