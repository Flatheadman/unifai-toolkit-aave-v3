import * as dotenv from 'dotenv';
dotenv.config();

import { Toolkit, ActionContext, TransactionAPI } from 'unifai-sdk';


function getTokenAddressBySymbol(token: string) {
  const TOKENS =  {
    USDC: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    LINK: "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",
    USDT: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0", 
    DAI: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
    WETH: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",
    WBTC: "0x29f2D40B0605204364af54EC677bD022dA425d03",
    AAVE: "0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a",
    EURS: "0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E",
    GHO: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
  }
  // Check if the token is in the TOKENS object.using uppercase for case-insensitive comparison
  const tokenUpper = token.toUpperCase();
  if (TOKENS[tokenUpper]) {
    return TOKENS[tokenUpper];
  }
  // If not found, return null
  return '';
}

async function main() {
  const toolkit = new Toolkit({ apiKey: process.env.TOOLKIT_API_KEY as string});
  const api = new TransactionAPI({ 
    apiKey: process.env.TOOLKIT_API_KEY,
    endpoint: process.env.TRANSACTION_API_ENDPOINT,
  });

  await toolkit.updateToolkit({
    name: 'Aave',
    description: "Interact with the Aave lending platform (v3) on Ethereum Sepolia Testnet.",
  });

  toolkit.event('ready', () => {
    console.log('Toolkit is ready to use');
  });

  toolkit.action({
    action: 'supply',
    actionDescription: 'Supplies tokens into the market and receives aTokens in exchange.',
    payloadDescription: {
      tokenSymbol: {
        type: 'string',
        description: 'The symbol of the token you want to supply. Only support: USDC, LINK, USDT, DAI, WETH, WBTC, AAVE, EURS, GHO.',
        required: true,
      },
      amount: {
        type: 'number',
        description: 'The amount of the underlying asset to supply',
        required: true,
      }
    }
  }, async (ctx: ActionContext, payload: any = {}) => {
    try {

      const tokenAddress = getTokenAddressBySymbol(payload.tokenSymbol);
      if (!tokenAddress) {
        return ctx.result({ error: `Unsupported token symbol: ${payload.tokenSymbol}` });
      }

      const pld = {
        transactionType: 'supply',
        amount: payload.amount,
        tokenAddress
      };
      
      const result = await api.createTransaction('Aave', ctx, pld);

      return ctx.result(result);
    } catch (error) {
      return ctx.result({ error: `Failed to deposit: ${error}` });
    }
  });

  toolkit.action({
    action: 'borrow',
    actionDescription: 'Borrow tokens from Aave v3. Only support: USDC, LINK, USDT, DAI, WETH, WBTC, AAVE, EURS, GHO.',
    payloadDescription: {
      tokenSymbol: {
        type: 'string',
        description: 'The symbol of the token you want to borrow. Only support: USDC, LINK, USDT, DAI, WETH, WBTC, AAVE, EURS, GHO.',
        required: true,
      },
      amount: {
        type: 'number',
        description: 'The amount of the underlying asset to borrow',
        required: true,
      }
    }
  }, async (ctx: ActionContext, payload: any = {}) => {
    try {
      const tokenAddress = getTokenAddressBySymbol(payload.tokenSymbol);
      if (!tokenAddress) {
        return ctx.result({ error: `Unsupported token symbol: ${payload.tokenSymbol}` });
      }

      const pld = {
        transactionType: 'borrow',
        amount: payload.amount,
        tokenAddress
      };
      
      const result = await api.createTransaction('Aave', ctx, pld);

      return ctx.result(result);
    } catch (error) {
      return ctx.result({ error: `Failed to borrow: ${error}` });
    }
  });

  toolkit.action({
    action: 'repay',
    actionDescription: 'Repay borrowed tokens to aave v3. Only support: USDC, LINK, USDT, DAI, WETH, WBTC, AAVE, EURS, GHO.',
    payloadDescription: {
      tokenSymbol: {
        type: 'string',
        description: 'The symbol of the underlying token you want to repay. Only support: USDC, LINK, USDT, DAI, WETH, WBTC, AAVE, EURS, GHO.',
        required: true,
      },
      amount: {
        type: 'number',
        description: 'The amount of the aTokens to repay',
        required: true,
      }
    }
  }, async (ctx: ActionContext, payload: any = {}) => {
    try {
      const tokenAddress = getTokenAddressBySymbol(payload.tokenSymbol);
      if (!tokenAddress) {
        return ctx.result({ error: `Unsupported token symbol: ${payload.tokenSymbol}` });
      }

      const pld = {
        transactionType: 'repay',
        amount: payload.amount,
        tokenAddress
      };
      
      const result = await api.createTransaction('Aave', ctx, pld);

      return ctx.result(result);
    } catch (error) {
      return ctx.result({ error: `Failed to repay: ${error}` });
    }
  });

  toolkit.action({
    action: 'withdraw',
    actionDescription: 'converts a specified quantity of aTokens into the underlying asset. Only support: USDC, LINK, USDT, DAI, WETH, WBTC, AAVE, EURS, GHO.',
    payloadDescription: {
      tokenSymbol: {
        type: 'string',
        description: 'The symbol of the token you want to withdraw. Only support: USDC, LINK, USDT, DAI, WETH, WBTC, AAVE, EURS, GHO.',
        required: true,
      },
      amount: {
        type: 'number',
        description: 'The amount of the underlying asset to withdraw',
        required: true,
      }
    }
  }, async (ctx: ActionContext, payload: any = {}) => {
    try {
      const tokenAddress = getTokenAddressBySymbol(payload.tokenSymbol);
      if (!tokenAddress) {
        return ctx.result({ error: `Unsupported token symbol: ${payload.tokenSymbol}` });
      }

      const pld = {
        transactionType: 'withdraw',
        amount: payload.amount,
        tokenAddress
      };
      
      const result = await api.createTransaction('Aave', ctx, pld);

      return ctx.result(result);
    } catch (error) {
      return ctx.result({ error: `Failed to redeem: ${error}` });
    }
  });

  await toolkit.run();
}

main().catch(console.error);
