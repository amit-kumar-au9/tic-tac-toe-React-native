import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const svgPaths = {
	diagonal1: 'M0 0l600 600',
	diagonal2: 'M0 300L300 0',
	row0: 'M0 50h300',
	row1: 'M0 150h300',
	row2: 'M0 250h300',
	col0: 'M50 0v300',
	col1: 'M150 0v300',
	col2: 'M250 0v300',
};

export default function App() {
	const [gameState, setGameState] = useState([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	]);
	const [count, setCount] = useState(0);
	const [currentPlayer, setCurrentPlayer] = useState(1);
	const [winner, setWinner] = useState(0);
	const [makeSvg, setSvg] = useState(false);

	const renderIcon = (row, col) => {
		var value = gameState[row][col];
		switch (value) {
			case 1:
				return <Text style={styles.tileX}>X</Text>;
			case -1:
				return <Text style={styles.tileO}>O</Text>;
			default:
				return <View />;
		}
	};

	const playerTurn = () => {
		switch (currentPlayer) {
			case 1:
				return (
					<Text style={styles.playerChance}>
						Chance of <Text style={{ color: 'red' }}>X</Text>
					</Text>
				);
			case -1:
				return (
					<Text style={styles.playerChance}>
						Chance of <Text style={{ color: 'green' }}>O</Text>
					</Text>
				);
			default:
				return <View />;
		}
	};

	const showWinner = () => {
		switch (winner) {
			case 1:
				return (
					<Text style={styles.playerChance}>
						Player <Text style={{ color: 'red' }}>X</Text> is the
						winner
					</Text>
				);
			case -1:
				return (
					<Text style={styles.playerChance}>
						Player <Text style={{ color: 'green' }}>O</Text> is the
						winner
					</Text>
				);
			default:
				return <Text style={styles.playerChance}>Match Draw</Text>;
		}
	};

	const startGame = () => {
		setGameState([
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		]);
		setCurrentPlayer(1);
		setWinner(0);
		setCount(0);
		setSvg(false);
	};

	const onTilePress = (row, col) => {
		if (gameState[row][col] !== 0) return;
		if (winner !== 0) return;
		let curr_count = count + 1;
		setCount(curr_count);
		// setting up the tile
		let newGameState = gameState.slice();
		newGameState[row][col] = currentPlayer;
		setGameState(newGameState);

		// switching up the player
		let nextPlayer = currentPlayer === 1 ? -1 : 1;
		setCurrentPlayer(nextPlayer);
		let result_winner = getWinner(newGameState);
		if (result_winner !== 0) setWinner(result_winner);
		else if (curr_count === 9) setWinner('Draw');
	};

	const getWinner = (arr) => {
		var sum;

		// check row
		for (var i = 0; i < 3; i++) {
			sum = arr[i][0] + arr[i][1] + arr[i][2];
			if (sum === 3 || sum === -3) {
				setSvg(svgPaths[`row${i}`]);
			}
			if (sum === 3) return 1;
			else if (sum === -3) return -1;
		}

		// check column
		for (var i = 0; i < 3; i++) {
			sum = arr[0][i] + arr[1][i] + arr[2][i];
			if (sum === 3 || sum === -3) {
				setSvg(svgPaths[`col${i}`]);
			}
			if (sum === 3) return 1;
			else if (sum === -3) return -1;
		}

		// check first diagonal
		sum = arr[0][0] + arr[1][1] + arr[2][2];
		if (sum === 3 || sum === -3) {
			setSvg(svgPaths['diagonal1']);
		}
		if (sum === 3) return 1;
		else if (sum === -3) return -1;

		// check second diagonal
		sum = arr[0][2] + arr[1][1] + arr[2][0];
		if (sum === 3 || sum === -3) {
			setSvg(svgPaths['diagonal2']);
		}
		if (sum === 3) return 1;
		else if (sum === -3) return -1;

		// return 0 for no winner
		return 0;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Tic-Tac-Toe</Text>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					style={[
						styles.tile,
						{ borderLeftWidth: 0, borderTopWidth: 0 },
					]}
					onPress={() => onTilePress(0, 0)}
				>
					{renderIcon(0, 0)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tile, { borderTopWidth: 0 }]}
					onPress={() => onTilePress(0, 1)}
				>
					{renderIcon(0, 1)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.tile,
						{ borderRightWidth: 0, borderTopWidth: 0 },
					]}
					onPress={() => onTilePress(0, 2)}
				>
					{renderIcon(0, 2)}
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					style={[styles.tile, { borderLeftWidth: 0 }]}
					onPress={() => onTilePress(1, 0)}
				>
					{renderIcon(1, 0)}
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.tile}
					onPress={() => onTilePress(1, 1)}
				>
					{renderIcon(1, 1)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tile, { borderRightWidth: 0 }]}
					onPress={() => onTilePress(1, 2)}
				>
					{renderIcon(1, 2)}
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					style={[
						styles.tile,
						{ borderLeftWidth: 0, borderBottomWidth: 0 },
					]}
					onPress={() => onTilePress(2, 0)}
				>
					{renderIcon(2, 0)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tile, { borderBottomWidth: 0 }]}
					onPress={() => onTilePress(2, 1)}
				>
					{renderIcon(2, 1)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.tile,
						{ borderRightWidth: 0, borderBottomWidth: 0 },
					]}
					onPress={() => onTilePress(2, 2)}
				>
					{renderIcon(2, 2)}
				</TouchableOpacity>
			</View>
			{makeSvg && (
				<View
					style={{
						position: 'absolute',
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Svg height={300} width={300}>
						<Path stroke="grey" strokeWidth={1} d={makeSvg} />
					</Svg>
				</View>
			)}
			{winner ? showWinner() : playerTurn()}
			<View style={styles.buttonView}>
				<Button title="New Game" onPress={startGame}></Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	heading: {
		color: '#000',
		position: 'absolute',
		top: 100,
		fontSize: 30,
	},
	tile: {
		borderWidth: 5,
		borderColor: '#000000',
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tileX: {
		color: 'red',
		fontSize: 60,
	},
	tileO: {
		color: 'green',
		fontSize: 60,
	},
	playerChance: {
		color: '#000',
		position: 'absolute',
		bottom: 150,
		fontSize: 30,
	},
	buttonView: {
		position: 'absolute',
		bottom: 40,
	},
});
