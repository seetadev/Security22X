import { ColumnsType } from "antd/lib/table";
import { toHex as toChainId } from ".";
import CopyButton from "../components/CopyButton";

interface Asset {
  name: string;
  decimals: number;
  address: string;
}
interface DataType {
  key: string;
  name: string;
  chainId: string;
  gateway: string;
  rpcUrl: string;
  assets: Asset[];
}

export const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "ChainId",
    dataIndex: "chainId",
    key: "chainId",
  },
  {
    title: "Gateway Contract",
    dataIndex: "gateway",
    key: "gateway",
    render: (text) => (
      <>
        {text} <CopyButton value={text} />
      </>
    ),
  },
];

export const dataSrc: DataType[] = [
  {
    key: "1",
    name: "Ethereum",
    chainId: toChainId(1),
    gateway: "0x4F4495243837681061C4743b74B3eEdf548D56A5",
    rpcUrl: "https://rpc.ankr.com/eth",
    assets: [
      {
        name: "USDC",
        decimals: 6,
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
      {
        name: "WETH",
        decimals: 18,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      {
        name: "DAI",
        decimals: 18,
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      },
      {
        name: "USDT",
        decimals: 6,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
      {
        name: "WBTC",
        decimals: 8,
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      },
      {
        name: "axlATOM",
        decimals: 6,
        address: "0x27292cf0016E5dF1d8b37306B2A98588aCbD6fCA",
      },
      {
        name: "NGM",
        decimals: 6,
        address: "0x08fe7A0db575c2a08d76EEcA71763E48C6e60F45",
      },
      {
        name: "EEUR",
        decimals: 6,
        address: "0xDd26a5c8Ae5b60Bb14aEcED892A052CA48A2e915",
      },
      {
        name: "RAI",
        decimals: 18,
        address: "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919",
      },
      {
        name: "LINK",
        decimals: 18,
        address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      },
      {
        name: "AAVE",
        decimals: 18,
        address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      },
      {
        name: "stETH",
        decimals: 18,
        address: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
      },
      {
        name: "FRAX",
        decimals: 18,
        address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
      },
      {
        name: "APE",
        decimals: 18,
        address: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
      },
      {
        name: "UNI",
        decimals: 18,
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      },
      {
        name: "SHIB",
        decimals: 18,
        address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
      },
      {
        name: "AXS",
        decimals: 18,
        address: "0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b",
      },
      {
        name: "XCN",
        decimals: 18,
        address: "0xA2cd3D43c775978A96BdBf12d733D5A1ED94fb18",
      },
      {
        name: "MKR",
        decimals: 18,
        address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
      },
    ],
  },
  {
    key: "2",
    name: "Avalanche",
    chainId: toChainId(43114),
    gateway: "0x5029C0EFf6C34351a0CEc334542cDb22c7928f78",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    assets: [
      {
        name: "axlUSDC",
        decimals: 6,
        address: "0xfaB550568C688d5D8A52C7d794cb93Edc26eC0eC",
      },
      {
        name: "axlDAI",
        decimals: 18,
        address: "0xC5Fa5669E326DA8B2C35540257cD48811F40a36B",
      },
      {
        name: "WAVAX",
        decimals: 18,
        address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      },
    ],
  },
  {
    key: "3",
    name: "Fantom",
    chainId: toChainId(250),
    gateway: "0x304acf330bbE08d1e512eefaa92F6a57871fD895",
    rpcUrl: "https://rpc.ftm.tools/",
    assets: [
      {
        name: "axlUSDC",
        decimals: 6,
        address: "0x1B6382DBDEa11d97f24495C9A90b7c88469134a4",
      },
      {
        name: "WFTM",
        decimals: 18,
        address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
      },
    ],
  },
  {
    key: "4",
    name: "Polygon",
    chainId: toChainId(137),
    gateway: "0x6f015F16De9fC8791b234eF68D486d2bF203FBA8",
    rpcUrl: "https://polygon-rpc.com/",
    assets: [
      {
        name: "axlUSDC",
        decimals: 6,
        address: "0x750e4C4984a9e0f12978eA6742Bc1c5D248f40ed",
      },
      {
        name: "axlDAI",
        decimals: 18,
        address: "0xDDc9E2891FA11a4CC5C223145e8d14B44f3077c9",
      },
      {
        name: "WMATIC",
        decimals: 18,
        address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      },
    ],
  },
/*   {
    key: "5",
    name: "Moonbeam",
    chainId: toChainId(1284),
    gateway: "0x4F4495243837681061C4743b74B3eEdf548D56A5",
    rpcUrl: "https://rpc.api.moonbeam.network/",
    assets: [
      {
        name: "axlUSDC",
        decimals: 6,
        address: "0xCa01a1D0993565291051daFF390892518ACfAD3A",
      },
      {
        name: "DOT",
        decimals: 10,
        address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
      },
      {
        name: "WGLMR",
        decimals: 18,
        address: "0xAcc15dC74880C9944775448304B263D191c6077F",
      },
    ],
  }, */
  {
    key: "6",
    name: "Ethereum Ropsten",
    chainId: toChainId(3),
    gateway: "0xBC6fcce7c5487d43830a219CA6E7B83238B41e71",
    rpcUrl: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    assets: [
      {
        name: "AXL",
        decimals: 6,
        address: "0x08006a6C38AA63F22Da7694FDA6A8272f89c4c6b",
      },
      {
        name: "aUSDC",
        decimals: 6,
        address: "0x526f0A95EDC3DF4CBDB7bb37d4F7Ed451dB8e369",
      },
      {
        name: "WMATIC",
        decimals: 18,
        address: "0xEAE61FD42A56F435a913d1570fF301a532d027b2",
      },
      {
        name: "WFTM",
        decimals: 18,
        address: "0xd9774230A31Bf49c3D9372Eeb55Aa10Df1807238",
      },
      {
        name: "WETH",
        decimals: 18,
        address: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
      },
      {
        name: "WAVAX",
        decimals: 18,
        address: "0x72af7e1e7E0D38bCF033C541598F5a0301D051A5",
      },
      {
        name: "WDEV",
        decimals: 18,
        address: "0xDc6B192eFa7eBab24063e20c962E74C88A012D3c",
      },
      {
        name: "WBTC",
        decimals: 8,
        address: "0x5db5f7d211FA88266Fb316948da0D45798e5a22f",
      },
      {
        name: "WBNB",
        decimals: 18,
        address: "0x653044Df3e853e8FF96c8D9a7Ab7A90E34c4d484",
      },
    ],
  },
  {
    key: "7",
    name: "Avalanche Fuji",
    chainId: toChainId(43113),
    gateway: "0xC249632c2D40b9001FE907806902f63038B737Ab",
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    assets: [
      {
        name: "AXL",
        decimals: 6,
        address: "0xa8B51e6517f9A6Ab7b247bF10b71b1A738eD8E50",
      },
      {
        name: "WMATIC",
        decimals: 18,
        address: "0xB923E2374639D0605388D91CFedAfCeCE03Cfd8f",
      },
      {
        name: "aUSDC",
        decimals: 6,
        address: "0x57F1c63497AEe0bE305B8852b354CEc793da43bB",
      },
    ],
  },
  {
    key: "8",
    name: "Fantom Testnet",
    chainId: toChainId(4002),
    gateway: "0x97837985Ec0494E7b9C71f5D3f9250188477ae14",
    rpcUrl: "https://rpc.testnet.fantom.network/",
    assets: [
      {
        name: "AXL",
        decimals: 6,
        address: "0x66A5df72619982a2Ef49e8317079b6806d56f66B",
      },
      {
        name: "WMATIC",
        decimals: 18,
        address: "0x3C12d813bb36295A8361C4740A732Bb700df6Db0",
      },
      {
        name: "WAVAX",
        decimals: 18,
        address: "0x8776aDD48553518641a589C39792cc409d4C8B84",
      },
      {
        name: "aUSDC",
        decimals: 6,
        address: "0x75Cc4fDf1ee3E781C1A3Ee9151D5c6Ce34Cf5C61",
      },
    ],
  },
  {
    key: "9",
    name: "Polygon Mumbai",
    chainId: toChainId(80001),
    gateway: "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B",
    rpcUrl: "https://matic-mumbai.chainstacklabs.com/",
    assets: [
      {
        name: "AXL",
        decimals: 6,
        address: "0x9c79782d2B13CAC0Fa2FB00D188104fe6f98E533",
      },
      {
        name: "WMATIC",
        decimals: 18,
        address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      },
      {
        name: "WAVAX",
        decimals: 18,
        address: "0x6DD60c05FdA1255A44Ffaa9A8200b5b179A578D6",
      },
      {
        name: "aUSDC",
        decimals: 6,
        address: "0x2c852e740B62308c46DD29B982FBb650D063Bd07",
      },
    ],
  },
  {
    key: "10",
    name: "Moonbase Alpha",
    chainId: toChainId(1287),
    gateway: "0x5769D84DD62a6fD969856c75c7D321b84d455929",
    rpcUrl: "https://rpc.api.moonbase.moonbeam.network/",
    assets: [
      {
        name: "AXL",
        decimals: 6,
        address: "0xB4D56B6AD4DD2B48e68D2a26C25A04dC1c0eE393",
      },
      {
        name: "WMATIC",
        decimals: 18,
        address: "0xde3dB4FD7D7A5Cc7D8811b7BaFA4103FD90282f3",
      },
      {
        name: "WAVAX",
        decimals: 18,
        address: "0x64aae6319934995Bf30e67EBBBA9750256E07283",
      },
      {
        name: "aUSDC",
        decimals: 6,
        address: "0xD1633F7Fb3d716643125d6415d4177bC36b7186b",
      },
    ],
  },
];

//@ts-ignore
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
