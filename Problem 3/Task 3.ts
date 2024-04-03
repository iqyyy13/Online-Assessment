import React, {useEffect, useState, useMemo} from "react"

interface WalletBalance 
{
  currency: string;
  amount: number;
  blockchain: string; //Added missing field
}

interface FormattedWalletBalance extends WalletBalance //since they use the same properties
{
  formatted: string;
}

class Datasource 
{
  // TODO: Implement datasource class
  url: string;

  constructor(url: string){
    this.url = url;
  }

  async getPrices() : Promise<{ [currency: string]: number}> {
    try{
      const response = await fetch(this.url)
      const data = await response.json();
      return data;
    } catch (e)
    {
      console.error(e);
      return {};
    }
  }
}

interface Props 
{
  children?: React.ReactNode;
}

const WalletRow: React.FC<any> = ({formattedAmount, usdValue}) => {
  return (
    <div>
      <span>{formattedAmount}</span>
      <span>{usdValue}</span>
    </div>
  );
};

//import React
const WalletPage: React.FC<Props> = (props) => {
  const {children, ...rest } = props;
  const balances = WalletBalance[] = [];
	const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(error => {
      console.error(error); //err -> error
    });
  }, []);

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (balancePriority > -99 && balance.amount <= 0) {  //modified if statement
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className = "row"
        key = {index}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

export default WalletPage;