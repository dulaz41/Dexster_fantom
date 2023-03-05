// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "./LiquidityPool.sol";

contract Dex {
    // Owner's address of DEX
    address public immutable owner;
    // Array of liquidity pool addresses
    address[] public liquidityPools;

    address private constant ROUTER =
        0xF491e7B69E4244ad4002BC14e878a34207E38c29;

    address private constant WFTM = 0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83;

    // Mapping to get address of liquidity pool with token addresses
    mapping(address => mapping(address => address)) public getLiquidityPool;

    // Event
    event LiquidityPoolCreted(
        address indexed _addressToken1,
        address indexed _addressToken2,
        address indexed _addressLiquidityPool
    );

    constructor() {
        owner = msg.sender;
    }

    function createLiquidityPool(
        address _tokenA,
        address _tokenB
    ) external returns (address _liquidityPool) {
        (address _token1, address _token2) = _tokenA < _tokenB
            ? (_tokenA, _tokenB)
            : (_tokenB, _tokenA);

        require(_token1 != _token2, "Same Token Addresses");
        require(_token1 != address(0), "Invalid Token Address");
        require(_token2 != address(0), "Invalid Token Address");
        require(
            getLiquidityPool[_token1][_token2] == address(0),
            "Pool Already Exists"
        );

        // Create new liquidity pool
        _liquidityPool = address(new LiquidityPool(_token1, _token2));
        getLiquidityPool[_token1][_token2] = _liquidityPool;
        // Add new liquidity pool address to state array
        liquidityPools.push(_liquidityPool);

        emit LiquidityPoolCreted(_token1, _token2, _liquidityPool);
    }

    function swap(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _to
    ) external {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);

        IERC20(_tokenIn).approve(ROUTER, _amountIn);

        address[] memory path;
        if (_tokenIn == WFTM || _tokenOut == WFTM) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = WFTM;
            path[2] = _tokenOut;
        }
        IUniswapV2Router(ROUTER).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            _to,
            block.timestamp
        );
    }

    function getAmountOutMin(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn
    ) external view returns (uint256) {
        address[] memory path;
        if (_tokenIn == WFTM || _tokenOut == WFTM) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = WFTM;
            path[2] = _tokenOut;
        }

        uint256[] memory amountOutMins = IUniswapV2Router(ROUTER).getAmountsOut(
            _amountIn,
            path
        );
        return amountOutMins[path.length - 1];
    }
}
